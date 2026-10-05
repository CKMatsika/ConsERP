<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with('customer')->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Projects/Index', [
            'projects' => $projects
        ]);
    }

    public function create()
    {
        $customers = Customer::orderBy('name')->get();
        return Inertia::render('Projects/Create', [
            'customers' => $customers
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'nullable|exists:customers,id',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50',
            'status' => 'required|string|in:planning,active,suspended,completed,closed',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'contract_value' => 'nullable|numeric',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        Project::create($validated);

        return redirect()->route('projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project)
    {
        $customers = Customer::orderBy('name')->get();
        return Inertia::render('Projects/Edit', [
            'project' => $project,
            'customers' => $customers
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'customer_id' => 'nullable|exists:customers,id',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50',
            'status' => 'required|string|in:planning,active,suspended,completed,closed',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'contract_value' => 'nullable|numeric',
        ]);

        $project->update($validated);

        return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
    }
}
