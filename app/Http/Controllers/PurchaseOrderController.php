<?php

namespace App\Http\Controllers;

use App\Models\PurchaseOrder;
use App\Models\PurchaseRequisition;
use App\Models\Supplier;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PurchaseOrderController extends Controller
{
    public function index()
    {
        $purchaseOrders = PurchaseOrder::with(['supplier', 'project', 'requisition'])->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('PurchaseOrders/Index', [
            'purchaseOrders' => $purchaseOrders
        ]);
    }

    public function create()
    {
        $suppliers = Supplier::orderBy('name')->get();
        $projects = Project::orderBy('name')->get();
        $requisitions = PurchaseRequisition::orderBy('requisition_number')->get();
        return Inertia::render('PurchaseOrders/Create', [
            'suppliers' => $suppliers,
            'projects' => $projects,
            'requisitions' => $requisitions
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'purchase_requisition_id' => 'nullable|exists:purchase_requisitions,id',
            'supplier_id' => 'required|exists:suppliers,id',
            'project_id' => 'nullable|exists:projects,id',
            'po_number' => 'required|string|max:255',
            'order_date' => 'required|date',
            'delivery_date' => 'nullable|date',
            'status' => 'required|string|in:draft,sent,acknowledged,fulfilled,cancelled',
            'subtotal' => 'required|numeric',
            'tax_amount' => 'required|numeric',
            'total_amount' => 'required|numeric',
            'notes' => 'nullable|string',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        PurchaseOrder::create($validated);

        return redirect()->route('purchase-orders.index')->with('success', 'Purchase Order created successfully.');
    }

    public function edit(PurchaseOrder $purchaseOrder)
    {
        $suppliers = Supplier::orderBy('name')->get();
        $projects = Project::orderBy('name')->get();
        $requisitions = PurchaseRequisition::orderBy('requisition_number')->get();
        return Inertia::render('PurchaseOrders/Edit', [
            'purchaseOrder' => $purchaseOrder,
            'suppliers' => $suppliers,
            'projects' => $projects,
            'requisitions' => $requisitions
        ]);
    }

    public function update(Request $request, PurchaseOrder $purchaseOrder)
    {
        $validated = $request->validate([
            'purchase_requisition_id' => 'nullable|exists:purchase_requisitions,id',
            'supplier_id' => 'required|exists:suppliers,id',
            'project_id' => 'nullable|exists:projects,id',
            'po_number' => 'required|string|max:255',
            'order_date' => 'required|date',
            'delivery_date' => 'nullable|date',
            'status' => 'required|string|in:draft,sent,acknowledged,fulfilled,cancelled',
            'subtotal' => 'required|numeric',
            'tax_amount' => 'required|numeric',
            'total_amount' => 'required|numeric',
            'notes' => 'nullable|string',
        ]);

        $purchaseOrder->update($validated);

        return redirect()->route('purchase-orders.index')->with('success', 'Purchase Order updated successfully.');
    }

    public function destroy(PurchaseOrder $purchaseOrder)
    {
        $purchaseOrder->delete();
        return redirect()->route('purchase-orders.index')->with('success', 'Purchase Order deleted successfully.');
    }
}
