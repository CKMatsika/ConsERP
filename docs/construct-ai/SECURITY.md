# ConstructAI Security

## Security Controls
- API keys are encrypted at rest.
- Context is strictly isolated by organisation and user.
- Frontend context is never trusted for authorization; backend policies and middleware enforce permissions.
- Automated tests verify tenant isolation and prevent cross-tenant leakage.
