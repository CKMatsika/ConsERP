<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\Prospect;
use App\Models\Quotation;
use App\Models\SalesOrder;
use App\Models\SalesInvoice;
use Inertia\Inertia;

class SalesCrmDashboardController extends Controller
{
    public function index()
    {
        $metrics = [
            'leads_count' => Lead::count(),
            'prospects_count' => Prospect::count(),
            'quotations_count' => Quotation::count(),
            'sales_orders_value' => SalesOrder::sum('total_amount'),
            'unpaid_invoices_value' => SalesInvoice::where('status', '!=', 'paid')->sum('total_amount'),
        ];

        $recentQuotations = Quotation::with('customer')->orderBy('created_at', 'desc')->take(5)->get();

        return Inertia::render('SalesCrm/Dashboard', [
            'metrics' => $metrics,
            'recentQuotations' => $recentQuotations,
        ]);
    }
}
