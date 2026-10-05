<?php

namespace App\Http\Controllers;

use App\Models\SubcontractorValuation;
use App\Models\Project;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubcontractorValuationController extends Controller
{
    public function index()
    {
        $valuations = SubcontractorValuation::with(['project', 'supplier'])->orderBy('valuation_date', 'desc')->paginate(10);
        return Inertia::render('SubcontractorValuations/Index', [
            'valuations' => $valuations
        ]);
    }

    public function create()
    {
        $projects = Project::orderBy('name')->get();
        $subcontractors = Supplier::orderBy('name')->get();
        return Inertia::render('SubcontractorValuations/Create', [
            'projects' => $projects,
            'subcontractors' => $subcontractors
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'supplier_id' => 'required|exists:suppliers,id',
            'valuation_number' => 'required|string|max:50',
            'valuation_date' => 'required|date',
            'certified_amount' => 'required|numeric',
            'status' => 'required|string|in:submitted,certified,paid',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        SubcontractorValuation::create($validated);

        return redirect()->route('subcontractor-valuations.index')->with('success', 'Valuation recorded successfully.');
    }

    public function edit(SubcontractorValuation $subcontractorValuation)
    {
        $projects = Project::orderBy('name')->get();
        $subcontractors = Supplier::orderBy('name')->get();
        return Inertia::render('SubcontractorValuations/Edit', [
            'valuation' => $subcontractorValuation,
            'projects' => $projects,
            'subcontractors' => $subcontractors
        ]);
    }

    public function update(Request $request, SubcontractorValuation $subcontractorValuation)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'supplier_id' => 'required|exists:suppliers,id',
            'valuation_number' => 'required|string|max:50',
            'valuation_date' => 'required|date',
            'certified_amount' => 'required|numeric',
            'status' => 'required|string|in:submitted,certified,paid',
        ]);

        $subcontractorValuation->update($validated);

        return redirect()->route('subcontractor-valuations.index')->with('success', 'Valuation updated successfully.');
    }

    public function destroy(SubcontractorValuation $subcontractorValuation)
    {
        $subcontractorValuation->delete();
        return redirect()->route('subcontractor-valuations.index')->with('success', 'Valuation deleted successfully.');
    }
}
