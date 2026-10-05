<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Contract;
use App\Models\WbsTask;
use App\Models\SiteLog;
use Inertia\Inertia;

class ProjectsDashboardController extends Controller
{
    public function index()
    {
        $metrics = [
            'projects_count' => Project::count(),
            'active_projects' => Project::where('status', 'active')->count(),
            'contracts_value' => Contract::sum('value'),
            'open_tasks_count' => WbsTask::where('progress_percentage', '<', 100)->count(),
        ];

        $recentProjects = Project::with('customer')->orderBy('created_at', 'desc')->take(5)->get();

        return Inertia::render('ProjectsModule/Dashboard', [
            'metrics' => $metrics,
            'recentProjects' => $recentProjects,
        ]);
    }
}
