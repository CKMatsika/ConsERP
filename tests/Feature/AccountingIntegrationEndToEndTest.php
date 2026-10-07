<?php

namespace Tests\Feature;

use App\Models\Organisation;
use App\Models\User;
use App\Models\Customer;
use App\Models\Supplier;
use App\Models\SalesInvoice;
use App\Models\SupplierInvoice;
use App\Models\CustomerPayment;
use App\Models\SupplierPayment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AccountingIntegrationEndToEndTest extends TestCase
{
    use RefreshDatabase;

    public function test_end_to_end_operational_to_accounting_integration()
    {
        $org = Organisation::create(['name' => 'ConsERP Enterprise']);
        $user = User::factory()->create(['active_organisation_id' => $org->id]);
        $user->organisations()->attach($org->id);

        $customer = Customer::create(['organisation_id' => $org->id, 'name' => 'Acme Corp']);
        $supplier = Supplier::create(['organisation_id' => $org->id, 'name' => 'BuildCo Suppliers']);

        $this->actingAs($user);

        // 1. Create Sales Invoice (should auto-post journal)
        $this->post(route('sales-invoices.store'), [
            'customer_id' => $customer->id,
            'invoice_number' => 'INV-E2E-01',
            'issue_date' => '2026-10-05',
            'due_date' => '2026-11-05',
            'status' => 'sent',
            'subtotal' => 1000,
            'tax_amount' => 100,
            'total_amount' => 1100,
        ])->assertRedirect(route('sales-invoices.index'));

        $invoice = SalesInvoice::where('invoice_number', 'INV-E2E-01')->first();
        $this->assertNotNull($invoice);

        // 2. Create Supplier Invoice / Bill (should auto-post journal)
        $this->post(route('supplier-invoices.store'), [
            'supplier_id' => $supplier->id,
            'invoice_number' => 'BILL-E2E-01',
            'issue_date' => '2026-10-05',
            'due_date' => '2026-11-05',
            'status' => 'approved',
            'subtotal' => 500,
            'tax_amount' => 50,
            'total_amount' => 550,
        ])->assertRedirect(route('supplier-invoices.index'));

        $bill = SupplierInvoice::where('invoice_number', 'BILL-E2E-01')->first();
        $this->assertNotNull($bill);

        // 3. Record Customer Payment (Receipt)
        $this->post(route('customer-payments.store'), [
            'customer_id' => $customer->id,
            'sales_invoice_id' => $invoice->id,
            'payment_reference' => 'PMT-01',
            'payment_date' => '2026-10-05',
            'amount' => 1100,
            'payment_method' => 'bank_transfer',
        ])->assertRedirect(route('customer-payments.index'));

        // 4. Record Supplier Payment
        $this->post(route('supplier-payments.store'), [
            'supplier_id' => $supplier->id,
            'supplier_invoice_id' => $bill->id,
            'payment_reference' => 'SPMT-01',
            'payment_date' => '2026-10-05',
            'amount' => 550,
            'payment_method' => 'bank_transfer',
        ])->assertRedirect(route('supplier-payments.index'));

        // Verify journals were created and trial balance is balanced
        $journals = \App\Models\Journal::all();
        $this->assertGreaterThan(0, $journals->count());

        foreach ($journals as $journal) {
            $totalDebit = $journal->entries->sum('debit');
            $totalCredit = $journal->entries->sum('credit');
            $this->assertEquals($totalDebit, $totalCredit, "Journal {$journal->reference} is unbalanced.");
        }
    }
}
