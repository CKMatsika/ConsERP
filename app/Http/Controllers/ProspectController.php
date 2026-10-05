<?php

namespace App\Http\Controllers;

use App\Models\Prospect;
use App\Models\Lead;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProspectController extends Controller
{
    public function index()
    {
        $prospects = Prospect::with(['lead', 'customer'])->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Prospects/Index', [
            'prospects' => $prospects
        ]);
    }

    public function create()
    {
        $leads = Lead::orderBy('title')->get();
        $customers = Customer::orderBy('name')->get();
        return Inertia::render('Prospects/Create', [
            'leads' => $leads,
            'customers' => $customers
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'lead_id' => 'nullable|exists:leads,id',
            'customer_id' => 'nullable|exists:customers,id',
            'name' => 'required|string|max:255',
            'probability' => 'nullable|integer|min:0|max:100',
            'expected_close_date' => 'nullable|date',
            'stage' => 'required|string|in:prospecting,qualification,proposal,negotiation,closed_won,closed_lost',
            'value' => 'nullable|numeric',
            'notes' => 'nullable|string',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        Prospect::create($validated);

        return redirect()->route('prospects.index')->with('success', 'Prospect created successfully.');
    }

    public function edit(Prospect $prospect)
    {
        $leads = Lead::orderBy('title')->get();
        $customers = Customer::orderBy('name')->get();
        return Inertia::render('Prospects/Edit', [
            'prospect' => $prospect,
            'leads' => $leads,
            'customers' => $customers
        ]);
    }

    public function update(Request $request, Prospect $prospect)
    {
        $validated = $request->validate([
            'lead_id' => 'nullable|exists:leads,id',
            'customer_id' => 'nullable|exists:customers,id',
            'name' => 'required|string|max:255',
            'probability' => 'nullable|integer|min:0|max:100',
            'expected_close_date' => 'nullable|date',
            'stage' => 'required|string|in:prospecting,qualification,proposal,negotiation,closed_won,closed_lost',
            'value' => 'nullable|numeric',
            'notes' => 'nullable|string',
        ]);

        $prospect->update($validated);

        return redirect()->route('prospects.index')->with('success', 'Prospect updated successfully.');
    }

    public function destroy(Prospect $prospect)
    {
        $prospect->delete();
        return redirect()->route('prospects.index')->with('success', 'Prospect deleted successfully.');
    }
}
