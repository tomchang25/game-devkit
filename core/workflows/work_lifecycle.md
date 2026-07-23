# Work Lifecycle

This document is the single lifecycle owner for forward work as it moves from an idea into implementation, verification, and closeout. Workflow artifact documents define what a probe, plan, sketch, implementation spec, review, and closeout must contain. Consumer-local documentation rules define where active and archived artifacts live. Other documents may point to this lifecycle, but they must not recreate or silently override the full state machine.

## Canonical Flow

The canonical route is:

```text
Draft
-> (Probe)
-> (Main Plan)
-> (Child Sketch)
-> Implementation Spec
-> Implementation
-> Verify
-> Child Closeout
-> next child or Main Plan Closeout
```

Parenthesized stages are optional. A probe preserves an unresolved problem before work is designed. A main plan is needed for medium or large work that requires durable design, decomposition, or sequencing, but a chore, narrow refactor, or one-feature fix may proceed without one. A sketch is only for a non-trivial child of a plan; it is never required for a standalone spec.

When a main plan is skipped, use this route:

```text
Draft, actionable probe, feature request, or tracked item
-> Standalone Implementation Spec
-> Implementation
-> Verify
-> Standalone Closeout
```

Trivial fixes, copy changes, configuration edits, and other tightly bounded work may proceed with a compact implementation note. Skipping a durable artifact never removes applicable review, verification, or closeout obligations.

## Transition Gates

### Draft to Probe

Create a probe using `probe_standard.md` when the problem, design tension, or ownership question needs a durable discussion artifact before a direction is chosen. A probe does not authorize implementation and may graduate to a plan, a standalone implementation spec, evergreen documentation, a decision note, or deletion.

### Draft or Probe to Main Plan

Promote a draft or resolved probe when it needs stable requirements, substructure, explicit ordering, multiple reviewable slices, or a durable link:

1. Create a main plan using `plan_standard.md`.
2. Move the draft's durable intent into the plan instead of retaining two requirement owners.
3. Replace the draft with the consumer's single forward-work pointer.

Before the plan becomes queued or active, its Goal, Requirements, Non-Goals, Acceptance Criteria, and necessary child overview must be complete. Decisions that would materially change product scope or observable behavior must be resolved in conversation rather than parked in the plan.

### Draft or Probe to Standalone Implementation Spec

Skip the main plan only when the work is a chore, narrow refactor, one-feature fix, or another tightly bounded change whose behavior, scope, ownership seam, and compatibility consequences are already clear. `/implement` still presents its focused scratchboard and stops for explicit target confirmation before creating the standalone implementation spec using `implementation_spec_standard.md`; that spec remains the required executable handoff before implementation.

### Main Plan to Child Sketch

Create a child sketch when the durable behavior is settled but the likely implementation shape, ownership seam, migration boundary, or landing sequence still needs exploration:

1. Create a sibling sketch using `sketch_standard.md`.
2. Point to it from the parent plan's child overview only; do not create an independent forward-work entry.
3. Treat codebase coordinates in the sketch as provisional context rather than implementation authority.

Skip this transition when the child boundary is already narrow and clear enough for direct spec-time verification.

### Main Plan or Sketch to Implementation Spec

Convert the next actionable child into an implementation spec only after product behavior, compatibility promises, scope, and numerical meaning are locked and the user has explicitly confirmed the focused scratchboard target. A plan child may skip the sketch when its boundary is already clear. Even when no open decision remains, `/implement` stops for this confirmation before spec mutation:

1. Inspect the current behavior owner, direct integration path, nearest relevant tests, and evidence-triggered load-bearing relationships to create the implementation model using `implementation_spec_standard.md`.
2. Use the sketch as context only. Verify or replace every file, symbol, relationship, and sequencing claim.
3. Update the parent child overview so exactly one artifact is the executable handoff.

An implementation spec never carries unresolved questions. If the live codebase exposes a conflict that would change approved behavior, stop and return to the decision gate instead of silently rewriting the plan.

### Implementation Spec to Implementation

Implementation begins only when all of the following are true:

