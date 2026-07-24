# Web React Testing Standard

Platform: Web React.

## Layers

- **Domain tests** cover formulas, eligibility, progression, elapsed-time resolution, and pure payload migrations without React or browser APIs.
- **Application tests** cover commands, repository orchestration, save scheduling, hydration ordering, and recovery across domain and browser-adapter boundaries.
- **Component tests** cover visible information, disabled and error states, keyboard interaction, focus behavior, and state-to-view mapping through the DOM.
- **Build smoke** proves that the consumer's production bundle can be assembled and started under its deployment configuration.

## Rules

- Pass time, randomness, browser capabilities, and storage through explicit inputs or adapters.
- Assert observable behavior rather than component internals or hook implementation details.
- Each practical bug fix includes a regression test at the layer that owns the broken behavior.
- Snapshot tests do not replace assertions for important text, ARIA state, interaction, formulas, persistence, or migration outcomes.
- Tests that touch IndexedDB, browser globals, service workers, timers, or global listeners isolate and clean up their ownership.
- A production build does not replace focused component, application, or domain regression coverage.
- Browser acceptance suites verify system capabilities, not per-content variants; a new content entry that reuses a proven capability does not add a browser test.

## Test Economy

Scope verification to the risk of the change: a content entry reusing a proven capability needs a content or schema check, a new behavior needs a focused test plus one deterministic scenario, and only a new system-wide capability justifies a full vertical slice.

- **Cheapest observing layer first.** If an assertion reads semantic state — domain results, emitted events, snapshots, catalog content, replay equality — it belongs in the fastest layer that can observe it. A browser test that drives the product only through public interfaces and asserts only semantic state is a unit test wearing a browser costume; move it.
- **Browser only when the browser is the subject.** Reserve browser suites for behavior a headless layer cannot observe: real pointer, keyboard, or gesture input; storage and lifecycle across reload; animation and presentation timing; rendering geometry; boot, reset, and teardown behavior.
- **Cost budget.** Every browser test pays its full boot cost on every future CI run. Adding one is a recurring budget decision, not a default; a test that needs long simulated interaction to reach its target state is set up wrong.
- **One extreme scenario per capability.** A browser test verifies one capability at its most demanding representative case, which subsumes the easy cases. It does not restate mappings, catalog values, or schema facts that a cheaper layer already owns, and per-content variants never multiply browser tests.
- **Setup through interfaces, not simulation.** Reach the target state through an authored interface: a fixture that starts on the brink of the state under test, a debug hook, or recorded input. Never embed product logic in the test to play the system until the state emerges. If no interface reaches the state, author the missing fixture first; that investment is reusable and the in-test loop is not.
- **Selection is not a picture.** A browser assertion that the runtime selected a presentation — which asset, variant, pose, or animation — verifies a pure mapping the unit layer already owns, while proving nothing about how it renders. Visual correctness comes only from a screenshot or visual-regression tool or human review, never from an attribute string.

## Browser Suite Cadence

The full browser acceptance suite is a CI gate on every push and at most a once-per-scope closeout gate locally; it is never a per-commit or per-step local gate. Per-commit browser verification uses a targeted selection covering the changed behavior, kept to a handful of tests, and lets CI cover the full suite after push. When a plan or spec asks for the browser suite to stay green during implementation, satisfy it with the targeted selection.

A consumer may enforce this cadence mechanically — for example, a hook that rejects unfiltered full-suite invocations — and its test operations contract names the concrete commands, selection syntax, and any enforcement in place.

## Golden Fixtures

- A normal test run only asserts against committed golden fixtures and never rewrites them; a divergence stays failing until a human resolves it.
- Regenerate a golden only through the consumer's dedicated update command, and only when the change under review intentionally alters a rule, a value, or content. Review the regenerated fixture line by line and name the behavioral change in the change summary.
- Regenerating a golden to turn a failing test green without an intended behavior change defeats the gate: a determinism regression reaching a golden is a finding, not a formatting chore.

The consumer owns the concrete runner, React test libraries, browser environment, build command, and required CI gates.
