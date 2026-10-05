<?php

namespace App\Http\Controllers;

use App\Models\SalesInvoice;
use App\Models\Customer;
use App\Models\SalesOrder;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SalesInvoiceController extends Controller
{
    public function index()
    {
        $invoices = SalesInvoice::with(['customer', 'salesOrder', 'project'])->orderBy('issue_date', 'desc')->paginate(10);
        return Inertia::render('SalesInvoices/Index', [
            'invoices' => $invoices
        ]);
    }

    public function create()
    {
        $customers = Customer::orderBy('name')->get();
        $salesOrders = SalesOrder::orderBy('order_number')->get();
        $projects = Project::orderBy('name')->get();
        return Inertia::render('SalesInvoices/Create', [
            'customers' => $customers,
            'salesOrders' => $salesOrders,
            'projects' => $projects
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'sales_order_id' => 'nullable|exists:sales_orders,id',
            'project_id' => 'nullable|exists:projects,id',
            'invoice_number' => 'required|string|max:50',
            'issue_date' => 'required|date',
            'due_date' => 'required|date',
            'status' => 'required|string|in:draft,sent,paid,overdue,void',
            'subtotal' => 'required|numeric',
            'tax_amount' => 'required|numeric',
            'total_amount' => 'required|numeric',
            'notes' => 'nullable|string',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;
        $validated['amount_paid'] = 0;

        SalesInvoice::create($validated);

        return redirect()->route('sales-invoices.index')->with('success', 'Sales Invoice created successfully.');
    }

    public function edit(SalesInvoice $salesInvoice)
    {
        $customers = Customer::orderBy('name')->get();
        $salesOrders = SalesOrder::orderBy('order_number')->get();
        $projects = Project::orderBy('name')->get();
        return Inertia::render('SalesInvoices/Edit', [
            'salesInvoice' => $salesInvoice,
            'customers' => $customers,
            'salesOrders' => $salesOrders,
            'projects' => $projects
        ]);
    }

    public function update(Request $request, SalesInvoice $salesInvoice)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'sales_order_id' => 'nullable|exists:sales_orders,id',
            'project_id' => 'nullable|exists:projects,id',
            'invoice_number' => 'required|string|max:50',
            'issue_date' => 'required|date',
            'due_date' => 'required|date',
            'status' => 'required|string|in:draft,sent,paid,overdue,void',
            'subtotal' => 'required|numeric',
            'tax_amount' => 'required|numeric',
            'total_amount' => 'required|numeric',
            'notes' => 'nullable|string',
        ]);

        $salesInvoice->update($validated);

        return redirect()->route('sales-invoices.index')->with('success', 'Sales Invoice updated successfully.');
    }

    public function destroy(SalesInvoice $salesInvoice)
    {
        $salesInvoice->delete();
        return redirect()->route('sales-invoices.index')->with('success', 'Sales Invoice deleted successfully.');
    }
}
