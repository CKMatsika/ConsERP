<?php

namespace App\Services\AI;

class OpenAIProvider implements AIProviderInterface
{
    protected string $model;
    protected ?string $apiKey;

    public function __construct(string $model = 'gpt-4o', ?string $apiKey = null)
    {
        $this->model = $model;
        $this->apiKey = $apiKey;
    }

    public function chat(array $messages, array $options = []): array
    {
        $lastMessage = end($messages)['content'] ?? 'Hello';
        
        return [
            'content' => "ConstructAI (OpenAI / {$this->model}) processed: " . $lastMessage,
            'input_tokens' => 50,
            'output_tokens' => 30,
        ];
    }

    public function getModelName(): string
    {
        return $this->model;
    }
}
