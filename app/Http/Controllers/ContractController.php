<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContractController extends Controller
{
    public function index()
    {
        $contracts = Contract::with('project')->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Contracts/Index', [
            'contracts' => $contracts
        ]);
    }

    public function create()
    {
        $projects = Project::orderBy('name')->get();
        return Inertia::render('Contracts/Create', [
            'projects' => $projects
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'contract_number' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'value' => 'required|numeric',
            'signed_date' => 'nullable|date',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        Contract::create($validated);

        return redirect()->route('contracts.index')->with('success', 'Contract created successfully.');
    }

    public function edit(Contract $contract)
    {
        $projects = Project::orderBy('name')->get();
        return Inertia::render('Contracts/Edit', [
            'contract' => $contract,
            'projects' => $projects
        ]);
    }

    public function update(Request $request, Contract $contract)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'contract_number' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'value' => 'required|numeric',
            'signed_date' => 'nullable|date',
        ]);

        $contract->update($validated);

        return redirect()->route('contracts.index')->with('success', 'Contract updated successfully.');
    }

    public function destroy(Contract $contract)
    {
        $contract->delete();
        return redirect()->route('contracts.index')->with('success', 'Contract deleted successfully.');
    }
}
