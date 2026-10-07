<?php

namespace App\Services\Approval;

use App\Models\AIApproval;
use Illuminate\Support\Facades\DB;

class ApprovalService
{
    /**
     * Submit an action for maker-checker approval.
     */
    public function requestApproval(int $organisationId, int $userId, string $actionName, array $payload): AIApproval
    {
        return AIApproval::create([
            'organisation_id' => $organisationId,
            'user_id' => $userId,
            'action_name' => $actionName,
            'payload' => $payload,
            'status' => 'pending',
        ]);
    }

    public function confirmApproval(AIApproval $approval): bool
    {
        return $approval->update(['status' => 'confirmed']);
    }

    public function cancelApproval(AIApproval $approval): bool
    {
        return $approval->update(['status' => 'cancelled']);
    }
}
