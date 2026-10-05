<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use App\Models\BankStatementLine;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BankReconciliationController extends Controller
{
    public function index(Request $request)
    {
        $bankAccountId = $request->get('bank_account_id');
        $bankAccounts = BankAccount::all();
        $statementLines = collect();

        if ($bankAccountId) {
            $statementLines = BankStatementLine::where('bank_account_id', $bankAccountId)
                ->orderBy('date', 'desc')
                ->get();
        }

        return Inertia::render('Financials/Banking/Reconciliation', [
            'bankAccounts' => $bankAccounts,
            'statementLines' => $statementLines,
            'selectedBankId' => $bankAccountId,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'bank_account_id' => 'required|exists:bank_accounts,id',
            'date' => 'required|date',
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;
        $validated['is_reconciled'] = false;

        BankStatementLine::create($validated);

        return redirect()->back()->with('success', 'Bank statement line imported/added successfully.');
    }

    public function reconcile(Request $request, BankStatementLine $statementLine)
    {
        $statementLine->update([
            'is_reconciled' => !$statementLine->is_reconciled,
        ]);

        return redirect()->back()->with('success', 'Bank reconciliation status updated.');
    }
}
