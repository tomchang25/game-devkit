# implement — resolve, specify, and execute focused work

Take one focused target from its current lifecycle state through decision resolution, an executable handoff, implementation, and focused verification. `/implement` authorizes this sequence for the named target.

## Input And Authorization

The user may provide a plan child, sketch, actionable probe, existing implementation spec, narrow feature request, or another focused target:

```text
/implement <target or free-form brief>
```

An equivalent explicit request to implement a named target follows the same contract when the current interface does not expose slash commands.

Invoking `/implement` authorizes the non-destructive repository mutations required to complete the named target. This includes the target's planning document and lifecycle tracking, source, focused tests, assets, configuration, and required documentation. The authorization does not include unrelated cleanup, a broader product scope, destructive actions, Git mutations, publishing, deployment, external-system writes, or decisions reserved for human judgment. Project-local Git, test, environment, and delivery contracts continue to govern those operations.

Decisions already established by the source artifact or current conversation are part of the input and are not reopened without contradictory evidence. An existing decision-complete implementation spec is revalidated and executed directly when its load-bearing coordinates still match the live codebase. A draft implementation spec is planning input until its coordinates are revalidated and its draft marker is removed.

## Required Reading

Before advancing the target, read:

1. `dev/agent_rules/agent_startup.md` and every trigger it fires for the target's domain.
2. `core/agent_rules/change_design.md`, `core/workflows/work_lifecycle.md`, and `core/workflows/implementation_spec_standard.md` in full.
3. `dev/docs/README.md`, the named source document, its parent plan when one exists, and the source artifact's workflow when it is a plan, sketch, or probe.
4. Every request-relevant rule, standard, system document, or skill discovered from the target.
5. `core/agent_rules/lint_before_finish.md` and the consuming project's test-operation contract before running any verification.

## Language And Artifact Lanes

- Conversation, decision requests, progress updates, and completion reports use the active conversation's user language. Infer it from the user's messages, never from an English source artifact or codebase.
- The durable `.implementation_spec.md` is written entirely in English and remains the technical execution contract.
- Code identifiers, file paths, commands, schema keys, and other exact repository coordinates retain their original spelling in every language.
- Decision discussion stays at the product boundary: requirements, player- or user-observable behavior, scope, compatibility, and numerical meaning. The implementation spec owns file placement, API shape, ownership wiring, migration mechanics, test placement, and other technical architecture.
- A progress preview is optional. Use one when visual, motion, layout, asset, migration, or cross-system work benefits from a compact explanation of the intended result or risk. It reports the current model; it is not a scheduled confirmation gate.

## Conditional Stop Conditions

Stops are conditional, not scheduled. Continue through specification and implementation in the same turn when none applies. Stop and ask one focused question when progress requires:

- A user-authority decision that changes a requirement, observable behavior, product scope, compatibility promise, or numerical meaning.
- Resolution of a conflict between the requested or documented behavior and the live codebase.
- Scope beyond the named target or a change to an authoritative parent requirement.
- A destructive action, Git mutation, external authorization, external-system write, publish or deploy operation, or human judgment on an asset or experience.
- Acceptance of a verification gap, environmental failure, or failure not attributable to the implementation.

Do not convert locally discoverable technical choices into user questions. If a stop fires after planning documents have changed, preserve the valid work, state the conflict and remaining boundary, and wait without beginning the blocked mutation.

## Stage 1: Resolve The Target

1. Classify the target as a plan child, standalone work, or a compact change under `core/workflows/work_lifecycle.md`.
2. Extract requirements, non-goals, acceptance criteria, and locked decisions from the target and current conversation. Parent-owned requirements remain in the parent.
3. Inspect the current behavior owner, its direct integration path, and the nearest relevant tests. Expand only when direct evidence exposes cross-system state ownership, persistence, compatibility, semantic events, asynchronous cleanup, generated assets, human approval, or another load-bearing boundary.
4. Separate user-authority decisions from implementation decisions. If a conditional stop applies, explain the evidence and ask before mutation that depends on the answer.
5. Otherwise continue immediately to the executable handoff. Do not produce a scratchboard or ask for target confirmation merely to restate a decision-complete request.

For an existing implementation spec, use this stage to verify that its Goal and Summary still describe the requested result and that no live-code contradiction changes its scope or behavior. Do not repeat an exploration pass merely because another agent authored the spec or the conversation resumed.

## Stage 2: Build Or Revalidate The Handoff

1. Determine the implementation-spec destination required by `core/workflows/implementation_spec_standard.md`, identify the existing spec, or use the lifecycle's compact implementation note for qualifying trivial work.
2. Build one implementation model from the current behavior owner, direct integration path, nearest tests, and every load-bearing relationship that constrains ownership, call direction, cleanup, compatibility, landing order, or verification validity.
3. Write, update, or promote the implementation spec from that model. Do not copy coordinates from a plan or sketch without verification, and do not inventory locally discoverable detail that cannot change the approved or load-bearing shape.
4. Apply the lifecycle transition:
   - For a plan child, point the parent overview entry to the executable spec, preserve parent-owned requirements, remove the replaced active sketch, and add no independent tracker entry.
   - For a standalone spec, keep or create exactly one forward-work pointer and remove any replaced draft or stale pointer.
   - When converting an actionable probe or standalone sketch, remove it from the active plan tree after its durable content and tracking have moved.
5. Search the parent, forward-work tracker, and active plan tree for stale references created by this transition.
6. Run the consuming project's documentation verification contract against the changed governance, tracking, and planning files.
7. If the implementation model triggers a conditional stop, update only claims that remain valid and ask before proceeding. Otherwise continue directly into implementation without requesting confirmation.

The spec and any progress preview use the same implementation model. If the user explicitly requests a model handoff, finish the current durable artifact when safe, report the exact lifecycle state, and stop at that requested boundary; model switching is not otherwise a reason to interrupt the command.

## Stage 3: Implement And Verify

1. Implement the handoff in its specified landing order. Before editing each area, read the exact current symbols and nearby tests needed for that edit; discover local mechanics just in time instead of reopening the full implementation model.
2. Follow `core/agent_rules/change_design.md`: change the current owner directly, update all affected consumers together, and remove obsolete paths unless a demonstrated compatibility contract requires them.
3. Reuse verified context while the relevant worktree is unchanged. Adapt local technical details without changing requirements, observable behavior, ownership direction, compatibility, or the load-bearing landing shape.
4. If discovery materially changes the handoff, update the spec. Continue when the difference remains an implementation detail; trigger the relevant conditional stop when it changes a user-authority boundary.
5. Add or update the focused tests and evidence named by the handoff. Follow `core/agent_rules/lint_before_finish.md` and the consuming project's operation contracts for every validation command.
6. Fix failures attributable to the implementation and rerun every affected check. Report an environmental, authorization, or accepted-risk boundary instead of claiming completion through it.
7. Report the durable outcome, verification results, and any remaining manual boundary in the user's language. Do not auto-close the plan or spec; closeout remains its own lifecycle operation.

## Guardrails

- Keep one active source of truth for the target.
- Use minimum sufficient evidence and evidence-driven expansion. Do not front-load locally discoverable implementation detail.
- Do not repeat broad codebase searches between the handoff, an optional preview, and implementation.
- Do not reopen decisions already locked by source authority or the current conversation unless live code exposes a direct conflict.
- Do not add speculative compatibility, migrations, abstractions, tests, assets, audio, or future scope.
- Do not run a broad browser or platform suite when focused verification proves the changed capability and the consuming project's rules reserve broad suites for closeout or CI.
- Keep unrelated user changes untouched.

$ARGUMENTS
