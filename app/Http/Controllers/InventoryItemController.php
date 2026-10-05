<?php

namespace App\Http\Controllers;

use App\Models\InventoryItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryItemController extends Controller
{
    public function index()
    {
        $items = InventoryItem::orderBy('name')->paginate(10);
        return Inertia::render('InventoryItems/Index', [
            'items' => $items
        ]);
    }

    public function create()
    {
        return Inertia::render('InventoryItems/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'sku' => 'required|string|max:50',
            'name' => 'required|string|max:255',
            'unit' => 'required|string|max:50',
            'unit_cost' => 'required|numeric',
            'reorder_level' => 'nullable|numeric',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        InventoryItem::create($validated);

        return redirect()->route('inventory-items.index')->with('success', 'Inventory item created successfully.');
    }

    public function edit(InventoryItem $inventoryItem)
    {
        return Inertia::render('InventoryItems/Edit', [
            'inventoryItem' => $inventoryItem
        ]);
    }

    public function update(Request $request, InventoryItem $inventoryItem)
    {
        $validated = $request->validate([
            'sku' => 'required|string|max:50',
            'name' => 'required|string|max:255',
            'unit' => 'required|string|max:50',
            'unit_cost' => 'required|numeric',
            'reorder_level' => 'nullable|numeric',
        ]);

        $inventoryItem->update($validated);

        return redirect()->route('inventory-items.index')->with('success', 'Inventory item updated successfully.');
    }

    public function destroy(InventoryItem $inventoryItem)
    {
        $inventoryItem->delete();
        return redirect()->route('inventory-items.index')->with('success', 'Inventory item deleted successfully.');
    }
}
