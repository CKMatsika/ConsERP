<?php

namespace App\Services\Accounting;

use App\Models\Journal;
use App\Models\JournalEntry;
use Illuminate\Support\Facades\DB;

class AccountingPostingService
{
    /**
     * Post a balanced double-entry journal.
     */
    public function postJournal(int $organisationId, string $reference, string $date, string $description, array $entries): Journal
    {
        $totalDebit = collect($entries)->sum('debit');
        $totalCredit = collect($entries)->sum('credit');

        if (round($totalDebit, 4) !== round($totalCredit, 4)) {
            throw new \InvalidArgumentException("Journal debits ($totalDebit) must equal credits ($totalCredit).");
        }

        return DB::transaction(function () use ($organisationId, $reference, $date, $description, $entries) {
            $journal = Journal::create([
                'organisation_id' => $organisationId,
                'reference' => $reference,
                'date' => $date,
                'description' => $description,
                'status' => 'posted',
            ]);

            foreach ($entries as $entry) {
                JournalEntry::create([
                    'organisation_id' => $organisationId,
                    'journal_id' => $journal->id,
                    'account_id' => $entry['account_id'],
                    'debit' => $entry['debit'] ?? 0,
                    'credit' => $entry['credit'] ?? 0,
                ]);
            }

            return $journal;
        });
    }
}
