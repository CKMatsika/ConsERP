<?php

namespace App\Http\Controllers;

use App\Models\EquipmentMaintenance;
use App\Models\Equipment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EquipmentMaintenanceController extends Controller
{
    public function index()
    {
        $maintenances = EquipmentMaintenance::with('equipment')->orderBy('service_date', 'desc')->paginate(10);
        return Inertia::render('EquipmentMaintenances/Index', [
            'maintenances' => $maintenances
        ]);
    }

    public function create()
    {
        $equipmentList = Equipment::orderBy('name')->get();
        return Inertia::render('EquipmentMaintenances/Create', [
            'equipmentList' => $equipmentList
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'equipment_id' => 'required|exists:equipment,id',
            'maintenance_type' => 'required|string|in:routine,repair,inspection',
            'service_date' => 'required|date',
            'cost' => 'required|numeric',
            'notes' => 'nullable|string',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        EquipmentMaintenance::create($validated);

        return redirect()->route('equipment-maintenances.index')->with('success', 'Maintenance record created successfully.');
    }

    public function edit(EquipmentMaintenance $equipmentMaintenance)
    {
        $equipmentList = Equipment::orderBy('name')->get();
        return Inertia::render('EquipmentMaintenances/Edit', [
            'equipmentMaintenance' => $equipmentMaintenance,
            'equipmentList' => $equipmentList
        ]);
    }

    public function update(Request $request, EquipmentMaintenance $equipmentMaintenance)
    {
        $validated = $request->validate([
            'equipment_id' => 'required|exists:equipment,id',
            'maintenance_type' => 'required|string|in:routine,repair,inspection',
            'service_date' => 'required|date',
            'cost' => 'required|numeric',
            'notes' => 'nullable|string',
        ]);

        $equipmentMaintenance->update($validated);

        return redirect()->route('equipment-maintenances.index')->with('success', 'Maintenance record updated successfully.');
    }

    public function destroy(EquipmentMaintenance $equipmentMaintenance)
    {
        $equipmentMaintenance->delete();
        return redirect()->route('equipment-maintenances.index')->with('success', 'Maintenance record deleted successfully.');
    }
}
