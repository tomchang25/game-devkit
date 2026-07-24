# implement — prepare, preview, and execute focused work

Take one focused target from its current lifecycle state through decision resolution, one implementation-modeling pass that produces both the spec and preview, user confirmation, implementation, and focused verification. This is the single user-facing command for preparing and carrying out implementation work; its internal phases preserve the lifecycle gates without repeating the same codebase exploration at each gate.

The command continues across conversation turns and has two mandatory user stops: target confirmation before any spec mutation, and implementation confirmation after the spec-backed preview. The user's reply resumes the same `/implement` flow without requiring another slash command.

## Input

The user may provide a plan child, sketch, actionable probe, existing implementation spec, narrow feature request, or another focused target:

```text
/implement <target or free-form brief>
```

Decisions explicitly confirmed earlier in the current conversation are part of the input. An existing implementation spec may skip document creation when it remains decision-complete and consistent with the live codebase, but it does not skip the Phase 1 scratchboard and target-confirmation stop. A spec carrying the draft status marker of `implementation_spec_standard.md` is planning input, never an executable handoff: Phase 2 promotes it by revalidating every coordinate against the live codebase before the implementation-confirmation stop.

## Required Reading

Before advancing the target, read:

1. `dev/agent_rules/agent_startup.md` and every trigger it fires for the target's domain.
2. `core/workflows/work_lifecycle.md` and `core/workflows/implementation_spec_standard.md` in full.
3. `dev/docs/README.md`, the named source document, its parent plan when one exists, and the source artifact's workflow when it is a plan, sketch, or probe.
4. Every request-relevant rule, standard, system document, or skill discovered from the target.
5. `core/agent_rules/lint_before_finish.md` and the consuming project's test-operation contract before running any verification.

## Language And Audience Lanes

- Conversation, decision requests, previews, section headings, confirmation prompts, model-handoff notes, and completion reports use the active conversation's user language. Infer it from the user's messages, never from an English source artifact, codebase, or command contract. Keep output plain enough for the user to judge observable behavior, scope, risk, and the intended result.
- The durable `.implementation_spec.md` is written entirely in English and remains the technical execution contract. Do not paste its full English body into a non-English preview unless the user asks to inspect it.
- Code identifiers, file paths, commands, schema keys, and other exact repository coordinates retain their original spelling in every language.
- Keep each response in one user-facing phase. A decision response discusses decisions only. Successful preview modeling may write the spec and then present only the user-language preview rather than interleaving a separate English spec report with it. A completion response reports the implemented outcome and evidence only.
- Decision discussion stays at the product boundary: requirements, player- or user-observable behavior, scope, compatibility, and numerical meaning. The implementation spec owns file placement, API shape, ownership wiring, migration mechanics, test placement, and other technical architecture.
- The preview faithfully renders the spec's Goal and Summary in the user's language, then explains the concrete landing plan and risks without becoming a second technical spec.

## Model Handoffs

- Phase 1 is the product-reasoning surface and should use the strongest reasoning model available when model choice matters. Its mandatory target-confirmation stop is the first safe point for the user to switch to a balanced implementation-planning model.
- Phase 2 creates the durable English spec and user-language implementation preview. Its mandatory implementation-confirmation stop is the second safe point for the user to switch to a balanced or smaller implementation model.
- The command cannot switch models itself. It must expose both stops clearly, preserve the phase state in conversation and the durable spec, and wait. Never continue across a mandatory stop in the same assistant turn merely because no open decision was found.
- After a model switch, the next model resumes from the confirmed conversation state and current spec. It follows the focused verification rules below rather than restarting broad discovery.

## Mutation Boundaries

| Phase | Allowed mutation |
| --- | --- |
| Focused decision scan | None; inspect and discuss only |
| Preview modeling and spec build | Planning documentation and lifecycle tracking only |
| Confirmation | None; confirm the current spec and executor plan |
| Implementation | Source, tests, assets, configuration, and required documentation inside the confirmed scope |
| Verification | Only mutations explicitly required by the consuming project's verification contract |

Invoking `/implement` does not by itself authorize planning-document or implementation changes. Planning-document mutation begins only after explicit target confirmation; implementation mutation begins only after explicit preview confirmation.

