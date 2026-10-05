<?php

namespace App\Http\Controllers;

use App\Models\JournalEntry;
use App\Models\BankAccount;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CashbookController extends Controller
{
    public function index(Request $request)
    {
        $bankAccountId = $request->get('bank_account_id');
        $bankAccounts = BankAccount::with('glAccount')->get();

        $entries = collect();
        if ($bankAccountId) {
            $bankAccount = BankAccount::find($bankAccountId);
            if ($bankAccount && $bankAccount->account_id) {
                $entries = JournalEntry::with(['journal', 'account'])
                    ->where('account_id', $bankAccount->account_id)
                    ->orderBy('created_at', 'desc')
                    ->paginate(15);
            }
        } else {
            // Default to all entries touching bank/cash accounts or recent entries
            $entries = JournalEntry::with(['journal', 'account'])
                ->orderBy('created_at', 'desc')
                ->paginate(15);
        }

        return Inertia::render('Financials/Cashbook/Index', [
            'bankAccounts' => $bankAccounts,
            'entries' => $entries,
            'selectedBankId' => $bankAccountId,
        ]);
    }
}
