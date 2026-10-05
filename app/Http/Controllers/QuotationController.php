<?php

namespace App\Http\Controllers;

use App\Models\Quotation;
use App\Models\Customer;
use App\Models\Prospect;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuotationController extends Controller
{
    public function index()
    {
        $quotations = Quotation::with(['customer', 'prospect'])->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Quotations/Index', [
            'quotations' => $quotations
        ]);
    }

    public function create()
    {
        $customers = Customer::orderBy('name')->get();
        $prospects = Prospect::orderBy('name')->get();
        return Inertia::render('Quotations/Create', [
            'customers' => $customers,
            'prospects' => $prospects
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'prospect_id' => 'nullable|exists:prospects,id',
            'reference_number' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'status' => 'required|string|in:draft,sent,accepted,rejected,revised',
            'issue_date' => 'required|date',
            'valid_until' => 'nullable|date',
            'subtotal' => 'required|numeric',
            'tax_amount' => 'required|numeric',
            'total_amount' => 'required|numeric',
            'notes' => 'nullable|string',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        Quotation::create($validated);

        return redirect()->route('quotations.index')->with('success', 'Quotation created successfully.');
    }

    public function edit(Quotation $quotation)
    {
        $customers = Customer::orderBy('name')->get();
        $prospects = Prospect::orderBy('name')->get();
        return Inertia::render('Quotations/Edit', [
            'quotation' => $quotation,
            'customers' => $customers,
            'prospects' => $prospects
        ]);
    }

    public function update(Request $request, Quotation $quotation)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'prospect_id' => 'nullable|exists:prospects,id',
            'reference_number' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'status' => 'required|string|in:draft,sent,accepted,rejected,revised',
            'issue_date' => 'required|date',
            'valid_until' => 'nullable|date',
            'subtotal' => 'required|numeric',
            'tax_amount' => 'required|numeric',
            'total_amount' => 'required|numeric',
            'notes' => 'nullable|string',
        ]);

        $quotation->update($validated);

        return redirect()->route('quotations.index')->with('success', 'Quotation updated successfully.');
    }

    public function destroy(Quotation $quotation)
    {
        $quotation->delete();
        return redirect()->route('quotations.index')->with('success', 'Quotation deleted successfully.');
    }
}
