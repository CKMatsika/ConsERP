<?php

namespace App\Http\Controllers;

use App\Models\BillOfMaterial;
use App\Models\PrefabProduct;
use App\Models\InventoryItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BillOfMaterialController extends Controller
{
    public function index()
    {
        $boms = BillOfMaterial::with(['prefabProduct', 'inventoryItem'])->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('BillOfMaterials/Index', [
            'boms' => $boms
        ]);
    }

    public function create()
    {
        $products = PrefabProduct::orderBy('name')->get();
        $items = InventoryItem::orderBy('name')->get();
        return Inertia::render('BillOfMaterials/Create', [
            'products' => $products,
            'items' => $items
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'prefab_product_id' => 'required|exists:prefab_products,id',
            'inventory_item_id' => 'required|exists:inventory_items,id',
            'quantity' => 'required|numeric',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        BillOfMaterial::create($validated);

        return redirect()->route('bill-of-materials.index')->with('success', 'BOM item created successfully.');
    }

    public function edit(BillOfMaterial $billOfMaterial)
    {
        $products = PrefabProduct::orderBy('name')->get();
        $items = InventoryItem::orderBy('name')->get();
        return Inertia::render('BillOfMaterials/Edit', [
            'billOfMaterial' => $billOfMaterial,
            'products' => $products,
            'items' => $items
        ]);
    }

    public function update(Request $request, BillOfMaterial $billOfMaterial)
    {
        $validated = $request->validate([
            'prefab_product_id' => 'required|exists:prefab_products,id',
            'inventory_item_id' => 'required|exists:inventory_items,id',
            'quantity' => 'required|numeric',
        ]);

        $billOfMaterial->update($validated);

        return redirect()->route('bill-of-materials.index')->with('success', 'BOM item updated successfully.');
    }

    public function destroy(BillOfMaterial $billOfMaterial)
    {
        $billOfMaterial->delete();
        return redirect()->route('bill-of-materials.index')->with('success', 'BOM item deleted successfully.');
    }
}
