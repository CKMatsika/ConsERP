<?php

namespace App\Http\Controllers;

use App\Models\Payroll;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PayrollController extends Controller
{
    public function index()
    {
        $payrolls = Payroll::with('employee')->orderBy('pay_period_start', 'desc')->paginate(10);
        return Inertia::render('Payrolls/Index', [
            'payrolls' => $payrolls
        ]);
    }

    public function create()
    {
        $employees = Employee::orderBy('last_name')->get();
        return Inertia::render('Payrolls/Create', [
            'employees' => $employees
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'pay_period_start' => 'required|date',
            'pay_period_end' => 'required|date',
            'gross_pay' => 'required|numeric',
            'deductions' => 'required|numeric',
            'net_pay' => 'required|numeric',
            'status' => 'required|string|in:draft,approved,paid',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        Payroll::create($validated);

        return redirect()->route('payrolls.index')->with('success', 'Payroll record created successfully.');
    }

    public function edit(Payroll $payroll)
    {
        $employees = Employee::orderBy('last_name')->get();
        return Inertia::render('Payrolls/Edit', [
            'payroll' => $payroll,
            'employees' => $employees
        ]);
    }

    public function update(Request $request, Payroll $payroll)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'pay_period_start' => 'required|date',
            'pay_period_end' => 'required|date',
            'gross_pay' => 'required|numeric',
            'deductions' => 'required|numeric',
            'net_pay' => 'required|numeric',
            'status' => 'required|string|in:draft,approved,paid',
        ]);

        $payroll->update($validated);

        return redirect()->route('payrolls.index')->with('success', 'Payroll record updated successfully.');
    }

    public function destroy(Payroll $payroll)
    {
        $payroll->delete();
        return redirect()->route('payrolls.index')->with('success', 'Payroll record deleted successfully.');
    }
}
