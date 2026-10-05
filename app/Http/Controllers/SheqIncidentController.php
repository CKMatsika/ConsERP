<?php

namespace App\Http\Controllers;

use App\Models\SheqIncident;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SheqIncidentController extends Controller
{
    public function index()
    {
        $incidents = SheqIncident::with(['project', 'reporter'])->orderBy('incident_date', 'desc')->paginate(10);
        return Inertia::render('SheqIncidents/Index', [
            'incidents' => $incidents
        ]);
    }

    public function create()
    {
        $projects = Project::orderBy('name')->get();
        return Inertia::render('SheqIncidents/Create', [
            'projects' => $projects
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'nullable|exists:projects,id',
            'incident_date' => 'required|date',
            'category' => 'required|string|in:safety,quality,environmental',
            'severity' => 'required|string|in:low,medium,high,critical',
            'description' => 'required|string',
            'corrective_action' => 'nullable|string',
            'status' => 'required|string|in:open,investigating,resolved,closed',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;
        $validated['reported_by'] = $request->user()->id;

        SheqIncident::create($validated);

        return redirect()->route('sheq-incidents.index')->with('success', 'SHEQ incident recorded successfully.');
    }

    public function edit(SheqIncident $sheqIncident)
    {
        $projects = Project::orderBy('name')->get();
        return Inertia::render('SheqIncidents/Edit', [
            'sheqIncident' => $sheqIncident,
            'projects' => $projects
        ]);
    }

    public function update(Request $request, SheqIncident $sheqIncident)
    {
        $validated = $request->validate([
            'project_id' => 'nullable|exists:projects,id',
            'incident_date' => 'required|date',
            'category' => 'required|string|in:safety,quality,environmental',
            'severity' => 'required|string|in:low,medium,high,critical',
            'description' => 'required|string',
            'corrective_action' => 'nullable|string',
            'status' => 'required|string|in:open,investigating,resolved,closed',
        ]);

        $sheqIncident->update($validated);

        return redirect()->route('sheq-incidents.index')->with('success', 'SHEQ incident updated successfully.');
    }

    public function destroy(SheqIncident $sheqIncident)
    {
        $sheqIncident->delete();
        return redirect()->route('sheq-incidents.index')->with('success', 'SHEQ incident deleted successfully.');
    }
}
