<?php

namespace App\Http\Controllers;

use App\Models\AIConversation;
use App\Models\AIMessage;
use App\Services\AI\AIService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConstructAIController extends Controller
{
    protected AIService $aiService;

    public function __construct(AIService $aiService)
    {
        $this->aiService = $aiService;
    }

    public function index(Request $request)
    {
        $org = $request->user()->activeOrganisation;
        if ($org && !$org->construct_ai_enabled) {
            return redirect()->route('dashboard')->with('error', 'ConstructAI is currently disabled for this organisation.');
        }

        $conversations = AIConversation::where('user_id', $request->user()->id)
            ->orderBy('updated_at', 'desc')
            ->get();

        return Inertia::render('ConstructAI/Workspace', [
            'conversations' => $conversations
        ]);
    }

    public function chat(Request $request)
    {
        $org = $request->user()->activeOrganisation;
        if ($org && !$org->construct_ai_enabled) {
            return response()->json(['error' => 'ConstructAI is disabled.'], 403);
        }

        $validated = $request->validate([
            'conversation_id' => 'nullable|exists:ai_conversations,id',
            'message' => 'required|string',
        ]);

        $user = $request->user();
        $orgId = $user->active_organisation_id;

        $conversation = null;
        if (!empty($validated['conversation_id'])) {
            $conversation = AIConversation::find($validated['conversation_id']);
        }

        if (!$conversation) {
            $conversation = AIConversation::create([
                'organisation_id' => $orgId,
                'user_id' => $user->id,
                'title' => substr($validated['message'], 0, 30) . '...',
            ]);
        }

        // Save user message
        AIMessage::create([
            'organisation_id' => $orgId,
            'ai_conversation_id' => $conversation->id,
            'role' => 'user',
            'content' => $validated['message'],
        ]);

        // Get past messages for context
        $history = $conversation->messages()->orderBy('created_at', 'asc')->get()->map(fn($m) => [
            'role' => $m->role,
            'content' => $m->content,
        ])->toArray();

        $settings = $org->construct_ai_settings ?? null;
        $aiReply = $this->aiService->chat($orgId, $user->id, $history, $settings);

        // Save assistant response
        $assistantMsg = AIMessage::create([
            'organisation_id' => $orgId,
            'ai_conversation_id' => $conversation->id,
            'role' => 'assistant',
            'content' => $aiReply,
        ]);

        return response()->json([
            'conversation_id' => $conversation->id,
            'message' => $assistantMsg,
        ]);
    }
}
