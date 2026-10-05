<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentController extends Controller
{
    public function index()
    {
        $documents = Document::with('project')->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Documents/Index', [
            'documents' => $documents
        ]);
    }

    public function create()
    {
        $projects = Project::orderBy('name')->get();
        return Inertia::render('Documents/Create', [
            'projects' => $projects
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'nullable|exists:projects,id',
            'title' => 'required|string|max:255',
            'file_path' => 'required|string|max:255',
            'file_type' => 'nullable|string|max:50',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        Document::create($validated);

        return redirect()->route('documents.index')->with('success', 'Document uploaded successfully.');
    }

    public function destroy(Document $document)
    {
        $document->delete();
        return redirect()->route('documents.index')->with('success', 'Document deleted successfully.');
    }
}
