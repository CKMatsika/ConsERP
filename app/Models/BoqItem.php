<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ScopedBy([TenantScope::class])]
class BoqItem extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'boq_id',
        'cost_code_id',
        'item_number',
        'description',
        'unit',
        'quantity',
        'rate',
        'total_amount',
    ];

    protected $casts = [
        'quantity' => 'decimal:4',
        'rate' => 'decimal:4',
        'total_amount' => 'decimal:4',
    ];

    public function boq(): BelongsTo
    {
        return $this->belongsTo(Boq::class);
    }

    public function costCode(): BelongsTo
    {
        return $this->belongsTo(CostCode::class);
    }
}
