<?php

namespace Tests\Feature;

use App\Models\Organisation;
use App\Models\User;
use App\Models\Account;
use App\Models\PurchaseOrder;
use App\Models\GoodsReceiptNote;
use App\Models\SupplierInvoice;
use App\Models\Warehouse;
use App\Models\InventoryItem;
use App\Services\Accounting\AccountingPostingService;
use App\Services\Procurement\ThreeWayMatchingService;
use App\Services\Inventory\InventoryLedgerService;
use App\Services\AI\AIToolRegistry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductionHardeningTest extends TestCase
{
    use RefreshDatabase;

    public function test_accounting_posting_service_ensures_balanced_journals()
    {
        $org = Organisation::create(['name' => 'Org Finance']);
        $acc1 = Account::create(['organisation_id' => $org->id, 'code' => '1000', 'name' => 'Cash', 'type' => 'asset']);
        $acc2 = Account::create(['organisation_id' => $org->id, 'code' => '4000', 'name' => 'Revenue', 'type' => 'revenue']);

        $service = new AccountingPostingService();

        $journal = $service->postJournal($org->id, 'JRN-001', '2026-10-05', 'Test Entry', [
            ['account_id' => $acc1->id, 'debit' => 500, 'credit' => 0],
            ['account_id' => $acc2->id, 'debit' => 0, 'credit' => 500],
        ]);

        $this->assertNotNull($journal);
        $this->assertEquals('posted', $journal->status);
        $this->assertEquals(500, $journal->entries->sum('debit'));
        $this->assertEquals(500, $journal->entries->sum('credit'));
    }

    public function test_three_way_matching_service()
    {
        $org = Organisation::create(['name' => 'Org Proc']);
        $supplier = \App\Models\Supplier::create(['organisation_id' => $org->id, 'name' => 'Sup A']);
        $warehouse = Warehouse::create(['organisation_id' => $org->id, 'name' => 'WH 1', 'code' => 'WH1']);

        $po = PurchaseOrder::create([
            'organisation_id' => $org->id,
            'supplier_id' => $supplier->id,
            'po_number' => 'PO-100',
            'order_date' => '2026-10-05',
            'total_amount' => 1000,
            'status' => 'sent',
        ]);

        $grn = GoodsReceiptNote::create([
            'organisation_id' => $org->id,
            'purchase_order_id' => $po->id,
            'warehouse_id' => $warehouse->id,
            'grn_number' => 'GRN-100',
            'received_date' => '2026-10-05',
            'status' => 'accepted',
        ]);

        $invoice = SupplierInvoice::create([
            'organisation_id' => $org->id,
            'supplier_id' => $supplier->id,
            'purchase_order_id' => $po->id,
            'invoice_number' => 'INV-100',
            'issue_date' => '2026-10-05',
            'due_date' => '2026-11-05',
            'total_amount' => 1000,
        ]);

        $matcher = new ThreeWayMatchingService();
        $result = $matcher->match($po, $grn, $invoice);

        $this->assertTrue($result['three_way_matched']);
    }

    public function test_inventory_ledger_service()
    {
        $org = Organisation::create(['name' => 'Org Inv']);
        $warehouse = Warehouse::create(['organisation_id' => $org->id, 'name' => 'WH 1', 'code' => 'WH1']);
        $item = InventoryItem::create(['organisation_id' => $org->id, 'sku' => 'CEMENT', 'name' => 'Cement Bag', 'unit' => 'bag', 'unit_cost' => 10]);

        $ledger = new InventoryLedgerService();
        $movement = $ledger->recordMovement($org->id, $item->id, $warehouse->id, 'in', 100, 'PO-1');

        $this->assertNotNull($movement);
        $this->assertEquals(100, $movement->quantity);
        $this->assertEquals('in', $movement->movement_type);
    }

    public function test_ai_tool_registry()
    {
        $org = Organisation::create(['name' => 'Org AI']);
        $registry = new AIToolRegistry();
        $result = $registry->execute('finance.cash_position', [], $org->id);

        $this->assertNotNull($result);
    }
}
