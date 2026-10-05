<?php

namespace App\Http\Controllers;

use App\Models\Warehouse;
use App\Models\InventoryItem;
use App\Models\PrefabProduct;
use App\Models\Equipment;
use Inertia\Inertia;

class OperationsDashboardController extends Controller
{
    public function index()
    {
        $metrics = [
            'warehouses_count' => Warehouse::count(),
            'inventory_items_count' => InventoryItem::count(),
            'prefab_products_count' => PrefabProduct::count(),
            'equipment_count' => Equipment::count(),
        ];

        $recentItems = InventoryItem::orderBy('created_at', 'desc')->take(5)->get();

        return Inertia::render('Operations/Dashboard', [
            'metrics' => $metrics,
            'recentItems' => $recentItems,
        ]);
    }
}
