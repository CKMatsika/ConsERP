<?php

namespace App\Http\Controllers;

use App\Models\SupplierInvoice;
use App\Models\Supplier;
use App\Models\PurchaseOrder;
use App\Models\Account;
use App\Services\Accounting\AccountingPostingService;
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

        $orgId = $request->user()->active_organisation_id;
        $validated['organisation_id'] = $orgId;
        $validated['amount_paid'] = 0;

        $invoice = SupplierInvoice::create($validated);

        if (in_array($invoice->status, ['received', 'approved'])) {
            $expenseAcc = Account::firstOrCreate(['organisation_id' => $orgId, 'code' => '5000'], ['name' => 'Cost of Goods / Expense', 'type' => 'expense']);
            $apAcc = Account::firstOrCreate(['organisation_id' => $orgId, 'code' => '2000'], ['name' => 'Accounts Payable', 'type' => 'liability']);

            $postingService = new AccountingPostingService();
            $postingService->postJournal($orgId, 'BILL-' . $invoice->invoice_number, $invoice->issue_date, 'Supplier Invoice ' . $invoice->invoice_number, [
                ['account_id' => $expenseAcc->id, 'debit' => $invoice->total_amount, 'credit' => 0],
                ['account_id' => $apAcc->id, 'debit' => 0, 'credit' => $invoice->total_amount],
            ]);
        }

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
