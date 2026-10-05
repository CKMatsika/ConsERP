<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Department;
use App\Models\Branch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::with(['department', 'branch'])->orderBy('last_name')->paginate(10);
        return Inertia::render('Employees/Index', [
            'employees' => $employees
        ]);
    }

    public function create()
    {
        $departments = Department::orderBy('name')->get();
        $branches = Branch::orderBy('name')->get();
        return Inertia::render('Employees/Create', [
            'departments' => $departments,
            'branches' => $branches
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'department_id' => 'nullable|exists:departments,id',
            'branch_id' => 'nullable|exists:branches,id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'employment_status' => 'required|string|in:full_time,part_time,contractor,terminated',
            'hire_date' => 'nullable|date',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        Employee::create($validated);

        return redirect()->route('employees.index')->with('success', 'Employee created successfully.');
    }

    public function edit(Employee $employee)
    {
        $departments = Department::orderBy('name')->get();
        $branches = Branch::orderBy('name')->get();
        return Inertia::render('Employees/Edit', [
            'employee' => $employee,
            'departments' => $departments,
            'branches' => $branches
        ]);
    }

    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'department_id' => 'nullable|exists:departments,id',
            'branch_id' => 'nullable|exists:branches,id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'employment_status' => 'required|string|in:full_time,part_time,contractor,terminated',
            'hire_date' => 'nullable|date',
        ]);

        $employee->update($validated);

        return redirect()->route('employees.index')->with('success', 'Employee updated successfully.');
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();
        return redirect()->route('employees.index')->with('success', 'Employee deleted successfully.');
    }
}
