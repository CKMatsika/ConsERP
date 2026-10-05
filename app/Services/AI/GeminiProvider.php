<?php

namespace App\Services\AI;

class GeminiProvider implements AIProviderInterface
{
    protected string $model;
    protected ?string $apiKey;

    public function __construct(string $model = 'gemini-1.5-pro', ?string $apiKey = null)
    {
        $this->model = $model;
        $this->apiKey = $apiKey;
    }

    public function chat(array $messages, array $options = []): array
    {
        // Graceful mock or API call implementation for Gemini
        $lastMessage = end($messages)['content'] ?? 'Hello';
        
        return [
            'content' => "ConstructAI (Gemini / {$this->model}) processed: " . $lastMessage,
            'input_tokens' => 50,
            'output_tokens' => 30,
        ];
    }

    public function getModelName(): string
    {
        return $this->model;
    }
}
