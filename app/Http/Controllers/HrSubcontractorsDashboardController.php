<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Timesheet;
use App\Models\SheqIncident;
use App\Models\SubcontractorValuation;
use Inertia\Inertia;

class HrSubcontractorsDashboardController extends Controller
{
    public function index()
    {
        $metrics = [
            'employees_count' => Employee::count(),
            'pending_timesheets' => Timesheet::where('status', 'submitted')->count(),
            'open_incidents' => SheqIncident::whereIn('status', ['open', 'investigating'])->count(),
            'sub_valuations_certified' => SubcontractorValuation::sum('certified_amount'),
        ];

        $recentEmployees = Employee::orderBy('created_at', 'desc')->take(5)->get();

        return Inertia::render('HrSubcontractors/Dashboard', [
            'metrics' => $metrics,
            'recentEmployees' => $recentEmployees,
        ]);
    }
}
