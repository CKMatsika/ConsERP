<?php

namespace App\Http\Controllers;

use App\Models\CostCode;
use App\Models\Boq;
use App\Models\RateBuildUp;
use Inertia\Inertia;

class EstimatingDashboardController extends Controller
{
    public function index()
    {
        $metrics = [
            'cost_codes_count' => CostCode::count(),
            'boqs_count' => Boq::count(),
            'rate_build_ups_count' => RateBuildUp::count(),
        ];

        $recentBoqs = Boq::orderBy('created_at', 'desc')->take(5)->get();
        $recentRateBuildUps = RateBuildUp::with('costCode')->orderBy('created_at', 'desc')->take(5)->get();

        return Inertia::render('Estimating/Dashboard', [
            'metrics' => $metrics,
            'recentBoqs' => $recentBoqs,
            'recentRateBuildUps' => $recentRateBuildUps,
        ]);
    }
}
