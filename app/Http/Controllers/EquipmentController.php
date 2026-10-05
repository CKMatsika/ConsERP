<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EquipmentController extends Controller
{
    public function index()
    {
        $equipment = Equipment::orderBy('name')->paginate(10);
        return Inertia::render('Equipment/Index', [
            'equipment' => $equipment
        ]);
    }

    public function create()
    {
        return Inertia::render('Equipment/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'asset_number' => 'required|string|max:50',
            'category' => 'required|string|in:plant,vehicle,tool',
            'status' => 'required|string|in:available,in_use,maintenance,decommissioned',
            'purchase_date' => 'nullable|date',
            'purchase_cost' => 'nullable|numeric',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        Equipment::create($validated);

        return redirect()->route('equipment.index')->with('success', 'Equipment created successfully.');
    }

    public function edit(Equipment $equipment)
    {
        return Inertia::render('Equipment/Edit', [
            'equipment' => $equipment
        ]);
    }

    public function update(Request $request, Equipment $equipment)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'asset_number' => 'required|string|max:50',
            'category' => 'required|string|in:plant,vehicle,tool',
            'status' => 'required|string|in:available,in_use,maintenance,decommissioned',
            'purchase_date' => 'nullable|date',
            'purchase_cost' => 'nullable|numeric',
        ]);

        $equipment->update($validated);

        return redirect()->route('equipment.index')->with('success', 'Equipment updated successfully.');
    }

    public function destroy(Equipment $equipment)
    {
        $equipment->delete();
        return redirect()->route('equipment.index')->with('success', 'Equipment deleted successfully.');
    }
}
