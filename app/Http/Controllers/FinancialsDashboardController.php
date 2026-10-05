<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Journal;
use App\Models\JournalEntry;
use App\Models\SalesInvoice;
use App\Models\SupplierInvoice;
use Inertia\Inertia;

class FinancialsDashboardController extends Controller
{
    public function index()
    {
        $totalAR = SalesInvoice::where('status', '!=', 'paid')->sum(\Illuminate\Support\Facades\DB::raw('total_amount - amount_paid'));
        $totalAP = SupplierInvoice::where('status', '!=', 'paid')->sum(\Illuminate\Support\Facades\DB::raw('total_amount - amount_paid'));
        $totalDebits = JournalEntry::sum('debit');
        $totalCredits = JournalEntry::sum('credit');

        $metrics = [
            'accounts_count' => Account::count(),
            'draft_journals' => Journal::where('status', 'draft')->count(),
            'posted_journals' => Journal::where('status', 'posted')->count(),
            'total_ar' => $totalAR,
            'total_ap' => $totalAP,
            'total_debits' => $totalDebits,
            'total_credits' => $totalCredits,
        ];

        $recentJournals = Journal::with('entries.account')->orderBy('date', 'desc')->take(5)->get();

        return Inertia::render('Financials/Dashboard', [
            'metrics' => $metrics,
            'recentJournals' => $recentJournals,
        ]);
    }
}
