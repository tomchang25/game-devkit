# {{PROJECT_NAME}} Development Governance

{{PROJECT_NAME}} is a `{{PLATFORM}}` consumer of the shared governance foundation. The foundation is pinned as the `dev/foundation/` submodule at one exact commit; do not edit it from this repository or recreate its rules locally. This README is navigation only: it routes work to its canonical owner and does not own placement rules.

## Load order

1. Repository root entry point (`AGENTS.md` / `CLAUDE.md`).
2. `dev/foundation/core/agent_rules/foundation_startup.md`.
3. `dev/foundation/platforms/{{PLATFORM}}/platform_startup.md`, selected by `dev/foundation.config.json`.
4. `dev/agent_rules/agent_startup.md` for this project's snapshot, operations, and local discovery.

The foundation owns document placement, core workflows, shared agent behavior, and platform standards. Every selected profile ({{PROFILES}}) loads its own startup in declared order. Read shared rules directly from `dev/foundation/`; keep only project-specific deltas below.

## Local ownership

- `dev/agent_rules/`: project snapshot, Git permissions, and executable validation operations.
- `dev/standards/`: project-specific addenda and any local governance policy.
- `dev/skills/`: only project-specific hazard cards, never a copy of a foundation skill.
- `dev/docs/`: product design, active plans, reports, and archives.
- `dev/tools/`: project-owned validators.

## Trigger map

Route each kind of work to its required reading before starting. Extend this table with the platform-specific rows named in `dev/foundation/platforms/{{PLATFORM}}/platform_startup.md`, plus this project's own standards and skills.

| Work | Required reading |
| --- | --- |
| Add, move, or reorganize governance or documentation files | `foundation/core/standards/governance_structure_standard.md` |
| Create or update a plan, sketch, spec, review, or closeout | `foundation/core/workflows/work_lifecycle.md` and the matching workflow under `foundation/core/workflows/` |
| Change a runtime state owner, command, selector, or persisted contract | `foundation/core/standards/runtime_ownership.md` |
| Run validation or deliver a change | `dev/agent_rules/test_operations.md` |
| Any Git mutation | `dev/agent_rules/git_operations.md` |
| Change local governance or its checker | `dev/standards/` local governance policy and this project's checker |
