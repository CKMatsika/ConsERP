<?php

namespace App\Services\AI;

use App\Models\Project;
use App\Models\Boq;
use App\Models\InventoryItem;
use App\Models\PurchaseRequisition;
use App\Models\Account;
use App\Models\SheqIncident;

class AIToolRegistry
{
    protected array $tools = [];

    public function __construct()
    {
        $this->registerDefaultTools();
    }

    protected function registerDefaultTools(): void
    {
        $this->tools['projects.search'] = fn($params, $orgId) => Project::where('organisation_id', $orgId)->where('name', 'like', "%{$params['query']}%")->get();
        $this->tools['projects.summary'] = fn($params, $orgId) => Project::where('organisation_id', $orgId)->with('customer')->get();
        $this->tools['boq.variance'] = fn($params, $orgId) => Boq::where('organisation_id', $orgId)->with('items')->get();
        $this->tools['inventory.check'] = fn($params, $orgId) => InventoryItem::where('organisation_id', $orgId)->get();
        $this->tools['procurement.open_requisitions'] = fn($params, $orgId) => PurchaseRequisition::where('organisation_id', $orgId)->where('status', 'draft')->get();
        $this->tools['finance.cash_position'] = fn($params, $orgId) => Account::where('organisation_id', $orgId)->where('type', 'asset')->get();
        $this->tools['sheq.open_actions'] = fn($params, $orgId) => SheqIncident::where('organisation_id', $orgId)->where('status', 'open')->get();
    }

    public function execute(string $toolName, array $params, int $organisationId): mixed
    {
        if (!isset($this->tools[$toolName])) {
            throw new \InvalidArgumentException("Tool [{$toolName}] is not registered or not permitted.");
        }

        return call_user_func($this->tools[$toolName], $params, $organisationId);
    }
}
