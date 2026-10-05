<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ScopedBy([TenantScope::class])]
class Prospect extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'lead_id',
        'customer_id',
        'name',
        'probability',
        'expected_close_date',
        'stage',
        'value',
        'notes',
    ];

    protected $casts = [
        'value' => 'decimal:4',
        'expected_close_date' => 'date',
    ];

    public function lead(): BelongsTo
    {
        return $this->belongsTo(Lead::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