- The Goal and Summary provide a reviewable approval surface.
- Relational Context covers every load-bearing relationship that constrains the expected change surfaces.
- Scope, compatibility, migration, recovery behavior, meaningful edge cases, and verification have no unresolved decisions.
- The parent plan or forward-work tracker points to exactly one executable handoff.
- The user has explicitly confirmed the canonical `/implement` preview, including its faithful user-language rendering of the Goal and Summary and the executor's concrete landing plan.

Implementation may adapt local technical details when the live code differs from the spec without changing approved behavior. A difference that changes requirements, scope, or compatibility returns to the decision gate.

### Implementation to Verify

Implementation is not complete until the consumer's verification contract has been satisfied:

1. Run the focused checks named by the implementation spec or required by the changed behavior.
2. Follow `core/agent_rules/lint_before_finish.md` and any triggered platform or project-local validation rules.
3. Return to implementation after a failure and rerun every affected check after the fix.
4. Proceed only when acceptance criteria and required checks pass, or when the user explicitly accepts a documented verification gap.

Core workflows define the obligation to verify. Platforms and consuming projects own the concrete commands because runtimes, package managers, linters, and test harnesses differ.

### Verify to Child Closeout

Use the closeout standard and command contract to:

- Record the durable shipped outcome in the consumer's history owner when the change warrants one.
- Remove the shipped child from the parent overview.
- Archive the implementation spec and archive or remove any superseded sketch.
- Return to the next child while the main plan still has unshipped scope.

### Child Closeout to Main Plan Closeout

Close the main plan after no unshipped children remain and shipped behavior satisfies every acceptance criterion:

1. Update evergreen documentation with any current contract that must remain discoverable.
2. Archive the main plan.
3. Remove its active or queued pointer from the forward-work tracker.
4. Keep completed history only in the consumer's designated history owner; do not retain a competing Done list.

## Review Position

Review is a quality activity that may apply to a plan, sketch, spec, staged snapshot, branch, or implementation. It is not a mandatory tracking state. A review is read-only unless the user also authorizes fixes, and any requested fix returns to the appropriate artifact or implementation stage.

## Operational Commands

Artifact standards define what a correct artifact looks like. Command contracts define how an operation is performed safely.

| Operation | Core command contract | Mutation boundary |
| --- | --- | --- |
| Retrieve focused repository context | `commands/research-context.md` | Read-only |
| Prepare, preview, implement, and verify focused work | `commands/implement.md` | Staged: read-only decisions, planning documentation, read-only preview, then confirmed implementation |
| Review a staged snapshot | `commands/stage-review.md` | Read-only |
| Close completed work | `commands/closeout.md` | Documentation and tracking only |
| Suggest a staged commit message | `commands/commit-msg.md` | Read-only |
| Review a branch and draft pull-request text | `commands/pr-review.md` | Read-only |

`/implement` is one user-facing orchestration command, not a collapsed lifecycle stage. It preserves the Focused Decision Scan, combined Preview Modeling and Spec Build, Confirmation, Implementation, and Verification gates, resumes across conversation turns without another slash command, and has two mandatory user stops: target confirmation before spec mutation and implementation confirmation before source mutation. These stops allow the user to switch models while the confirmed conversation state and durable spec carry the handoff. The spec and preview share one implementation model; local code details are read just in time during implementation rather than through repeated blast-radius surveys.

Platform-only commands, such as a dedicated engine test procedure, may live below `platforms/<platform>/workflows/commands/`. They extend the available operations but never fork this lifecycle or duplicate a core command.

## Tracking States

Consumers may choose different filenames, but each tracked item has one active home and one owner for each direction of time:

- Draft: discussion has substance but no durable plan yet.
- Probe: optional exploratory artifact with an unresolved or newly resolved problem.
- Queued plan: a main plan exists but is not the current execution flow.
- Active: a handoff, implementation, or verification step is in progress or ready to execute.
- Compact item: a small chore or bug does not require a main plan.
- Shipped history: the single durable record of completed outcomes.
- Archive: historical plans and specs that are no longer active authority.

Consumer-local documentation rules define the concrete paths and pointer syntax. They may refine names, but they must preserve single ownership and the transition gates in this lifecycle.
