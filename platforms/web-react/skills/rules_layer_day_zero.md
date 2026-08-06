# Rules Layer Day Zero

Use this skill when the `deterministic-rules` profile is selected for a Web React consumer. Run it before the first profiled rules module; `profiles/deterministic-rules/standards/rules_layer_ownership.md` owns the architecture contract.

## Steps

1. **Configure the boundary tool.** Use the project's existing boundary checker when it can express per-slice import allowlists. When using the supplied dependency-cruiser starter, copy `tools/consumer_templates/platforms/web-react/dependency-cruiser.cjs` to `.dependency-cruiser.cjs`, configure every future decision fence and owner direction, install dependency-cruiser under the project's dependency policy, and set `check:boundaries` to `depcruise src dev/tools --config .dependency-cruiser.cjs`.
2. **Copy the census.** Copy `tools/consumer_templates/platforms/web-react/check-ownership.mjs` to `dev/tools/`, configure the state type, ordinary state parameter, and every future resolver tree, then run `node dev/tools/check-ownership.mjs --record-baseline`. The command creates `dev/standards/` when needed and refuses to overwrite an existing baseline.
3. **Wire the census into verification.** Add `"check:ownership": "node dev/tools/check-ownership.mjs"` and prepend it to `verify` as the consumer-verification stage allowed by `platforms/web-react/standards/command_surface_standard.md`. Keep `check:boundaries` in its required stage-four position.
4. **Land the first effectful slice as one contract–resolver–executor unit.** A pure calculation with no state-changing outcome remains a helper; do not add the profile's three-part shape where no effect boundary exists.
5. **Prove each gate once.** Temporarily add a whole-state parameter to a resolver and confirm `check:ownership` fails. Temporarily import a core path outside that resolver's allowlist and confirm `check:boundaries` fails. Revert both probes before continuing.

## Boundaries Of This Skill

The census script and boundary configuration become consumer-owned on copy. Later foundation releases do not update them in place. Tighten the census with `--update-baseline`; the command refuses new modules and count increases.
