<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;

#[ScopedBy([TenantScope::class])]
class Equipment extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'name',
        'asset_number',
        'category',
        'status',
        'purchase_date',
        'purchase_cost',
    ];

    protected $casts = [
        'purchase_cost' => 'decimal:4',
        'purchase_date' => 'date',
    ];
}
