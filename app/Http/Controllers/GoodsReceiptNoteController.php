<?php

namespace App\Http\Controllers;

use App\Models\GoodsReceiptNote;
use App\Models\PurchaseOrder;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GoodsReceiptNoteController extends Controller
{
    public function index()
    {
        $grns = GoodsReceiptNote::with(['purchaseOrder', 'warehouse'])->orderBy('received_date', 'desc')->paginate(10);
        return Inertia::render('GoodsReceiptNotes/Index', [
            'grns' => $grns
        ]);
    }

    public function create()
    {
        $purchaseOrders = PurchaseOrder::orderBy('po_number')->get();
        $warehouses = Warehouse::orderBy('name')->get();
        return Inertia::render('GoodsReceiptNotes/Create', [
            'purchaseOrders' => $purchaseOrders,
            'warehouses' => $warehouses
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'purchase_order_id' => 'required|exists:purchase_orders,id',
            'warehouse_id' => 'required|exists:warehouses,id',
            'grn_number' => 'required|string|max:50',
            'received_date' => 'required|date',
            'status' => 'required|string|in:pending,inspected,accepted,rejected',
            'notes' => 'nullable|string',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        GoodsReceiptNote::create($validated);

        return redirect()->route('goods-receipt-notes.index')->with('success', 'GRN recorded successfully.');
    }

    public function edit(GoodsReceiptNote $goodsReceiptNote)
    {
        $purchaseOrders = PurchaseOrder::orderBy('po_number')->get();
        $warehouses = Warehouse::orderBy('name')->get();
        return Inertia::render('GoodsReceiptNotes/Edit', [
            'grn' => $goodsReceiptNote,
            'purchaseOrders' => $purchaseOrders,
            'warehouses' => $warehouses
        ]);
    }

    public function update(Request $request, GoodsReceiptNote $goodsReceiptNote)
    {
        $validated = $request->validate([
            'purchase_order_id' => 'required|exists:purchase_orders,id',
            'warehouse_id' => 'required|exists:warehouses,id',
            'grn_number' => 'required|string|max:50',
            'received_date' => 'required|date',
            'status' => 'required|string|in:pending,inspected,accepted,rejected',
            'notes' => 'nullable|string',
        ]);

        $goodsReceiptNote->update($validated);

        return redirect()->route('goods-receipt-notes.index')->with('success', 'GRN updated successfully.');
    }

    public function destroy(GoodsReceiptNote $goodsReceiptNote)
    {
        $goodsReceiptNote->delete();
        return redirect()->route('goods-receipt-notes.index')->with('success', 'GRN deleted successfully.');
    }
}
