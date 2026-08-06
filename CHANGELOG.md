# Changelog

## 0.12.0

- Add the opt-in `deterministic-rules` profile for resolver/effect decision slices, single-writer mutation owners, acyclic owner direction, mechanical snapshot assembly, and access gates that exist before the first profiled module.
- Add a Web day-zero skill and consumer-owned dependency-cruiser and raw-state-census starters. Decision fences use configured import allowlists, the baseline may only shrink, and both gates are deliberately triggered once before use.
- Register the profile for Godot and Web React consumers and route platform-specific enforcement from the selected profile startup.

## 0.11.0

- Define one canonical Web development-tool route surface in the project structure standard: the exact `/debug` namespace, hub and read-only catalog dispatch, unknown-path fallback, ordinary-route isolation, and compile-time guarded production exclusion.
- Keep scenario query behavior and tool lifecycles with each debug tool while requiring viewers to consume canonical content and state projections and to mutate only through normal runtime commands; add the platform discovery trigger and verifier baseline for the contract.

## 0.10.2

- Convert the recommended governance checker from a Web-only `check-governance.mjs` to a platform-neutral `check_governance.py` under the common templates, so every consumer — not only Web ones — can scaffold it and it folds into the foundation's existing Python tooling.

## 0.10.1

- Ship consumer governance scaffolding as consumer-owned templates: a trigger-map `dev/README.md`, paired `AGENTS.md`/`CLAUDE.md` entry points naming one startup chain, and a generic `check-governance.mjs` on Web platforms. `consumer_manifest.json` gains a `recommended_rules` section that `scaffold_consumer.py` creates on request and `verify_consumer.py` soft-checks — absent is fine, but a present file must keep its declared pointers.
- Add a Machine-Checkable Rules section to the governance structure standard: assign a rule to its canonical owner first, machine-check only owned contracts with real silent-loss risk and low false positives, and keep the prose as the source of truth.

## 0.10.0

- Child closeout now keeps the shipped child's row in the parent overview and replaces only its Handoff link with plain text naming the spec, so the plan retains the delivered-scope record without a link that breaks when the spec is archived.
- Add a draft status to the implementation spec standard: specs for later children of an ordered plan may be batch-prepared as decision-complete drafts that are never an executable handoff, and promotion revalidates every coordinate against the live codebase before the `/implement` confirmation stops.
- Promote consumer-proven test economy into the Web testing standard: verification scoped to change risk, cheapest-observing-layer selection, browser tests reserved for browser-only subjects under a recurring cost budget, one extreme scenario per capability, fixture or interface setup instead of in-test simulation, and presentation-selection assertions owned by the unit layer.
- State the browser suite cadence in the Web testing standard: the full acceptance suite is a CI and closeout gate, per-commit verification uses a targeted selection, and a consumer may enforce the cadence mechanically.

## 0.9.3

- Drop the shipped `impl-preview` line from the forward queue; its scope landed inside the consolidated `/implement` command's mandatory confirmation stops.
- Queue the 0.10 convergence batch: test-economy and browser-cadence promotion into the Web testing standard, an implementation-spec draft status for batch-prepared plan children, and consumer governance scaffolding (trigger-map README, governance checker, and entry-point templates).

## 0.9.2

- Make `/implement` use a focused scratchboard discussion, mandatory pre-spec and pre-code model-handoff stops, one shared spec-and-preview modeling pass, and just-in-time implementation reads instead of silently spanning every phase with one model.

## 0.9.1

- Replace the separate spec discussion, spec build, and implementation preview commands with one `/implement` orchestration command that preserves distinct decision, English-spec, user-language preview, implementation, and verification gates.

## 0.9.0

- Forbid durable documents from referencing archived artifacts: closeout now finds a closing artifact's inbound references and lifts still-needed content into the referencing documents instead of leaving or repointing archive links.
- State the result-determination invariant in core: a verification layer's result is its command's exit status, output filters that replace it are forbidden, and suite counts are reconciled against declared totals before a pass claim.
- Promote golden-fixture discipline and the capability-not-variant browser-suite principle into the Web testing standard, and add a Web code style standard owning control-flow and logical-spacing conventions.
- Rename the Web platform skills to snake_case and exempt workflow command filenames from the snake_case rule because they double as invocable command names.

## 0.8.1

- Resolve the singular-root contradiction in the Web project structure standard: `assets/` is named as the one sanctioned plural root, kept for its universal ecosystem convention.

## 0.8.0

