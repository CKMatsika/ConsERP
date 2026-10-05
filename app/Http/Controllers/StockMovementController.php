<?php

namespace App\Http\Controllers;

use App\Models\StockMovement;
use App\Models\InventoryItem;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockMovementController extends Controller
{
    public function index()
    {
        $movements = StockMovement::with(['item', 'warehouse'])->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('StockMovements/Index', [
            'movements' => $movements
        ]);
    }

    public function create()
    {
        $items = InventoryItem::orderBy('name')->get();
        $warehouses = Warehouse::orderBy('name')->get();
        return Inertia::render('StockMovements/Create', [
            'items' => $items,
            'warehouses' => $warehouses
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'inventory_item_id' => 'required|exists:inventory_items,id',
            'warehouse_id' => 'required|exists:warehouses,id',
            'movement_type' => 'required|string|in:in,out,transfer,adjustment',
            'quantity' => 'required|numeric',
            'reference' => 'nullable|string|max:255',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        StockMovement::create($validated);

        return redirect()->route('stock-movements.index')->with('success', 'Stock movement recorded successfully.');
    }

    public function edit(StockMovement $stockMovement)
    {
        $items = InventoryItem::orderBy('name')->get();
        $warehouses = Warehouse::orderBy('name')->get();
        return Inertia::render('StockMovements/Edit', [
            'stockMovement' => $stockMovement,
            'items' => $items,
            'warehouses' => $warehouses
        ]);
    }

    public function update(Request $request, StockMovement $stockMovement)
    {
        $validated = $request->validate([
            'inventory_item_id' => 'required|exists:inventory_items,id',
            'warehouse_id' => 'required|exists:warehouses,id',
            'movement_type' => 'required|string|in:in,out,transfer,adjustment',
            'quantity' => 'required|numeric',
            'reference' => 'nullable|string|max:255',
        ]);

        $stockMovement->update($validated);

        return redirect()->route('stock-movements.index')->with('success', 'Stock movement updated successfully.');
    }

    public function destroy(StockMovement $stockMovement)
    {
        $stockMovement->delete();
        return redirect()->route('stock-movements.index')->with('success', 'Stock movement deleted successfully.');
    }
}
