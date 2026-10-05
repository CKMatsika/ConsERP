<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ScopedBy([TenantScope::class])]
class ProductionOrder extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'prefab_product_id',
        'order_number',
        'quantity',
        'status',
        'due_date',
    ];

    protected $casts = [
        'quantity' => 'decimal:4',
        'due_date' => 'date',
    ];

    public function prefabProduct(): BelongsTo
    {
        return $this->belongsTo(PrefabProduct::class);
    }
}
