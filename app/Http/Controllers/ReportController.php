<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\PurchaseOrder;
use App\Models\Employee;
use App\Models\Customer;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        $stats = [
            'projects_count' => Project::count(),
            'employees_count' => Employee::count(),
            'customers_count' => Customer::count(),
            'suppliers_count' => Supplier::count(),
            'total_po_value' => PurchaseOrder::sum('total_amount'),
        ];

        return Inertia::render('Reports/Index', [
            'stats' => $stats
        ]);
    }
}
