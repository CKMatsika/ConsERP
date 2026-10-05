<?php

namespace App\Http\Controllers;

use App\Models\Tender;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TenderController extends Controller
{
    public function index()
    {
        $tenders = Tender::orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Tenders/Index', [
            'tenders' => $tenders
        ]);
    }

    public function create()
    {
        return Inertia::render('Tenders/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'client_name' => 'required|string|max:255',
            'submission_deadline' => 'nullable|date',
            'estimated_value' => 'nullable|numeric',
            'status' => 'required|string|in:preparing,submitted,awarded,lost,cancelled',
            'notes' => 'nullable|string',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        Tender::create($validated);

        return redirect()->route('tenders.index')->with('success', 'Tender created successfully.');
    }

    public function edit(Tender $tender)
    {
        return Inertia::render('Tenders/Edit', [
            'tender' => $tender
        ]);
    }

    public function update(Request $request, Tender $tender)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'client_name' => 'required|string|max:255',
            'submission_deadline' => 'nullable|date',
            'estimated_value' => 'nullable|numeric',
            'status' => 'required|string|in:preparing,submitted,awarded,lost,cancelled',
            'notes' => 'nullable|string',
        ]);

        $tender->update($validated);

        return redirect()->route('tenders.index')->with('success', 'Tender updated successfully.');
    }

    public function destroy(Tender $tender)
    {
        $tender->delete();
        return redirect()->route('tenders.index')->with('success', 'Tender deleted successfully.');
    }
}
