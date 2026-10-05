<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;

#[ScopedBy([TenantScope::class])]
class CostCode extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'code',
        'name',
        'description',
        'category',
    ];
}
