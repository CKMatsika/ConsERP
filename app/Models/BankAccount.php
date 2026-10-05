<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[ScopedBy([TenantScope::class])]
class BankAccount extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'account_id',
        'bank_name',
        'account_number',
        'currency',
        'balance',
    ];

    protected $casts = [
        'balance' => 'decimal:4',
    ];

    public function glAccount(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'account_id');
    }

    public function statementLines(): HasMany
    {
        return $this->hasMany(BankStatementLine::class);
    }
}
