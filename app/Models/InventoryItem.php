<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;

#[ScopedBy([TenantScope::class])]
class InventoryItem extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'sku',
        'name',
        'unit',
        'unit_cost',
        'reorder_level',
    ];

    protected $casts = [
        'unit_cost' => 'decimal:4',
        'reorder_level' => 'decimal:4',
    ];
}