## Phase 1: Focused Decision Scan

1. Restate the focused work boundary in one compact sentence and classify it as a plan child or standalone work.
2. Extract requirements, non-goals, acceptance criteria, and decisions already locked by source documents and the current conversation. Parent-owned requirements remain in the parent.
3. Gather the minimum sufficient codebase evidence needed to identify user-authority decisions: inspect the current owner of the behavior, its direct caller or consumer, and the nearest relevant tests. Follow another relationship only when the direct evidence shows that it can change observable behavior, scope, compatibility, or numerical meaning.
4. Expand beyond those direct relationships only when evidence exposes cross-system state ownership, persistence or migration, a public compatibility or schema contract, semantic events, asynchronous lifecycle or cleanup, generated assets or human approval, or another unresolved behavior boundary. Do not perform an open-ended blast-radius survey merely because implementation will eventually touch details in those areas.
5. Separate user-authority decisions from spec-author decisions. Ask the user only about unresolved choices that change a requirement, observable behavior, product scope, compatibility promise, or numerical meaning.
6. Present a scratchboard-style introduction in the user's language whether or not an unresolved decision remains. Summarize the intended result, behavior already locked by source authority, direct codebase evidence, likely boundaries, and any recommendation or uncertainty the user may want to change. Keep it provisional and conceptual; do not turn it into a technical spec or file inventory.
7. Present all known user decisions in one batch with codebase evidence, viable behavioral options, and one recommended default. Omit decision options when none exist, but never omit target confirmation.
8. If the focused evidence contradicts a previously locked decision, explain the concrete conflict and stop rather than silently changing approved behavior.
9. Always stop and ask the user to confirm or adjust the target and locked behavior before writing a spec or changing lifecycle tracking. The absence of open questions, an apparently complete parent plan, or the original `/implement` invocation does not count as this confirmation.

The Phase 1 response uses the user's language and only the needed sections from `Target`, `Locked Behavior`, `Codebase Fit`, `Scratchboard`, and `Decisions to Confirm`, followed by mandatory `Target Confirmation` and `Model Handoff` sections. Do not ask the user to choose technical implementation details. Do not continue to Phase 2 in the same assistant turn.

## Phase 2: Preview Modeling And Spec Build

This phase begins only after the user explicitly confirms Phase 1. It owns one implementation-facing exploration pass. Use that same verified model to write or update the implementation spec and to produce the user-language preview; do not complete a spec exploration and then start an independent preview exploration over the same code.

1. Determine the implementation-spec destination required by `core/workflows/implementation_spec_standard.md`, or identify the existing spec that remains the handoff.
2. Start from the current behavior owner, the direct integration path the change uses, and the nearest tests. Trace only the load-bearing relationships that constrain approved behavior, ownership or call direction, lifecycle cleanup, compatibility or migration, landing order, or verification validity. Expand when direct evidence triggers the risk conditions from Phase 1, not to collect every locally discoverable implementation detail.
3. For an existing spec, verify its load-bearing coordinates in this same pass. A different author, interrupted session, or older spec requires checking current status and the named owners and integration paths; it does not by itself require a fresh full-blast-radius survey. Expand only when drift or contradiction is found.
4. Build the concrete executor plan from that model: intended result, systems or files that own the change, integration and landing order, wrong shapes to avoid, meaningful edge cases, and the smallest verification that proves the behavior. Leave local helper behavior, obvious syntax, and other details that cannot change the approved or load-bearing shape for just-in-time reading during implementation.
5. If deeper modeling reveals an unresolved user-authority decision or contradicts locked behavior, return to Phase 1 before writing or updating the spec.
6. Write or update the implementation spec entirely in English using the standard's exact structure. The Summary condenses the body, and Relational Context records every load-bearing relationship in the expected change surface without transcribing all relationships visible in those files.
7. Apply the lifecycle update when creating or replacing a spec:
   - For a plan child, point the parent plan's child overview entry to the new `.implementation_spec.md`, preserve parent-owned requirements, remove the replaced child sketch from active `dev/docs/plans/`, and do not add a `TODO.md` entry.
   - For a standalone spec, keep or create exactly one one-line pointer in `TODO.md`: preserve `## Active` when the source was already active, otherwise use `## Plan`. Remove the replaced Draft section or stale pointer instead of duplicating it.
   - When an actionable probe or standalone sketch is converted, remove it from active `dev/docs/plans/` after the spec and pointers are complete. Archive it only when its historical discussion remains useful; otherwise delete it.
   - When building directly from a feature request with no source file, create only the required spec and lifecycle pointer.
