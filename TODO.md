# TODO

The single forward surface: open this file to see every open item and emerging idea. Each forward item lives in exactly one section here. There is deliberately no Done tier: remove shipped lines and record their outcome in `CHANGELOG.md`.

> The actionable tiers (`Plan`, `Chore`, and `Bug`) contain one line per item: no paragraphs, tables, or rationale. An item that needs explanation belongs in `## Draft` under one `###` heading. When a Draft item becomes actionable, promote it to `## Plan` as a single line.
>
> In Draft sections, use no `####` headings or bold-label patterns. Use plain text and lists for sub-structure.
>
> Scope tags in actionable lines use short, lowercase `snake_case` identifiers, such as `[core_discovery]` or `[consumer_verify]`.
>
> This repository holds shared governance only. A line here must describe a change to a rule, workflow, standard, skill, or tool — never game-specific paths, domain names, runtime content, or a consuming project's product plan.

Actionable line format: `[scope] one sentence`

`## Active` holds in-flight or implementation-ready work promoted from `## Plan`.

---

## Active

> Do not delete this reminder text.
> Work currently being implemented or ready to implement. Each entry is a one-line pointer in the same format as `## Plan`.
> Ship an item: remove its line and append the outcome to `CHANGELOG.md`.

Nothing currently in progress.

---

## Plan

Queued work with an agreed shape. Promote only the next eligible line to `## Active`.

- [web_testing] Promote consumer-proven test-economy rules into the Web testing standard: verification scoped to the risk of the change, unit-first layer selection (a browser test that only drives public APIs and asserts semantic state belongs in the unit layer), per-suite cost budgets, one extreme scenario per capability instead of assertion stuffing, and fixture or interface setup instead of driving the product loop to reach the target state (0.10)
- [web_testing] State the browser acceptance run cadence in the Web testing standard: the full suite is a CI and closeout gate, per-commit verification uses a targeted test selection, and a consumer may enforce the cadence mechanically (0.10)

---

## Chore

One line, no rationale, no backing document.

---

## Bug

One line, no rationale, no backing document.

---

## Draft

Ideas that need explanation before they can become a one-line item. Use one `###` heading per idea.

### Consumer Governance Scaffolding (0.10)

The two Web consumers diverge on governance enforcement. One ships a local governance checker (a required-file list where each file must exist and contain declared pointer strings back to its canonical owner), a trigger-map README (a two-column table routing each kind of work to its required reading), and a local enforcement standard defining what is machine-checked versus prose-reviewed plus the procedure for adding a machine-checkable rule. The other consumer has none of these, so its discovery rules live only in startup prose and nothing detects a broken pointer after a rename.

The direction is to promote the proven pieces into shared scaffolding: a trigger-map README template and a generic governance checker template under `tools/consumer_templates/`, entry-point templates keeping the agent entry files in step across agent tools, and the machine-checkable-rule policy folded into `core/standards/governance_structure_standard.md`.

Promoting it requires deciding: whether the checker ships as a copied template each consumer owns or as a shared tool driven by a consumer-owned manifest; how much of the pointer list `verify_consumer.py` should absorb instead; whether the trigger-map README becomes a required consumer contract or stays recommended; and what the entry-point template names as the single startup chain so multiple agent entry files cannot drift apart.

### Converge Web Linting And Boundary Enforcement On ESLint (0.10)

The two Web consumers currently disagree on lint tooling. One uses ESLint 9 with `no-restricted-imports` layer patterns, so its lint stage and its boundary stage are one command. The other uses oxlint for style plus dependency-cruiser for a separate boundary stage plus knip for unused-code reporting. The command surface standard names the `lint` and `check:boundaries` stages but leaves tool choice project-owned, so both are compliant today; the cost is that a boundary rule cannot be copied between projects and every reviewer must learn two setups.

The direction is to standardize the Web platform on ESLint as the canonical linter and boundary enforcer, narrowing the command surface standard so lint tooling moves from project-owned to platform-specified.

Promoting it requires deciding: whether boundary enforcement is expressed as ESLint `no-restricted-imports` layer patterns (folding `check:boundaries` back into the `lint` stage as the ESLint consumer already does) or kept as a separate stage on a shared config; whether a canonical ESLint flat-config baseline ships as a consumer template or stays project-authored against a shared rule list; what happens to the dependency-cruiser and knip capabilities the oxlint consumer relies on, including the deliberate unused-code report; and the migration path plus verifier changes for the oxlint consumer.
