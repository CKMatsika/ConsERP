<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ScopedBy([TenantScope::class])]
class CreditNote extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'customer_id',
        'sales_invoice_id',
        'credit_note_number',
        'issue_date',
        'amount',
        'reason',
        'status',
    ];

    protected $casts = [
        'amount' => 'decimal:4',
        'issue_date' => 'date',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(SalesInvoice::class, 'sales_invoice_id');
    }
}
