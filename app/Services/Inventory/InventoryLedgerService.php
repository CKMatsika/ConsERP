<?php

namespace App\Services\Inventory;

use App\Models\StockMovement;
use Illuminate\Support\Facades\DB;

class InventoryLedgerService
{
    /**
     * Record an authoritative stock movement with transaction locking.
     */
    public function recordMovement(int $organisationId, int $itemId, int $warehouseId, string $type, float $quantity, ?string $reference = null): StockMovement
    {
        return DB::transaction(function () use ($organisationId, $itemId, $warehouseId, $type, $quantity, $reference) {
            return StockMovement::create([
                'organisation_id' => $organisationId,
                'inventory_item_id' => $itemId,
                'warehouse_id' => $warehouseId,
                'movement_type' => $type,
                'quantity' => $quantity,
                'reference' => $reference,
            ]);
        });
    }
}
