<?php

namespace App\Services;

use App\Models\Journal;
use App\Models\Customer;
use App\Models\Supplier;

class XeroIntegrationService
{
    /**
     * Prepare or sync a journal to Xero API (stub).
     */
    public function syncJournal(Journal $journal): bool
    {
        // Xero API connector preparation layer
        // Authoritative core system pushes to Xero when enabled
        return true;
    }

    /**
     * Sync contacts (customers & suppliers) to Xero API (stub).
     */
    public function syncContact($contact): bool
    {
        return true;
    }
}
