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

- `[web_code_style]` require a branch chain over a closed enumeration to end in a compiler-proved exception branch rather than an unguarded fallthrough

---

## Chore

One line, no rationale, no backing document.

---

## Bug

One line, no rationale, no backing document.

---

## Draft

Ideas that need explanation before they can become a one-line item. Use one `###` heading per idea.

### Trial Direct-Change And Implementation Principles

A candidate core agent rule should make direct change the default: strengthen or generalize the current owner around demonstrated cases when its contract is too narrow, otherwise update the existing API and every consumer together, then remove the obsolete path. It should reject speculative wrappers, redirects, aliases, duplicate APIs, extension points, configuration and migrations, while keeping each landing as the smallest complete end-to-end layer on a durable ownership seam.

The rule should also qualify modularity and dependency guidance so they do not recreate the same indirection: separate modules only when responsibility, state ownership, lifecycle or dependency direction differs; inspect existing dependency documentation and types before adding code or packages; adopt a maintained library only when it lowers total complexity. Focused research into established product and technical patterns belongs before a consequential user-facing workflow, interaction or architecture decision with mature precedent, not before mechanical changes or decisions already made.

Compatibility needs an explicit boundary with `core/agent_rules/save_migrations.md`. New save migrations should exist only when a change demonstrably invalidates persisted user data and the user explicitly requires compatibility, while already-shipped historical migrations and legacy reads remain protected until explicit sign-off. Promotion requires evaluating the consumer trial, reconciling that creation rule with the current default migration contract, and choosing one canonical core owner without duplicating the guidance across agent rules and the implementation workflow.

### Converge Web Linting And Boundary Enforcement On ESLint

The two Web consumers currently disagree on lint tooling. One uses ESLint 9 with `no-restricted-imports` layer patterns, so its lint stage and its boundary stage are one command. The other uses oxlint for style plus dependency-cruiser for a separate boundary stage plus knip for unused-code reporting. The command surface standard names the `lint` and `check:boundaries` stages but leaves tool choice project-owned, so both are compliant today; the cost is that a boundary rule cannot be copied between projects and every reviewer must learn two setups.

The direction is to standardize the Web platform on ESLint as the canonical linter and boundary enforcer, narrowing the command surface standard so lint tooling moves from project-owned to platform-specified.

Promoting it requires deciding: whether boundary enforcement is expressed as ESLint `no-restricted-imports` layer patterns (folding `check:boundaries` back into the `lint` stage as the ESLint consumer already does) or kept as a separate stage on a shared config; whether a canonical ESLint flat-config baseline ships as a consumer template or stays project-authored against a shared rule list; what happens to the dependency-cruiser and knip capabilities the oxlint consumer relies on, including the deliberate unused-code report; and the migration path plus verifier changes for the oxlint consumer.
