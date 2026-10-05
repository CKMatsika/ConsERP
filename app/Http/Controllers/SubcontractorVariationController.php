<?php

namespace App\Http\Controllers;

use App\Models\SubcontractorVariation;
use App\Models\Project;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubcontractorVariationController extends Controller
{
    public function index()
    {
        $variations = SubcontractorVariation::with(['project', 'supplier'])->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('SubcontractorVariations/Index', [
            'variations' => $variations
        ]);
    }

    public function create()
    {
        $projects = Project::orderBy('name')->get();
        $subcontractors = Supplier::orderBy('name')->get();
        return Inertia::render('SubcontractorVariations/Create', [
            'projects' => $projects,
            'subcontractors' => $subcontractors
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'supplier_id' => 'required|exists:suppliers,id',
            'variation_number' => 'required|string|max:50',
            'description' => 'required|string',
            'amount' => 'required|numeric',
            'status' => 'required|string|in:requested,approved,rejected',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        SubcontractorVariation::create($validated);

        return redirect()->route('subcontractor-variations.index')->with('success', 'Variation recorded successfully.');
    }

    public function edit(SubcontractorVariation $subcontractorVariation)
    {
        $projects = Project::orderBy('name')->get();
        $subcontractors = Supplier::orderBy('name')->get();
        return Inertia::render('SubcontractorVariations/Edit', [
            'variation' => $subcontractorVariation,
            'projects' => $projects,
            'subcontractors' => $subcontractors
        ]);
    }

    public function update(Request $request, SubcontractorVariation $subcontractorVariation)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'supplier_id' => 'required|exists:suppliers,id',
            'variation_number' => 'required|string|max:50',
            'description' => 'required|string',
            'amount' => 'required|numeric',
            'status' => 'required|string|in:requested,approved,rejected',
        ]);

        $subcontractorVariation->update($validated);

        return redirect()->route('subcontractor-variations.index')->with('success', 'Variation updated successfully.');
    }

    public function destroy(SubcontractorVariation $subcontractorVariation)
    {
        $subcontractorVariation->delete();
        return redirect()->route('subcontractor-variations.index')->with('success', 'Variation deleted successfully.');
    }
}
