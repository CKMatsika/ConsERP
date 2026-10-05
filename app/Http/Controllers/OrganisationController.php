<?php

namespace App\Http\Controllers;

use App\Models\Organisation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganisationController extends Controller
{
    public function create()
    {
        return Inertia::render('Organisations/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'country' => 'nullable|string|max:255',
            'base_currency' => 'nullable|string|size:3',
        ]);

        $organisation = Organisation::create($validated);
        
        $request->user()->organisations()->attach($organisation->id);
        
        if (!$request->user()->active_organisation_id) {
            $request->user()->update(['active_organisation_id' => $organisation->id]);
        }

        return redirect()->route('dashboard');
    }

    public function switch(Request $request, Organisation $organisation)
    {
        // Ensure the user belongs to the organisation
        if (!$request->user()->organisations()->where('organisation_id', $organisation->id)->exists()) {
            abort(403, 'Unauthorized action.');
        }

        $request->user()->update(['active_organisation_id' => $organisation->id]);

        return redirect()->back();
    }
}
