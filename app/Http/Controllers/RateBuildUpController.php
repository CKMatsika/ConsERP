<?php

namespace App\Http\Controllers;

use App\Models\RateBuildUp;
use App\Models\CostCode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RateBuildUpController extends Controller
{
    public function index()
    {
        $rateBuildUps = RateBuildUp::with('costCode')->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('RateBuildUps/Index', [
            'rateBuildUps' => $rateBuildUps
        ]);
    }

    public function create()
    {
        $costCodes = CostCode::orderBy('code')->get();
        return Inertia::render('RateBuildUps/Create', [
            'costCodes' => $costCodes
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cost_code_id' => 'nullable|exists:cost_codes,id',
            'item_name' => 'required|string|max:255',
            'unit' => 'required|string|max:50',
            'unit_rate' => 'required|numeric',
            'notes' => 'nullable|string',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        RateBuildUp::create($validated);

        return redirect()->route('rate-build-ups.index')->with('success', 'Rate build-up created successfully.');
    }

    public function edit(RateBuildUp $rateBuildUp)
    {
        $costCodes = CostCode::orderBy('code')->get();
        return Inertia::render('RateBuildUps/Edit', [
            'rateBuildUp' => $rateBuildUp,
            'costCodes' => $costCodes
        ]);
    }

    public function update(Request $request, RateBuildUp $rateBuildUp)
    {
        $validated = $request->validate([
            'cost_code_id' => 'nullable|exists:cost_codes,id',
            'item_name' => 'required|string|max:255',
            'unit' => 'required|string|max:50',
            'unit_rate' => 'required|numeric',
            'notes' => 'nullable|string',
        ]);

        $rateBuildUp->update($validated);

        return redirect()->route('rate-build-ups.index')->with('success', 'Rate build-up updated successfully.');
    }

    public function destroy(RateBuildUp $rateBuildUp)
    {
        $rateBuildUp->delete();
        return redirect()->route('rate-build-ups.index')->with('success', 'Rate build-up deleted successfully.');
    }
}
