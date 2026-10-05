<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[ScopedBy([TenantScope::class])]
class Journal extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'reference',
        'date',
        'description',
        'status',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function entries(): HasMany
    {
        return $this->hasMany(JournalEntry::class);
    }
}
