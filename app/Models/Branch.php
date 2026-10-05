<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;

#[ScopedBy([TenantScope::class])]
class Branch extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'name',
        'code',
        'address',
        'is_active',
    ];
}
