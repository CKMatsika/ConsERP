<?php

namespace App\Http\Controllers;

use App\Models\SiteLog;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteLogController extends Controller
{
    public function index()
    {
        $siteLogs = SiteLog::with('project')->orderBy('log_date', 'desc')->paginate(10);
        return Inertia::render('SiteLogs/Index', [
            'siteLogs' => $siteLogs
        ]);
    }

    public function create()
    {
        $projects = Project::orderBy('name')->get();
        return Inertia::render('SiteLogs/Create', [
            'projects' => $projects
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'log_date' => 'required|date',
            'weather' => 'nullable|string|max:100',
            'work_performed' => 'required|string',
            'issues' => 'nullable|string',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        SiteLog::create($validated);

        return redirect()->route('site-logs.index')->with('success', 'Site log created successfully.');
    }

    public function edit(SiteLog $siteLog)
    {
        $projects = Project::orderBy('name')->get();
        return Inertia::render('SiteLogs/Edit', [
            'siteLog' => $siteLog,
            'projects' => $projects
        ]);
    }

    public function update(Request $request, SiteLog $siteLog)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'log_date' => 'required|date',
            'weather' => 'nullable|string|max:100',
            'work_performed' => 'required|string',
            'issues' => 'nullable|string',
        ]);

        $siteLog->update($validated);

        return redirect()->route('site-logs.index')->with('success', 'Site log updated successfully.');
    }

    public function destroy(SiteLog $siteLog)
    {
        $siteLog->delete();
        return redirect()->route('site-logs.index')->with('success', 'Site log deleted successfully.');
    }
}