- Require kebab-case filenames for all Web TypeScript sources including `PascalCase`-exporting classes and components, and codify the shared dotted role suffixes (`.test`, `.spec`, `.scenario`, `.module.css`, `.addendum.md`).
- Require content and content-contract files to name a singular domain plus an explicit role suffix (`-definitions`, `-catalog`, `-schema`, `-validation`); bare domain-noun data files are retired.
- Add a core document file naming rule: governance and `dev/` documentation filenames use `snake_case` with dotted artifact-type suffixes, applied to new documents and deliberate rename sweeps.

## 0.7.1

- Fix canonical documents that referenced foundation-owned standards, skills, and workflows through consumer-local `dev/` paths, which resolved to nonexistent files inside consuming projects.
- State the path resolution rule in the foundation startup: `core/`, `platforms/`, and `profiles/` paths resolve from the foundation root, while bare `dev/` paths always name project-owned files.
- Extend the canonical verifier to reject consumer-path references that shadow canonical documents or name non-contract agent rules, and repoint the tscn triage skill at the consumer's `test_operations.md` for screenshots.

## 0.7.0

- Add a canonical Web project structure standard: singular root vocabulary, `dist/` as the only generated-output directory, `test/unit` plus `test/e2e` placement, the shared source layer set with earned `presentation/` and `shared/`, and machine-checked import boundaries paired with their prose.
- Add a Web command surface standard: required npm script names, the `npm run verify` aggregate gate with a canonical six-stage order, exit-status result determination, and one shared Prettier configuration.
- Add directory naming rules to the Web naming conventions: kebab-case directories, singular conceptual groupings, plural instance collections, and always-singular repository roots.
- Narrow the Web platform project boundary: repository layout and the verification command surface become platform-owned; framework mode, deployment target, and concrete tool selection remain project-owned.
- Record that a commit body ends at its final bullet and carries no authorship or attribution trailer.
- Make `lint_before_finish.md` reachable through a foundation startup trigger instead of directory browsing.

## 0.6.0

- Require every consumer to own `agent_startup.md`, `git_operations.md`, and one authoritative `test_operations.md` contract.
- Add common and platform-specific consumer templates plus a non-overwriting scaffold command for missing operation rules.
- Extend consumer verification to reject missing operation contracts, broken startup references, and legacy split Godot test owners.

## 0.5.0

- Remove `compatibility_pointers` from the consumer manifest and stop requiring duplicated discovery files under consumer `dev/` paths.
- Limit consumer verification to foundation configuration, selected layer startup documents, and platform/profile compatibility.
- Require v0.4.x consumers to delete legacy `# Shared Foundation Pointer`-only files during upgrade while preserving project-owned rules and addenda.

## 0.4.1

- Remove legacy Godot `core/` platform-pointer shims and require schema-2 `foundation.config.json` consumers to select their platform explicitly.
- Make Probe an optional lifecycle stage before an optional Plan, and move its artifact contract into `core/workflows/` alongside Plan, Sketch, and Implementation Spec.

## 0.4.0

- Establish an engine-neutral governance core with a canonical work lifecycle and governance-structure standard.
- Move irreducible Godot, GDScript, scene, autoload, and engine UI contracts into a dedicated Godot platform layer.
- Generalize shared research, specification, review, staged-review, and verification workflows so consuming projects own concrete tool commands.
- Add schema-2 consumer configuration with independent platform and profile selection.
- Add a minimal Web React platform for React lifecycle, DOM accessibility, browser persistence, IndexedDB, service workers, and PWA/browser capability contracts.
- Promote persistence ownership and state lifecycle rules into core; keep accessibility and testing in the Web React platform until another platform has a concrete shared contract.

## 0.3.0

- Move the simulation-management preset's game-specific runtime archetype tree from reusable infrastructure into a game-owned domain layer.
- Clarify that action-RPG components and entity bases belong in reusable infrastructure only when their contracts are independent of a concrete feature.
- Preserve each profile's runtime ownership model while making feature ownership, authored content, and cross-project reuse distinct placement concerns.

## 0.2.0

- Rebuild canonical governance from Tickstrike's pre-foundation rules while generalizing project-specific examples and paths.
- Restore mature lint, FSM, node-reference, planning, specification, research, review, and closeout contracts that v0.1.0 weakened.
- Keep Tickstrike's clocked grid-enemy FSM rules in a project-local addendum instead of leaking them into shared core or deleting them.
- Add a canonical contract verifier to prevent future shared-rule updates from silently dropping required behavior.

## 0.1.0

- Introduce the shared core/profile layout, compatibility pointers, consumer verifier, and pinned submodule workflow.
