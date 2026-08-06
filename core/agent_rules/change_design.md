# Change Design

Use the current behavior owner as the default change surface. A change introduces another path only when a demonstrated requirement or an existing compatibility contract makes the current owner insufficient.

## Direct Change

- Strengthen or generalize the current owner around demonstrated cases when its contract is too narrow.
- When an API must change, update the API and every known consumer in the same landing, then remove the obsolete path.
- Do not add speculative wrappers, redirects, aliases, duplicate APIs, feature flags, configuration, extension points, or migrations. Add one only when the current requirement or an existing compatibility contract needs it.
- Preserve explicit compatibility contracts. Direct change does not authorize breaking supported APIs, persisted data, or external integrations.
- Remove superseded code, documentation, tests, and configuration in the same change unless another active consumer still owns their lifetime.

## Module And Dependency Boundaries

- Split a module when responsibility, state ownership, lifecycle, or dependency direction differs. File size or possible future reuse is not sufficient by itself.
- Inspect existing dependency documentation, exported types, and nearby owners before adding a new abstraction or package.
- Adopt a maintained library only when its API, operational cost, integration boundary, and test burden reduce total complexity compared with the local implementation.
- Prefer the smallest complete end-to-end change on a durable ownership seam. A partial layer that requires a temporary parallel path is not smaller.

## Research Threshold

Research established product or technical patterns before a consequential user-facing workflow, interaction, or architecture decision when mature precedent exists and the direction is not already decided.

Do not require external research for mechanical changes, decisions already made by the user or an authoritative artifact, or local implementation details that the current code and contracts resolve. Research informs a decision; it does not delay execution after the decision is owned.

Persistence changes also follow `core/agent_rules/save_migrations.md`, which distinguishes required compatibility work from speculative migration code.
