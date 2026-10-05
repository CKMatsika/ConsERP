<?php

namespace App\Http\Controllers;

use App\Models\WbsTask;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WbsTaskController extends Controller
{
    public function index()
    {
        $wbsTasks = WbsTask::with(['project', 'parent'])->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('WbsTasks/Index', [
            'wbsTasks' => $wbsTasks
        ]);
    }

    public function create()
    {
        $projects = Project::orderBy('name')->get();
        $tasks = WbsTask::orderBy('name')->get();
        return Inertia::render('WbsTasks/Create', [
            'projects' => $projects,
            'tasks' => $tasks
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'parent_id' => 'nullable|exists:wbs_tasks,id',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50',
            'progress_percentage' => 'nullable|numeric|min:0|max:100',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        WbsTask::create($validated);

        return redirect()->route('wbs-tasks.index')->with('success', 'WBS Task created successfully.');
    }

    public function edit(WbsTask $wbsTask)
    {
        $projects = Project::orderBy('name')->get();
        $tasks = WbsTask::where('id', '!=', $wbsTask->id)->orderBy('name')->get();
        return Inertia::render('WbsTasks/Edit', [
            'wbsTask' => $wbsTask,
            'projects' => $projects,
            'tasks' => $tasks
        ]);
    }

    public function update(Request $request, WbsTask $wbsTask)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'parent_id' => 'nullable|exists:wbs_tasks,id',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50',
            'progress_percentage' => 'nullable|numeric|min:0|max:100',
        ]);

        $wbsTask->update($validated);

        return redirect()->route('wbs-tasks.index')->with('success', 'WBS Task updated successfully.');
    }

    public function destroy(WbsTask $wbsTask)
    {
        $wbsTask->delete();
        return redirect()->route('wbs-tasks.index')->with('success', 'WBS Task deleted successfully.');
    }
}
