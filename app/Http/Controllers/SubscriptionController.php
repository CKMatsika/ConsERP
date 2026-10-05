<?php

namespace App\Http\Controllers;

use App\Models\SubscriptionPlan;
use App\Models\OrganisationSubscription;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function index()
    {
        $plans = SubscriptionPlan::all();
        $activeSubscription = OrganisationSubscription::where('organisation_id', auth()->user()->active_organisation_id)
            ->with('plan')
            ->first();

        return Inertia::render('Subscriptions/Index', [
            'plans' => $plans,
            'activeSubscription' => $activeSubscription
        ]);
    }

    public function subscribe(Request $request, SubscriptionPlan $plan)
    {
        $orgId = $request->user()->active_organisation_id;

        OrganisationSubscription::updateOrCreate(
            ['organisation_id' => $orgId],
            [
                'subscription_plan_id' => $plan->id,
                'status' => 'active',
                'starts_at' => now(),
                'expires_at' => now()->addMonth(),
            ]
        );

        return redirect()->route('subscriptions.index')->with('success', 'Successfully subscribed to plan: ' . $plan->name);
    }
}
