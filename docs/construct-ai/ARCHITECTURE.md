# ConstructAI Architecture

## Overview
ConstructAI is an intelligent, natural-language and agentic interface layer for ConsERP. It operates entirely as an optional, standalone module that orchestrates existing application services without duplicating business logic.

## Key Principles
1. **Non-Intrusive:** ConstructAI never replaces the traditional ERP; users can toggle between Traditional Mode and AI Assisted Mode.
2. **Strict Tenancy:** All AI conversations, messages, executions, and usage logs enforce `organisation_id` boundaries.
3. **Permission Inheritance:** AI actions and queries are strictly bound by the user's existing RBAC permissions (`AI permissions <= Human permissions`).
4. **Deterministic Calculations:** Financial and quantity calculations use deterministic application services, never LLM hallucinations.
