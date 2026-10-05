<?php

namespace App\Http\Controllers;

use App\Models\Boq;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BoqController extends Controller
{
    public function index()
    {
        $boqs = Boq::with('items')->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Boqs/Index', [
            'boqs' => $boqs
        ]);
    }

    public function create()
    {
        return Inertia::render('Boqs/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'reference_number' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'status' => 'required|string|in:draft,approved,revised',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        Boq::create($validated);

        return redirect()->route('boqs.index')->with('success', 'BOQ created successfully.');
    }

    public function edit(Boq $boq)
    {
        return Inertia::render('Boqs/Edit', [
            'boq' => $boq
        ]);
    }

    public function update(Request $request, Boq $boq)
    {
        $validated = $request->validate([
            'reference_number' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'status' => 'required|string|in:draft,approved,revised',
        ]);

        $boq->update($validated);

        return redirect()->route('boqs.index')->with('success', 'BOQ updated successfully.');
    }

    public function destroy(Boq $boq)
    {
        $boq->delete();
        return redirect()->route('boqs.index')->with('success', 'BOQ deleted successfully.');
    }
}
