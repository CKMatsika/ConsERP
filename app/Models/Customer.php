<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;

#[ScopedBy([TenantScope::class])]
class Customer extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'name',
        'trading_name',
        'registration_number',
        'tax_number',
        'email',
        'phone',
        'address',
        'city',
        'country',
        'is_active',
    ];
}
