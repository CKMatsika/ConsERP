<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ScopedBy([TenantScope::class])]
class BankStatementLine extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'bank_account_id',
        'date',
        'description',
        'amount',
        'is_reconciled',
    ];

    protected $casts = [
        'amount' => 'decimal:4',
        'date' => 'date',
        'is_reconciled' => 'boolean',
    ];

    public function bankAccount(): BelongsTo
    {
        return $this->belongsTo(BankAccount::class);
    }
}
