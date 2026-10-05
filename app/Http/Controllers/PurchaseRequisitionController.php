<?php

namespace App\Http\Controllers;

use App\Models\PurchaseRequisition;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PurchaseRequisitionController extends Controller
{
    public function index()
    {
        $requisitions = PurchaseRequisition::with(['project', 'requester'])->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('PurchaseRequisitions/Index', [
            'requisitions' => $requisitions
        ]);
    }

    public function create()
    {
        $projects = Project::orderBy('name')->get();
        return Inertia::render('PurchaseRequisitions/Create', [
            'projects' => $projects
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'nullable|exists:projects,id',
            'requisition_number' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'status' => 'required|string|in:draft,submitted,approved,rejected,ordered',
            'required_date' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;
        $validated['requested_by'] = $request->user()->id;

        PurchaseRequisition::create($validated);

        return redirect()->route('purchase-requisitions.index')->with('success', 'Purchase Requisition created successfully.');
    }

    public function edit(PurchaseRequisition $purchaseRequisition)
    {
        $projects = Project::orderBy('name')->get();
        return Inertia::render('PurchaseRequisitions/Edit', [
            'purchaseRequisition' => $purchaseRequisition,
            'projects' => $projects
        ]);
    }

    public function update(Request $request, PurchaseRequisition $purchaseRequisition)
    {
        $validated = $request->validate([
            'project_id' => 'nullable|exists:projects,id',
            'requisition_number' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'status' => 'required|string|in:draft,submitted,approved,rejected,ordered',
            'required_date' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $purchaseRequisition->update($validated);

        return redirect()->route('purchase-requisitions.index')->with('success', 'Purchase Requisition updated successfully.');
    }

    public function destroy(PurchaseRequisition $purchaseRequisition)
    {
        $purchaseRequisition->delete();
        return redirect()->route('purchase-requisitions.index')->with('success', 'Purchase Requisition deleted successfully.');
    }
}
