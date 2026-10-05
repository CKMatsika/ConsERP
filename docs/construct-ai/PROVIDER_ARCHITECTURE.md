# ConstructAI Provider Architecture

## Provider Abstraction
ConstructAI abstracts LLM providers via `AIProviderInterface`.
Supported adapters:
- `GeminiProvider`
- `OpenAIProvider`
- `AnthropicProvider`
Allows dynamic configuration per organisation with graceful failure handling.
