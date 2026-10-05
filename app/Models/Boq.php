<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[ScopedBy([TenantScope::class])]
class Boq extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'reference_number',
        'title',
        'status',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(BoqItem::class);
    }
}
