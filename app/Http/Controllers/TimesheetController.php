<?php

namespace App\Http\Controllers;

use App\Models\Timesheet;
use App\Models\Employee;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TimesheetController extends Controller
{
    public function index()
    {
        $timesheets = Timesheet::with(['employee', 'project'])->orderBy('work_date', 'desc')->paginate(10);
        return Inertia::render('Timesheets/Index', [
            'timesheets' => $timesheets
        ]);
    }

    public function create()
    {
        $employees = Employee::orderBy('last_name')->get();
        $projects = Project::orderBy('name')->get();
        return Inertia::render('Timesheets/Create', [
            'employees' => $employees,
            'projects' => $projects
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'project_id' => 'nullable|exists:projects,id',
            'work_date' => 'required|date',
            'hours_worked' => 'required|numeric|min:0|max:24',
            'description' => 'nullable|string',
            'status' => 'required|string|in:draft,submitted,approved,rejected',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        Timesheet::create($validated);

        return redirect()->route('timesheets.index')->with('success', 'Timesheet created successfully.');
    }

    public function edit(Timesheet $timesheet)
    {
        $employees = Employee::orderBy('last_name')->get();
        $projects = Project::orderBy('name')->get();
        return Inertia::render('Timesheets/Edit', [
            'timesheet' => $timesheet,
            'employees' => $employees,
            'projects' => $projects
        ]);
    }

    public function update(Request $request, Timesheet $timesheet)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'project_id' => 'nullable|exists:projects,id',
            'work_date' => 'required|date',
            'hours_worked' => 'required|numeric|min:0|max:24',
            'description' => 'nullable|string',
            'status' => 'required|string|in:draft,submitted,approved,rejected',
        ]);

        $timesheet->update($validated);

        return redirect()->route('timesheets.index')->with('success', 'Timesheet updated successfully.');
    }

    public function destroy(Timesheet $timesheet)
    {
        $timesheet->delete();
        return redirect()->route('timesheets.index')->with('success', 'Timesheet deleted successfully.');
    }
}
