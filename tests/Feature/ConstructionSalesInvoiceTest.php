<?php

namespace Tests\Feature;

use App\Models\Organisation;
use App\Models\User;
use App\Models\Customer;
use App\Models\Project;
use App\Models\Quotation;
use App\Models\Boq;
use App\Models\SubcontractorValuation;
use App\Models\SubcontractorCertificate;
use App\Models\Supplier;
use App\Models\Account;
use App\Models\Journal;
use App\Models\SalesInvoice;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ConstructionSalesInvoiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_general_invoice_linked_to_project_estimate_and_custom_chart_of_accounts()
    {
        $org = Organisation::create(['name' => 'Apex Construction Ltd']);
        $user = User::factory()->create(['active_organisation_id' => $org->id]);
        $user->organisations()->attach($org->id);

        $customer = Customer::create(['organisation_id' => $org->id, 'name' => 'Metropolitan City Council']);
        $project = Project::create([
            'organisation_id' => $org->id,
            'customer_id' => $customer->id,
            'name' => 'Highrise Block B',
            'code' => 'PRJ-HB',
            'status' => 'active',
            'contract_value' => 500000,
        ]);
        $quotation = Quotation::create([
            'organisation_id' => $org->id,
            'customer_id' => $customer->id,
            'reference_number' => 'EST-2026-001',
            'title' => 'Structural Framing & Concrete Estimate',
            'status' => 'accepted',
            'issue_date' => '2026-10-01',
            'valid_until' => '2026-11-01',
            'subtotal' => 200000,
            'tax_amount' => 30000,
            'total_amount' => 230000,
        ]);
        $customRevenueAcc = Account::create([
            'organisation_id' => $org->id,
            'code' => '4100',
            'name' => 'Civil Contracting Revenue',
            'type' => 'revenue',
            'is_active' => true,
        ]);

        $this->actingAs($user);

        $response = $this->post(route('sales-invoices.store'), [
            'customer_id' => $customer->id,
            'project_id' => $project->id,
            'quotation_id' => $quotation->id,
            'invoice_type' => 'general',
            'description' => 'Milestone 1: Structural steel framing and site mobilization',
            'income_account_id' => $customRevenueAcc->id,
            'invoice_number' => 'INV-GEN-101',
            'issue_date' => '2026-10-10',
            'due_date' => '2026-11-10',
            'status' => 'sent',
            'subtotal' => 50000,
            'tax_amount' => 7500,
            'total_amount' => 57500,
        ]);

        $response->assertRedirect(route('sales-invoices.index'));

        $invoice = SalesInvoice::where('invoice_number', 'INV-GEN-101')->first();
        $this->assertNotNull($invoice);
        $this->assertEquals('general', $invoice->invoice_type);
        $this->assertEquals('Milestone 1: Structural steel framing and site mobilization', $invoice->description);
        $this->assertEquals($project->id, $invoice->project_id);
        $this->assertEquals($quotation->id, $invoice->quotation_id);
        $this->assertEquals($customRevenueAcc->id, $invoice->income_account_id);

        // Verify Journal entry used the custom Revenue account from Chart of Accounts
        $journal = Journal::where('organisation_id', $org->id)
            ->where('reference', 'INV-INV-GEN-101')
            ->first();
        $this->assertNotNull($journal);
        $this->assertStringContainsString('Milestone 1', $journal->description);

        $creditEntry = $journal->entries()->where('account_id', $customRevenueAcc->id)->first();
        $this->assertNotNull($creditEntry);
        $this->assertEquals(57500, $creditEntry->credit);
    }

    public function test_can_create_measured_work_invoice_linked_to_certificate()
    {
        $org = Organisation::create(['name' => 'Apex Construction Ltd']);
        $user = User::factory()->create(['active_organisation_id' => $org->id]);
        $user->organisations()->attach($org->id);

        $customer = Customer::create(['organisation_id' => $org->id, 'name' => 'Global Developers']);
        $project = Project::create([
            'organisation_id' => $org->id,
            'customer_id' => $customer->id,
            'name' => 'Airport Terminal Runway Extension',
            'code' => 'PRJ-AIR',
            'status' => 'active',
            'contract_value' => 1200000,
        ]);
        $supplier = Supplier::create(['organisation_id' => $org->id, 'name' => 'Earthmoving Subcontractors']);
        $valuation = SubcontractorValuation::create([
            'organisation_id' => $org->id,
            'project_id' => $project->id,
            'supplier_id' => $supplier->id,
            'valuation_number' => 'VAL-004',
            'valuation_date' => '2026-10-01',
            'certified_amount' => 75000,
            'status' => 'certified',
        ]);
        $cert = SubcontractorCertificate::create([
            'organisation_id' => $org->id,
            'subcontractor_valuation_id' => $valuation->id,
            'certificate_number' => 'CERT-IPC-004',
            'issue_date' => '2026-10-02',
            'amount' => 75000,
        ]);

        $this->actingAs($user);

        $response = $this->post(route('sales-invoices.store'), [
            'customer_id' => $customer->id,
            'project_id' => $project->id,
            'invoice_type' => 'measured_work',
            'description' => 'Interim Progress Claim #4: Asphalt paving and subbase measured quantities per IPC-004',
            'certificate_reference' => 'IPC-004-CLIENT-CERT',
            'subcontractor_certificate_id' => $cert->id,
            'invoice_number' => 'INV-MEASURED-04',
            'issue_date' => '2026-10-05',
            'due_date' => '2026-11-05',
            'status' => 'sent',
            'subtotal' => 75000,
            'tax_amount' => 11250,
            'total_amount' => 86250,
        ]);

        $response->assertRedirect(route('sales-invoices.index'));

        $invoice = SalesInvoice::where('invoice_number', 'INV-MEASURED-04')->first();
        $this->assertNotNull($invoice);
        $this->assertEquals('measured_work', $invoice->invoice_type);
        $this->assertEquals('IPC-004-CLIENT-CERT', $invoice->certificate_reference);
        $this->assertEquals($cert->id, $invoice->subcontractor_certificate_id);
    }
}
