<?php

namespace App\Http\Controllers;

use App\Models\ProductionOrder;
use App\Models\PrefabProduct;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductionOrderController extends Controller
{
    public function index()
    {
        $orders = ProductionOrder::with('prefabProduct')->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('ProductionOrders/Index', [
            'orders' => $orders
        ]);
    }

    public function create()
    {
        $products = PrefabProduct::orderBy('name')->get();
        return Inertia::render('ProductionOrders/Create', [
            'products' => $products
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'prefab_product_id' => 'required|exists:prefab_products,id',
            'order_number' => 'required|string|max:50',
            'quantity' => 'required|numeric',
            'status' => 'required|string|in:planned,in_production,completed,cancelled',
            'due_date' => 'nullable|date',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        ProductionOrder::create($validated);

        return redirect()->route('production-orders.index')->with('success', 'Production order created successfully.');
    }

    public function edit(ProductionOrder $productionOrder)
    {
        $products = PrefabProduct::orderBy('name')->get();
        return Inertia::render('ProductionOrders/Edit', [
            'productionOrder' => $productionOrder,
            'products' => $products
        ]);
    }

    public function update(Request $request, ProductionOrder $productionOrder)
    {
        $validated = $request->validate([
            'prefab_product_id' => 'required|exists:prefab_products,id',
            'order_number' => 'required|string|max:50',
            'quantity' => 'required|numeric',
            'status' => 'required|string|in:planned,in_production,completed,cancelled',
            'due_date' => 'nullable|date',
        ]);

        $productionOrder->update($validated);

        return redirect()->route('production-orders.index')->with('success', 'Production order updated successfully.');
    }

    public function destroy(ProductionOrder $productionOrder)
    {
        $productionOrder->delete();
        return redirect()->route('production-orders.index')->with('success', 'Production order deleted successfully.');
    }
}
