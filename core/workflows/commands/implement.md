# implement — prepare, preview, and execute focused work

Take one focused target from its current lifecycle state through decision resolution, implementation-spec creation, a user-confirmed implementation preview, implementation, and focused verification. This is the single user-facing command for preparing and carrying out implementation work; its internal phases preserve the lifecycle gates rather than collapsing their responsibilities.

The command continues across conversation turns. When it stops for a user decision or final confirmation, the user's reply resumes the same `/implement` flow without requiring another slash command.

## Input

The user may provide a plan child, sketch, actionable probe, existing implementation spec, narrow feature request, or another focused target:

```text
/implement <target or free-form brief>
```

Decisions explicitly confirmed earlier in the current conversation are part of the input. An existing implementation spec skips decision and spec work only when it remains decision-complete and consistent with the live codebase.

## Required Reading

Before advancing the target, read:

1. `dev/agent_rules/agent_startup.md` and every trigger it fires for the target's domain.
2. `core/workflows/work_lifecycle.md` and `core/workflows/implementation_spec_standard.md` in full.
3. `dev/docs/README.md`, the named source document, its parent plan when one exists, and the source artifact's workflow when it is a plan, sketch, or probe.
4. Every request-relevant rule, standard, system document, or skill discovered from the target.
5. `core/agent_rules/lint_before_finish.md` and the consuming project's test-operation contract before running any verification.

## Language And Audience Lanes

- Conversation, decision requests, previews, and completion reports use the user's language. Keep them plain enough for the user to judge observable behavior, scope, risk, and the intended result.
- The durable `.implementation_spec.md` is written entirely in English and remains the technical execution contract. Do not paste its full English body into a non-English preview unless the user asks to inspect it.
- Code identifiers, file paths, commands, schema keys, and other exact repository coordinates retain their original spelling in every language.
- Keep each response in one user-facing phase. A decision response discusses decisions only. A successful spec build may continue directly to the preview, but the response presents the preview rather than interleaving a separate English spec report with it. A completion response reports the implemented outcome and evidence only.
- Decision discussion stays at the product boundary: requirements, player- or user-observable behavior, scope, compatibility, and numerical meaning. The implementation spec owns file placement, API shape, ownership wiring, migration mechanics, test placement, and other technical architecture.
- The preview faithfully renders the spec's Goal and Summary in the user's language, then explains the concrete landing plan and risks without becoming a second technical spec.

## Mutation Boundaries

| Phase | Allowed mutation |
| --- | --- |
| Decision | None; inspect and discuss only |
| Spec | Planning documentation and lifecycle tracking only |
| Preview | None; confirm the current spec and executor plan |
| Implementation | Source, tests, assets, configuration, and required documentation inside the confirmed scope |
| Verification | Only mutations explicitly required by the consuming project's verification contract |

Invoking `/implement` authorizes planning-document changes after the Decision Gate passes. It never authorizes implementation changes before the user explicitly confirms the preview.

## Phase 1: Decision Gate

1. Restate the focused work boundary in one compact sentence and classify it as a plan child or standalone work.
2. Extract requirements, non-goals, acceptance criteria, and decisions already locked by source documents and the current conversation. Parent-owned requirements remain in the parent.
3. Inspect the relevant live code independently of earlier research. Trace current ownership, call direction, data flow, lifecycle behavior, presentation hooks, cleanup paths, tests, and the surface the work replaces across the full blast radius.
4. Separate user-authority decisions from spec-author decisions. Ask the user only about unresolved choices that change a requirement, observable behavior, product scope, compatibility promise, or numerical meaning.
5. Present all known user decisions in one batch with codebase evidence, viable behavioral options, and one recommended default. Stop read-only and wait for the user's answer.
6. If live code contradicts a previously locked decision, explain the concrete conflict and stop rather than silently changing approved behavior.
7. When no user-authority decision remains, proceed to the Spec phase without asking the user to invoke another command.

When a decision response is required, use only the needed sections from `Target`, `Codebase Fit`, `Decisions to Confirm`, and `Locked Decisions`. Do not ask the user to choose technical implementation details.

## Phase 2: Spec

Skip document creation only when the target is an existing implementation spec that satisfies `core/workflows/implementation_spec_standard.md`, remains decision-complete, and matches the verified live-code relationships.

Otherwise:

