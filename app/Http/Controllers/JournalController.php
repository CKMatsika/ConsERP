<?php

namespace App\Http\Controllers;

use App\Models\Journal;
use App\Models\Account;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class JournalController extends Controller
{
    public function index()
    {
        $journals = Journal::with('entries.account')->orderBy('date', 'desc')->paginate(10);
        return Inertia::render('Journals/Index', [
            'journals' => $journals
        ]);
    }

    public function create()
    {
        $accounts = Account::where('is_active', true)->orderBy('code')->get();
        return Inertia::render('Journals/Create', [
            'accounts' => $accounts
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'reference' => 'required|string|max:50',
            'date' => 'required|date',
            'description' => 'nullable|string',
            'status' => 'required|string|in:draft,posted',
            'entries' => 'required|array|min:2',
            'entries.*.account_id' => 'required|exists:accounts,id',
            'entries.*.debit' => 'required|numeric|min:0',
            'entries.*.credit' => 'required|numeric|min:0',
        ]);

        // Enforce financial integrity: sum of debits must equal sum of credits
        $totalDebit = collect($validated['entries'])->sum('debit');
        $totalCredit = collect($validated['entries'])->sum('credit');

        if (round($totalDebit, 4) !== round($totalCredit, 4)) {
            return back()->withErrors(['entries' => 'Total debits must equal total credits.']);
        }

        DB::transaction(function () use ($request, $validated) {
            $orgId = $request->user()->active_organisation_id;

            $journal = Journal::create([
                'organisation_id' => $orgId,
                'reference' => $validated['reference'],
                'date' => $validated['date'],
                'description' => $validated['description'],
                'status' => $validated['status'],
            ]);

            foreach ($validated['entries'] as $entry) {
                $journal->entries()->create([
                    'organisation_id' => $orgId,
                    'account_id' => $entry['account_id'],
                    'debit' => $entry['debit'],
                    'credit' => $entry['credit'],
                ]);
            }
        });

        return redirect()->route('journals.index')->with('success', 'Journal created successfully.');
    }

    public function show(Journal $journal)
    {
        $journal->load('entries.account');
        return Inertia::render('Journals/Show', [
            'journal' => $journal
        ]);
    }

    public function destroy(Journal $journal)
    {
        if ($journal->status === 'posted') {
            return back()->withErrors(['status' => 'Posted journals cannot be deleted. Use reversal entries.']);
        }

        $journal->delete();
        return redirect()->route('journals.index')->with('success', 'Journal deleted successfully.');
    }
}
