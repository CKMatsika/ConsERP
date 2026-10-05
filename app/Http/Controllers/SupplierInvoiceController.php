<?php

namespace App\Http\Controllers;

use App\Models\SupplierInvoice;
use App\Models\Supplier;
use App\Models\PurchaseOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierInvoiceController extends Controller
{
    public function index()
    {
        $invoices = SupplierInvoice::with(['supplier', 'purchaseOrder'])->orderBy('issue_date', 'desc')->paginate(10);
        return Inertia::render('SupplierInvoices/Index', [
            'invoices' => $invoices
        ]);
    }

    public function create()
    {
        $suppliers = Supplier::orderBy('name')->get();
        $purchaseOrders = PurchaseOrder::orderBy('po_number')->get();
        return Inertia::render('SupplierInvoices/Create', [
            'suppliers' => $suppliers,
            'purchaseOrders' => $purchaseOrders
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'purchase_order_id' => 'nullable|exists:purchase_orders,id',
            'invoice_number' => 'required|string|max:50',
            'issue_date' => 'required|date',
            'due_date' => 'required|date',
            'status' => 'required|string|in:draft,received,approved,paid,overdue',
            'subtotal' => 'required|numeric',
            'tax_amount' => 'required|numeric',
            'total_amount' => 'required|numeric',
            'notes' => 'nullable|string',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;
        $validated['amount_paid'] = 0;

        SupplierInvoice::create($validated);

        return redirect()->route('supplier-invoices.index')->with('success', 'Supplier invoice created successfully.');
    }

    public function edit(SupplierInvoice $supplierInvoice)
    {
        $suppliers = Supplier::orderBy('name')->get();
        $purchaseOrders = PurchaseOrder::orderBy('po_number')->get();
        return Inertia::render('SupplierInvoices/Edit', [
            'invoice' => $supplierInvoice,
            'suppliers' => $suppliers,
            'purchaseOrders' => $purchaseOrders
        ]);
    }

    public function update(Request $request, SupplierInvoice $supplierInvoice)
    {
        $validated = $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'purchase_order_id' => 'nullable|exists:purchase_orders,id',
            'invoice_number' => 'required|string|max:50',
            'issue_date' => 'required|date',
            'due_date' => 'required|date',
            'status' => 'required|string|in:draft,received,approved,paid,overdue',
            'subtotal' => 'required|numeric',
            'tax_amount' => 'required|numeric',
            'total_amount' => 'required|numeric',
            'notes' => 'nullable|string',
        ]);

        $supplierInvoice->update($validated);

        return redirect()->route('supplier-invoices.index')->with('success', 'Supplier invoice updated successfully.');
    }

    public function destroy(SupplierInvoice $supplierInvoice)
    {
        $supplierInvoice->delete();
        return redirect()->route('supplier-invoices.index')->with('success', 'Supplier invoice deleted successfully.');
    }
}
