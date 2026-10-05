<?php

namespace App\Http\Controllers;

use App\Models\PurchaseRequisition;
use App\Models\PurchaseOrder;
use App\Models\GoodsReceiptNote;
use App\Models\SupplierInvoice;
use Inertia\Inertia;

class ProcurementDashboardController extends Controller
{
    public function index()
    {
        $metrics = [
            'requisitions_count' => PurchaseRequisition::count(),
            'pending_pos_count' => PurchaseOrder::where('status', 'draft')->count(),
            'total_po_value' => PurchaseOrder::sum('total_amount'),
            'pending_grns_count' => GoodsReceiptNote::where('status', 'pending')->count(),
            'unpaid_bills_value' => SupplierInvoice::where('status', '!=', 'paid')->sum('total_amount'),
        ];

        $recentPOs = PurchaseOrder::with('supplier')->orderBy('created_at', 'desc')->take(5)->get();

        return Inertia::render('Procurement/Dashboard', [
            'metrics' => $metrics,
            'recentPOs' => $recentPOs,
        ]);
    }
}
