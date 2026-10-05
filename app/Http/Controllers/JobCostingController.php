<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\PurchaseOrder;
use App\Models\SubcontractorValuation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobCostingController extends Controller
{
    public function index()
    {
        $projects = Project::with(['contracts', 'siteLogs'])->get()->map(function ($project) {
            $poTotal = PurchaseOrder::where('project_id', $project->id)->sum('total_amount');
            $subTotal = SubcontractorValuation::where('project_id', $project->id)->sum('certified_amount');
            $totalCost = $poTotal + $subTotal;
            $contractValue = Number($project->contract_value ?? 0);
            $margin = $contractValue > 0 ? (($contractValue - $totalCost) / $contractValue) * 100 : 0;

            return [
                'id' => $project->id,
                'code' => $project->code,
                'name' => $project->name,
                'contract_value' => $contractValue,
                'actual_cost' => $totalCost,
                'margin_percentage' => round($margin, 2),
                'status' => $project->status,
            ];
        });

        return Inertia::render('JobCosting/Index', [
            'projects' => $projects
        ]);
    }
}
