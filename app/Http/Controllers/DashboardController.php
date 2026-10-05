<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\PurchaseOrder;
use App\Models\Employee;
use App\Models\SheqIncident;
use App\Models\SiteLog;
use App\Models\Lead;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $orgId = $request->user()->active_organisation_id;

        $totalProjects = Project::count();
        $activeProjects = Project::where('status', 'active')->count();
        $totalContractValue = Project::sum('contract_value');
        
        $pendingPOs = PurchaseOrder::where('status', 'draft')->count();
        $totalPOValue = PurchaseOrder::sum('total_amount');
        
        $totalEmployees = Employee::where('employment_status', '!=', 'terminated')->count();
        $openIncidents = SheqIncident::whereIn('status', ['open', 'investigating'])->count();

        $recentProjects = Project::with('customer')->orderBy('created_at', 'desc')->take(5)->get();
        $recentSiteLogs = SiteLog::with('project')->orderBy('log_date', 'desc')->take(5)->get();

        return Inertia::render('Dashboard', [
            'metrics' => [
                'total_projects' => $totalProjects,
                'active_projects' => $activeProjects,
                'total_contract_value' => $totalContractValue,
                'pending_pos' => $pendingPOs,
                'total_po_value' => $totalPOValue,
                'total_employees' => $totalEmployees,
                'open_incidents' => $openIncidents,
            ],
            'recentProjects' => $recentProjects,
            'recentSiteLogs' => $recentSiteLogs,
        ]);
    }
}
