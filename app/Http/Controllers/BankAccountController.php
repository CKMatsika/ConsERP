<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use App\Models\Account;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BankAccountController extends Controller
{
    public function index()
    {
        $bankAccounts = BankAccount::with('glAccount')->orderBy('bank_name')->paginate(10);
        return Inertia::render('Financials/Banking/Index', [
            'bankAccounts' => $bankAccounts
        ]);
    }

    public function create()
    {
        $glAccounts = Account::where('type', 'asset')->orderBy('code')->get();
        return Inertia::render('Financials/Banking/Create', [
            'glAccounts' => $glAccounts
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'account_id' => 'nullable|exists:accounts,id',
            'bank_name' => 'required|string|max:255',
            'account_number' => 'required|string|max:50',
            'currency' => 'required|string|size:3',
            'balance' => 'required|numeric',
        ]);

        $validated['organisation_id'] = $request->user()->active_organisation_id;

        BankAccount::create($validated);

        return redirect()->route('bank-accounts.index')->with('success', 'Bank account registered successfully.');
    }

    public function destroy(BankAccount $bankAccount)
    {
        $bankAccount->delete();
        return redirect()->route('bank-accounts.index')->with('success', 'Bank account deleted successfully.');
    }
}
