<?php

namespace App\Http\Controllers;

use App\Models\PrefabProduct;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PrefabProductController extends Controller
{
    public function index()
    {
        $products = PrefabProduct::orderBy('name')->paginate(10);
        return Inertia::render('PrefabProducts/Index', [
            'products' => $products
        ]);
    }

    public function create()
    {
        return Inertia::render('PrefabProducts/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'sku' => 'required|string|max:50',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'unit_price' => 'required|numeric',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        PrefabProduct::create($validated);

        return redirect()->route('prefab-products.index')->with('success', 'Prefab product created successfully.');
    }

    public function edit(PrefabProduct $prefabProduct)
    {
        return Inertia::render('PrefabProducts/Edit', [
            'prefabProduct' => $prefabProduct
        ]);
    }

    public function update(Request $request, PrefabProduct $prefabProduct)
    {
        $validated = $request->validate([
            'sku' => 'required|string|max:50',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'unit_price' => 'required|numeric',
        ]);

        $prefabProduct->update($validated);

        return redirect()->route('prefab-products.index')->with('success', 'Prefab product updated successfully.');
    }

    public function destroy(PrefabProduct $prefabProduct)
    {
        $prefabProduct->delete();
        return redirect()->route('prefab-products.index')->with('success', 'Prefab product deleted successfully.');
    }
}
