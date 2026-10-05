<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\JournalEntry;
use App\Models\SalesInvoice;
use App\Models\SupplierInvoice;
use App\Models\BankAccount;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FinancialsReportController extends Controller
{
    public function trialBalance()
    {
        $accounts = Account::with('organisation')->get()->map(function ($acc) {
            $debit = JournalEntry::where('account_id', $acc->id)->sum('debit');
            $credit = JournalEntry::where('account_id', $acc->id)->sum('credit');
            return [
                'id' => $acc->id,
                'code' => $acc->code,
                'name' => $acc->name,
                'type' => $acc->type,
                'debit' => $debit,
                'credit' => $credit,
            ];
        });

        $totalDebit = $accounts->sum('debit');
        $totalCredit = $accounts->sum('credit');

        return Inertia::render('Financials/Reports/TrialBalance', [
            'accounts' => $accounts,
            'totalDebit' => $totalDebit,
            'totalCredit' => $totalCredit,
        ]);
    }

    public function profitLoss()
    {
        $revenueAccounts = Account::where('type', 'revenue')->get();
        $expenseAccounts = Account::where('type', 'expense')->get();

        $revenues = $revenueAccounts->map(function ($acc) {
            $credit = JournalEntry::where('account_id', $acc->id)->sum('credit');
            $debit = JournalEntry::where('account_id', $acc->id)->sum('debit');
            return ['name' => $acc->name, 'code' => $acc->code, 'amount' => $credit - $debit];
        });

        $expenses = $expenseAccounts->map(function ($acc) {
            $debit = JournalEntry::where('account_id', $acc->id)->sum('debit');
            $credit = JournalEntry::where('account_id', $acc->id)->sum('credit');
            return ['name' => $acc->name, 'code' => $acc->code, 'amount' => $debit - $credit];
        });

        $totalRevenue = $revenues->sum('amount');
        $totalExpense = $expenses->sum('amount');
        $netProfit = $totalRevenue - $totalExpense;

        return Inertia::render('Financials/Reports/ProfitLoss', [
            'revenues' => $revenues,
            'expenses' => $expenses,
            'totalRevenue' => $totalRevenue,
            'totalExpense' => $totalExpense,
            'netProfit' => $netProfit,
        ]);
    }

    public function balanceSheet()
    {
        $assets = Account::where('type', 'asset')->get()->map(fn($acc) => [
            'name' => $acc->name, 'code' => $acc->code,
            'balance' => JournalEntry::where('account_id', $acc->id)->sum('debit') - JournalEntry::where('account_id', $acc->id)->sum('credit')
        ]);

        $liabilities = Account::where('type', 'liability')->get()->map(fn($acc) => [
            'name' => $acc->name, 'code' => $acc->code,
            'balance' => JournalEntry::where('account_id', $acc->id)->sum('credit') - JournalEntry::where('account_id', $acc->id)->sum('debit')
        ]);

        $equity = Account::where('type', 'equity')->get()->map(fn($acc) => [
            'name' => $acc->name, 'code' => $acc->code,
            'balance' => JournalEntry::where('account_id', $acc->id)->sum('credit') - JournalEntry::where('account_id', $acc->id)->sum('debit')
        ]);

        return Inertia::render('Financials/Reports/BalanceSheet', [
            'assets' => $assets,
            'liabilities' => $liabilities,
            'equity' => $equity,
            'totalAssets' => $assets->sum('balance'),
            'totalLiabilities' => $liabilities->sum('balance'),
            'totalEquity' => $equity->sum('balance'),
        ]);
    }

    public function cashFlow()
    {
        $bankAccounts = BankAccount::all();
        return Inertia::render('Financials/Reports/CashFlow', [
            'bankAccounts' => $bankAccounts,
            'totalCash' => $bankAccounts->sum('balance'),
        ]);
    }

    public function agedDebtors()
    {
        $invoices = SalesInvoice::with('customer')->where('status', '!=', 'paid')->get();
        return Inertia::render('Financials/Reports/AgedDebtors', [
            'invoices' => $invoices,
            'totalAr' => $invoices->sum(fn($i) => $i->total_amount - $i->amount_paid),
        ]);
    }

    public function agedCreditors()
    {
        $bills = SupplierInvoice::with('supplier')->where('status', '!=', 'paid')->get();
        return Inertia::render('Financials/Reports/AgedCreditors', [
            'bills' => $bills,
            'totalAp' => $bills->sum(fn($b) => $b->total_amount - $b->amount_paid),
        ]);
    }
}
