<?php

namespace App\Http\Controllers;

use App\Models\SalesOrder;
use App\Models\Customer;
use App\Models\Quotation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SalesOrderController extends Controller
{
    public function index()
    {
        $orders = SalesOrder::with(['customer', 'quotation'])->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('SalesOrders/Index', [
            'orders' => $orders
        ]);
    }

    public function create()
    {
        $customers = Customer::orderBy('name')->get();
        $quotations = Quotation::orderBy('reference_number')->get();
        return Inertia::render('SalesOrders/Create', [
            'customers' => $customers,
            'quotations' => $quotations
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'quotation_id' => 'nullable|exists:quotations,id',
            'order_number' => 'required|string|max:50',
            'title' => 'required|string|max:255',
            'order_date' => 'required|date',
            'delivery_date' => 'nullable|date',
            'status' => 'required|string|in:draft,confirmed,fulfilled,cancelled',
            'subtotal' => 'required|numeric',
            'tax_amount' => 'required|numeric',
            'total_amount' => 'required|numeric',
            'notes' => 'nullable|string',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        SalesOrder::create($validated);

        return redirect()->route('sales-orders.index')->with('success', 'Sales Order created successfully.');
    }

    public function edit(SalesOrder $salesOrder)
    {
        $customers = Customer::orderBy('name')->get();
        $quotations = Quotation::orderBy('reference_number')->get();
        return Inertia::render('SalesOrders/Edit', [
            'salesOrder' => $salesOrder,
            'customers' => $customers,
            'quotations' => $quotations
        ]);
    }

    public function update(Request $request, SalesOrder $salesOrder)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'quotation_id' => 'nullable|exists:quotations,id',
            'order_number' => 'required|string|max:50',
            'title' => 'required|string|max:255',
            'order_date' => 'required|date',
            'delivery_date' => 'nullable|date',
            'status' => 'required|string|in:draft,confirmed,fulfilled,cancelled',
            'subtotal' => 'required|numeric',
            'tax_amount' => 'required|numeric',
            'total_amount' => 'required|numeric',
            'notes' => 'nullable|string',
        ]);

        $salesOrder->update($validated);

        return redirect()->route('sales-orders.index')->with('success', 'Sales Order updated successfully.');
    }

    public function destroy(SalesOrder $salesOrder)
    {
        $salesOrder->delete();
        return redirect()->route('sales-orders.index')->with('success', 'Sales Order deleted successfully.');
    }
}
