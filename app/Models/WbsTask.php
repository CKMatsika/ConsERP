<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[ScopedBy([TenantScope::class])]
class WbsTask extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'project_id',
        'parent_id',
        'name',
        'code',
        'progress_percentage',
    ];

    protected $casts = [
        'progress_percentage' => 'decimal:2',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(WbsTask::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(WbsTask::class, 'parent_id');
    }
}
