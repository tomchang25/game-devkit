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

---

## Chore

One line, no rationale, no backing document.

---

## Bug

One line, no rationale, no backing document.

---

## Draft

Ideas that need explanation before they can become a one-line item. Use one `###` heading per idea.

### Converge Web Linting And Boundary Enforcement On ESLint

The two Web consumers currently disagree on lint tooling. One uses ESLint 9 with `no-restricted-imports` layer patterns, so its lint stage and its boundary stage are one command. The other uses oxlint for style plus dependency-cruiser for a separate boundary stage plus knip for unused-code reporting. The command surface standard names the `lint` and `check:boundaries` stages but leaves tool choice project-owned, so both are compliant today; the cost is that a boundary rule cannot be copied between projects and every reviewer must learn two setups.

The direction is to standardize the Web platform on ESLint as the canonical linter and boundary enforcer, narrowing the command surface standard so lint tooling moves from project-owned to platform-specified.

Promoting it requires deciding: whether boundary enforcement is expressed as ESLint `no-restricted-imports` layer patterns (folding `check:boundaries` back into the `lint` stage as the ESLint consumer already does) or kept as a separate stage on a shared config; whether a canonical ESLint flat-config baseline ships as a consumer template or stays project-authored against a shared rule list; what happens to the dependency-cruiser and knip capabilities the oxlint consumer relies on, including the deliberate unused-code report; and the migration path plus verifier changes for the oxlint consumer.
