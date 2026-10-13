<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ScopedBy([TenantScope::class])]
class SalesInvoice extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'customer_id',
        'sales_order_id',
        'project_id',
        'quotation_id',
        'boq_id',
        'invoice_type',
        'description',
        'certificate_reference',
        'subcontractor_certificate_id',
        'income_account_id',
        'invoice_number',
        'issue_date',
        'due_date',
        'status',
        'subtotal',
        'tax_amount',
        'total_amount',
        'amount_paid',
        'notes',
    ];

    protected $casts = [
        'subtotal' => 'decimal:4',
        'tax_amount' => 'decimal:4',
        'total_amount' => 'decimal:4',
        'amount_paid' => 'decimal:4',
        'issue_date' => 'date',
        'due_date' => 'date',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function salesOrder(): BelongsTo
    {
        return $this->belongsTo(SalesOrder::class);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function quotation(): BelongsTo
    {
        return $this->belongsTo(Quotation::class);
    }

    public function boq(): BelongsTo
    {
        return $this->belongsTo(Boq::class);
    }

    public function subcontractorCertificate(): BelongsTo
    {
        return $this->belongsTo(SubcontractorCertificate::class);
    }

    public function incomeAccount(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'income_account_id');
    }
}
