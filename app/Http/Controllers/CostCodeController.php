<?php

namespace App\Http\Controllers;

use App\Models\CostCode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CostCodeController extends Controller
{
    public function index()
    {
        $costCodes = CostCode::orderBy('code')->paginate(10);
        return Inertia::render('CostCodes/Index', [
            'costCodes' => $costCodes
        ]);
    }

    public function create()
    {
        return Inertia::render('CostCodes/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:50',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|in:labor,material,equipment,subcontractor,overhead',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        CostCode::create($validated);

        return redirect()->route('cost-codes.index')->with('success', 'Cost code created successfully.');
    }

    public function edit(CostCode $costCode)
    {
        return Inertia::render('CostCodes/Edit', [
            'costCode' => $costCode
        ]);
    }

    public function update(Request $request, CostCode $costCode)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:50',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|in:labor,material,equipment,subcontractor,overhead',
        ]);

        $costCode->update($validated);

        return redirect()->route('cost-codes.index')->with('success', 'Cost code updated successfully.');
    }

    public function destroy(CostCode $costCode)
    {
        $costCode->delete();
        return redirect()->route('cost-codes.index')->with('success', 'Cost code deleted successfully.');
    }
}
