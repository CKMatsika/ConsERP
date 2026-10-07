<?php

namespace Tests\Feature;

use App\Models\Organisation;
use App\Models\User;
use App\Models\AIConversation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ConstructAISecurityTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_cannot_access_other_organisation_or_user_ai_conversation()
    {
        $org1 = Organisation::create(['name' => 'Org A']);
        $org2 = Organisation::create(['name' => 'Org B']);

        $user1 = User::factory()->create(['active_organisation_id' => $org1->id]);
        $user2 = User::factory()->create(['active_organisation_id' => $org2->id]);

        $user1->organisations()->attach($org1->id);
        $user2->organisations()->attach($org2->id);

        $conversationOrg1 = AIConversation::create([
            'organisation_id' => $org1->id,
            'user_id' => $user1->id,
            'title' => 'Secret Org A Chat',
        ]);

        $this->actingAs($user2);

        // User2 tries to chat referencing User1's conversation ID
        $response = $this->postJson(route('construct-ai.chat'), [
            'conversation_id' => $conversationOrg1->id,
            'message' => 'Hacking into conversation',
        ]);

        // Should return 404 (ModelNotFoundException) because TenantScope and strict where filters prevent finding Org A's conversation for User2
        $response->assertStatus(404);
    }
}
