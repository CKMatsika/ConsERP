<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadController extends Controller
{
    public function index()
    {
        $leads = Lead::with('customer')->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Leads/Index', [
            'leads' => $leads
        ]);
    }

    public function create()
    {
        $customers = Customer::orderBy('name')->get();
        return Inertia::render('Leads/Create', [
            'customers' => $customers
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'nullable|exists:customers,id',
            'title' => 'required|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'estimated_value' => 'nullable|numeric',
            'status' => 'required|string|in:new,contacted,qualified,lost,converted',
            'notes' => 'nullable|string',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        Lead::create($validated);

        return redirect()->route('leads.index')->with('success', 'Lead created successfully.');
    }

    public function edit(Lead $lead)
    {
        $customers = Customer::orderBy('name')->get();
        return Inertia::render('Leads/Edit', [
            'lead' => $lead,
            'customers' => $customers
        ]);
    }

    public function update(Request $request, Lead $lead)
    {
        $validated = $request->validate([
            'customer_id' => 'nullable|exists:customers,id',
            'title' => 'required|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'estimated_value' => 'nullable|numeric',
            'status' => 'required|string|in:new,contacted,qualified,lost,converted',
            'notes' => 'nullable|string',
        ]);

        $lead->update($validated);

        return redirect()->route('leads.index')->with('success', 'Lead updated successfully.');
    }

    public function destroy(Lead $lead)
    {
        $lead->delete();
        return redirect()->route('leads.index')->with('success', 'Lead deleted successfully.');
    }
}
