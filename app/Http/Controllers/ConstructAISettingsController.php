<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Crypt;

class ConstructAISettingsController extends Controller
{
    public function edit(Request $request)
    {
        $org = $request->user()->activeOrganisation;
        return Inertia::render('ConstructAI/Settings', [
            'organisation' => $org,
        ]);
    }

    public function update(Request $request)
    {
        $org = $request->user()->activeOrganisation;

        $validated = $request->validate([
            'construct_ai_enabled' => 'boolean',
            'provider' => 'nullable|string',
            'model' => 'nullable|string',
            'api_key' => 'nullable|string',
        ]);

        $settings = $org->construct_ai_settings ?? [];
        if (isset($validated['provider'])) $settings['provider'] = $validated['provider'];
        if (isset($validated['model'])) $settings['model'] = $validated['model'];
        if (!empty($validated['api_key'])) {
            $settings['api_key'] = Crypt::encryptString($validated['api_key']);
        }

        $org->update([
            'construct_ai_enabled' => $validated['construct_ai_enabled'] ?? $org->construct_ai_enabled,
            'construct_ai_settings' => $settings,
        ]);

        return redirect()->back()->with('success', 'ConstructAI settings updated successfully.');
    }
}
