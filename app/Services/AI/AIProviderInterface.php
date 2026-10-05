<?php

namespace App\Services\AI;

interface AIProviderInterface
{
    public function chat(array $messages, array $options = []): array;
    public function getModelName(): string;
}
