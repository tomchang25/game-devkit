# Rules Layer Ownership

This profile applies when a project chooses resolver/effect decision slices with named mutation owners. `core/standards/runtime_ownership.md` continues to own application-wide state classification; this standard owns the roles, direction, and enforcement inside the selected deterministic rules architecture.

## Roles

Every module governed by this profile plays one role that is decidable from its path.

| Role | Reads | Writes | Reaches |
| --- | --- | --- | --- |
| **Resolver** | Its snapshot and view types | Nothing; returns typed effects | Its contract, permitted query helpers, and vocabularies |
| **Executor** | Raw session state | Through mutation owners | Owners, resolvers, and contracts |
| **Mutation owner** | Raw session state | Its own domain as the single writer | Owners below it, leaf sinks, and state |

Resolver purity and owner direction are machine-checked. Executor writes through owners are a reviewed convention backed by the access census.

## Single Writer

- Every mutable state domain has one writing module. All lifecycle routes that change that domain use the same owner.
- A deliberate exceptional route calls the owner and receives an explicit outcome instead of writing owned fields directly.
- Owners declare an acyclic dependency order. A bottom owner or sink is a leaf and declares the narrow structural state slice it writes.
- State whose lifetime exceeds the current session lives in a separate owner whose contract states that lifetime.

## Decision Fences

- A resolver cannot name the root session-state type, including through a type-only import or signature.
- It receives read-only views containing the narrowest information that answers the decision.
- It returns ordered typed effects for every state-changing outcome.
- Each resolver fence declares an import allowlist for its own folder, contract, vocabularies, and permitted query or geometry helpers. Blocking only known owners is not a fence.
- Query helpers admitted through a fence contain no mutation owners.

## Effects

- Effects are outcome-independent within one resolution pass. A decision that needs the outcome of its own effect needs another input fact or belongs in the mutation owner.
- Order-sensitive state changes are represented in effect order. Independent local state changes may remain direct when the owning contract permits them.
- Effects are plain returned values applied synchronously through one exhaustive executor dispatch. This profile does not introduce an event bus, subscriber graph, or deferred effect queue.

## Mechanical Assembly

A snapshot assembler may select coarse candidates and resolve authored values into plain inputs. Priority, capacity, arcs, and other tunable decisions remain in the resolver so the reviewed decision module owns the rule.

## Access Census

- A consumer-owned checker records, per module, whole-state bindings and direct state-rooted mutations against an allowlist that may only shrink.
- The census is a ratchet rather than a parser-backed boundary. Import fences and contract types remain the hard limits.
- If a module widens access without changing the count, replace the census with a deep-read-only state type, mutation ports, or a syntax-tree checker before accepting the wider blind spot.

## Gates Before Corpus

The resolver fences and access census exist before the first profiled rules module. Each configured gate is deliberately triggered once before it is trusted.

## Reading Contract

A resolver change is reviewable from its slice folder and imported contract types. If review must leave that boundary, move the misplaced decision or narrow its contract instead of widening the fence by default.

## Enforcement

The selected platform and consumer own concrete tools, commands, configured paths, and baselines. Web React consumers start with `platforms/web-react/skills/rules_layer_day_zero.md`.
