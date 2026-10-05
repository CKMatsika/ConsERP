<?php

namespace App\Http\Controllers;

use App\Models\SubcontractorCertificate;
use App\Models\SubcontractorValuation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubcontractorCertificateController extends Controller
{
    public function index()
    {
        $certificates = SubcontractorCertificate::with('valuation')->orderBy('issue_date', 'desc')->paginate(10);
        return Inertia::render('SubcontractorCertificates/Index', [
            'certificates' => $certificates
        ]);
    }

    public function create()
    {
        $valuations = SubcontractorValuation::orderBy('valuation_number')->get();
        return Inertia::render('SubcontractorCertificates/Create', [
            'valuations' => $valuations
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'subcontractor_valuation_id' => 'required|exists:subcontractor_valuations,id',
            'certificate_number' => 'required|string|max:50',
            'issue_date' => 'required|date',
            'amount' => 'required|numeric',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        SubcontractorCertificate::create($validated);

        return redirect()->route('subcontractor-certificates.index')->with('success', 'Certificate issued successfully.');
    }

    public function edit(SubcontractorCertificate $subcontractorCertificate)
    {
        $valuations = SubcontractorValuation::orderBy('valuation_number')->get();
        return Inertia::render('SubcontractorCertificates/Edit', [
            'certificate' => $subcontractorCertificate,
            'valuations' => $valuations
        ]);
    }

    public function update(Request $request, SubcontractorCertificate $subcontractorCertificate)
    {
        $validated = $request->validate([
            'subcontractor_valuation_id' => 'required|exists:subcontractor_valuations,id',
            'certificate_number' => 'required|string|max:50',
            'issue_date' => 'required|date',
            'amount' => 'required|numeric',
        ]);

        $subcontractorCertificate->update($validated);

        return redirect()->route('subcontractor-certificates.index')->with('success', 'Certificate updated successfully.');
    }

    public function destroy(SubcontractorCertificate $subcontractorCertificate)
    {
        $subcontractorCertificate->delete();
        return redirect()->route('subcontractor-certificates.index')->with('success', 'Certificate deleted successfully.');
    }
}