1. Determine the implementation-spec destination required by `core/workflows/implementation_spec_standard.md`.
2. Build the verified implementation model: every touched system relationship, changed integration contract, ownership rule, wrong shape to avoid, file responsibility, safe landing order, implementation hazard, meaningful edge case, and observable acceptance outcome.
3. Write the implementation spec entirely in English using the standard's exact structure. The Summary condenses the body, and Relational Context covers every relationship inside the Files to Change blast radius.
4. Apply the lifecycle update:
   - For a plan child, point the parent plan's child overview entry to the new `.implementation_spec.md`, preserve parent-owned requirements, remove the replaced child sketch from active `dev/docs/plans/`, and do not add a `TODO.md` entry.
   - For a standalone spec, keep or create exactly one one-line pointer in `TODO.md`: preserve `## Active` when the source was already active, otherwise use `## Plan`. Remove the replaced Draft section or stale pointer instead of duplicating it.
   - When an actionable probe or standalone sketch is converted, remove it from active `dev/docs/plans/` after the spec and pointers are complete. Archive it only when its historical discussion remains useful; otherwise delete it.
   - When building directly from a feature request with no source file, create only the required spec and lifecycle pointer.
5. Search the updated parent, `TODO.md`, and active plan tree for stale references to the replaced source filename or document form. Fix only references owned by this lifecycle transition.
6. Run the consuming project's documentation verification contract against every changed governance, tracking, and planning file, then correct all reported violations.
7. Inspect the planning diff. If it faithfully records the locked behavior, continue directly to the Preview phase and present only that phase's user-facing report.

Do not place unresolved questions in the spec. Do not implement source code, run implementation validation, or use a mutating formatter during this phase.

## Phase 3: Preview

1. Reconcile the implementation spec with the current live code before asking for confirmation. When another agent authored the spec, the target was already a spec at invocation, relevant code changed, or the session was interrupted, perform a fresh full-blast-radius read. In one uninterrupted session where this agent just built the spec and the relevant worktree is unchanged, re-check current status and every load-bearing coordinate without repeating purposeless reads.
2. Verify current ownership, call direction, data flow, lifecycle and presentation hooks, cleanup paths, tests, and every surface the implementation will change. Treat coordinates in the spec as provisional until verified.
3. Build the concrete executor plan: intended result, system relationships, files or surfaces that change and why, integration and landing order, wrong shapes to avoid, and the smallest verification that proves the behavior under the consuming project's verification rules.
4. For visual, motion, layout, VFX, or other eye-judged work, state the intended appearance, reference, concrete parameters and timings, required human approval boundaries, and targeted visual evidence.
5. If the live code contradicts the spec or the spec underspecifies observable behavior, present the conflict and return to the appropriate earlier phase. Never ask for confirmation on a plan that silently deviates from its spec.
6. Present the preview in the user's language using only the needed sections from `Target`, `Intended Result`, `Codebase Fit`, `Implementation Plan`, `Risks and Conflicts`, and `Confirmation`.
7. Ask the user to confirm or adjust both the faithfully rendered Goal/Summary and the concrete executor plan. Do not begin implementation until the user explicitly confirms.

The preview should be concrete enough to judge but should not dump type signatures or reproduce the spec's file-by-file technical inventory. Exact identifiers and paths remain appropriate where they identify an integration boundary or risk.

## Phase 4: Implementation And Verification

1. Treat an explicit confirmation of the preview as approval of the implementation spec's Goal and Summary plus the presented executor plan. If the user requests changes instead, classify them and return to the Decision, Spec, or Preview phase as appropriate.
2. Implement the confirmed scope in the specified landing order. Preserve ownership and call-direction constraints; keep unrelated user changes untouched.
3. Adapt local technical details when live code differs without changing approved behavior. A difference that changes requirements, scope, compatibility, or numerical meaning returns to the Decision Gate.
4. Add or update the focused tests and evidence named by the spec. Follow `core/agent_rules/lint_before_finish.md` and the consuming project's operation contracts for every validation command.
5. Fix failures attributable to the implementation and rerun every affected check. Stop and report any environmental or approval boundary the agent cannot satisfy.
6. Report the durable outcome in the user's language, followed by verification results and any remaining manual or human-approval boundary. Do not auto-close the plan or spec; closeout remains its own lifecycle operation.

## Guardrails

- One command does not mean one undifferentiated step. Preserve every Decision, Spec, Preview, Implementation, and Verification gate.
- Do not change implementation files before explicit preview confirmation.
- Do not turn technical implementation choices into user questions.
- Do not reopen decisions already locked by source authority or the current conversation unless live code exposes a direct conflict.
- Do not create a second active source of truth for the same work.
- Do not mix future scope, incidental cleanup, speculative compatibility, assets, VFX, audio, tests, or migrations into the spec or implementation unless the approved behavior and verified blast radius require them.
- Do not run the full browser or platform suite when focused verification proves the changed capability and the consuming project's rules reserve broad suites for closeout or CI.
- Keep unrelated user changes untouched.

$ARGUMENTS
