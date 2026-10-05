<?php

namespace App\Http\Controllers;

use App\Models\CreditNote;
use App\Models\Customer;
use App\Models\SalesInvoice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CreditNoteController extends Controller
{
    public function index()
    {
        $creditNotes = CreditNote::with(['customer', 'invoice'])->orderBy('issue_date', 'desc')->paginate(10);
        return Inertia::render('CreditNotes/Index', [
            'creditNotes' => $creditNotes
        ]);
    }

    public function create()
    {
        $customers = Customer::orderBy('name')->get();
        $invoices = SalesInvoice::orderBy('invoice_number')->get();
        return Inertia::render('CreditNotes/Create', [
            'customers' => $customers,
            'invoices' => $invoices
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'sales_invoice_id' => 'nullable|exists:sales_invoices,id',
            'credit_note_number' => 'required|string|max:50',
            'issue_date' => 'required|date',
            'amount' => 'required|numeric',
            'reason' => 'nullable|string',
            'status' => 'required|string|in:draft,approved,applied',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        CreditNote::create($validated);

        return redirect()->route('credit-notes.index')->with('success', 'Credit Note created successfully.');
    }

    public function edit(CreditNote $creditNote)
    {
        $customers = Customer::orderBy('name')->get();
        $invoices = SalesInvoice::orderBy('invoice_number')->get();
        return Inertia::render('CreditNotes/Edit', [
            'creditNote' => $creditNote,
            'customers' => $customers,
            'invoices' => $invoices
        ]);
    }

    public function update(Request $request, CreditNote $creditNote)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'sales_invoice_id' => 'nullable|exists:sales_invoices,id',
            'credit_note_number' => 'required|string|max:50',
            'issue_date' => 'required|date',
            'amount' => 'required|numeric',
            'reason' => 'nullable|string',
            'status' => 'required|string|in:draft,approved,applied',
        ]);

        $creditNote->update($validated);

        return redirect()->route('credit-notes.index')->with('success', 'Credit Note updated successfully.');
    }

    public function destroy(CreditNote $creditNote)
    {
        $creditNote->delete();
        return redirect()->route('credit-notes.index')->with('success', 'Credit Note deleted successfully.');
    }
}