8. Search the updated parent, `TODO.md`, and active plan tree for stale references to the replaced source filename or document form. Fix only references owned by this lifecycle transition.
9. Run the consuming project's documentation verification contract against every changed governance, tracking, and planning file, then correct all reported violations.
10. Build the preview directly from the same implementation model. For visual, motion, layout, VFX, or other eye-judged work, include the intended appearance, reference, observable parameters and timings, human approval boundaries, and targeted visual evidence because those details affect confirmation.
11. Present the preview in the user's language using only the needed sections from `Target`, `Intended Result`, `Codebase Fit`, `Implementation Plan`, and `Risks and Conflicts`, followed by mandatory `Implementation Confirmation` and `Model Handoff` sections.
12. Ask the user to confirm or adjust both the faithfully rendered Goal/Summary and the concrete executor plan. Do not begin implementation until the user explicitly confirms.

Do not place unresolved questions in the spec. The preview should be concrete enough to judge but should not dump type signatures or reproduce the spec's technical inventory. Always stop after presenting it, even when the user invoked `/implement` with an apparently final target. Do not implement source code, run implementation validation, or use a mutating formatter during this phase.

## Phase 3: Confirmation

Treat an explicit confirmation given after the Phase 2 preview as approval of the implementation spec's Goal and Summary plus the presented executor plan. If the user requests changes instead, classify them and return to the Focused Decision Scan or Preview Modeling phase as appropriate. A reply that only asks a question, the original command invocation, or the earlier target confirmation is not implementation confirmation.

## Phase 4: Implementation And Verification

1. Implement the confirmed scope in the specified landing order. Before editing each area, read the exact current symbols and nearby tests needed for that edit; discover local helpers and mechanics just in time instead of reopening the full implementation model.
2. Reuse verified context from the same session while the relevant worktree is unchanged. Do not repeat an exploration pass merely to recreate context already established by Preview Modeling.
3. Adapt locally discoverable technical details without changing approved behavior or load-bearing relationships. If discovery changes a documented ownership boundary, integration contract, cleanup rule, landing sequence, verification claim, or the user-visible result, update the spec and preview and obtain confirmation again. Purely local implementation details do not require a spec rewrite.
4. Add or update the focused tests and evidence named by the spec. Follow `core/agent_rules/lint_before_finish.md` and the consuming project's operation contracts for every validation command.
5. Fix failures attributable to the implementation and rerun every affected check. Stop and report any environmental or approval boundary the agent cannot satisfy.
6. Report the durable outcome in the user's language, followed by verification results and any remaining manual or human-approval boundary. Do not auto-close the plan or spec; closeout remains its own lifecycle operation.

## Guardrails

- One command does not mean one undifferentiated step. Preserve the Decision, Preview Modeling and Spec, Confirmation, Implementation, and Verification gates.
- Always stop for target confirmation before spec mutation and implementation confirmation before source mutation. These stops are mandatory model-handoff boundaries, not conditional question prompts.
- Use minimum sufficient evidence during the Focused Decision Scan and evidence-driven expansion during Preview Modeling. Do not front-load locally discoverable implementation detail.
- Build the spec and preview from one implementation model. Do not repeat broad codebase searches between those outputs or before each edit.
- Do not change implementation files before explicit preview confirmation.
- Do not turn technical implementation choices into user questions.
- Do not reopen decisions already locked by source authority or the current conversation unless live code exposes a direct conflict.
- Do not create a second active source of truth for the same work.
- Do not mix future scope, incidental cleanup, speculative compatibility, assets, VFX, audio, tests, or migrations into the spec or implementation unless the approved behavior and evidence-triggered change surface require them.
- Do not run the full browser or platform suite when focused verification proves the changed capability and the consuming project's rules reserve broad suites for closeout or CI.
- Keep unrelated user changes untouched.

$ARGUMENTS
