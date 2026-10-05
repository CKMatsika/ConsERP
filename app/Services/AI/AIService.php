<?php

namespace App\Services\AI;

use App\Models\AIUsage;
use Illuminate\Support\Facades\Crypt;

class AIService
{
    public function resolveProvider(?array $settings = null): AIProviderInterface
    {
        $providerName = $settings['provider'] ?? 'gemini';
        $model = $settings['model'] ?? 'gemini-1.5-pro';
        $encryptedKey = $settings['api_key'] ?? null;
        $apiKey = $encryptedKey ? Crypt::decryptString($encryptedKey) : null;

        return match (strtolower($providerName)) {
            'openai' => new OpenAIProvider($model, $apiKey),
            'anthropic' => new AnthropicProvider($model, $apiKey),
            default => new GeminiProvider($model, $apiKey),
        };
    }

    public function chat(int $organisationId, int $userId, array $messages, ?array $settings = null): string
    {
        try {
            $provider = $this->resolveProvider($settings);
            $response = $provider->chat($messages);

            // Record usage
            AIUsage::create([
                'organisation_id' => $organisationId,
                'user_id' => $userId,
                'provider' => get_class($provider),
                'model' => $provider->getModelName(),
                'input_tokens' => $response['input_tokens'] ?? 0,
                'output_tokens' => $response['output_tokens'] ?? 0,
                'estimated_cost' => 0.001,
            ]);

            return $response['content'];
        } catch (\Exception $e) {
            // Graceful fail-safe fallback
            return "ConstructAI is currently unavailable. You can continue using the standard ERP.";
        }
    }
}
