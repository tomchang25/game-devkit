# Deterministic Rules Profile

Use this profile when a project structures state-changing decisions as resolvers that read narrow views and return typed effects, with executors applying those effects through named mutation owners.

Read `standards/rules_layer_ownership.md` before creating or restructuring a decision slice, mutation owner, effect contract, or ownership boundary.

For Web React consumers, apply `platforms/web-react/skills/rules_layer_day_zero.md` before the first profiled rules module. Other platforms provide equivalent import-boundary and raw-state-access enforcement through their selected tooling.

The project-local layer owns concrete state types, decision slices, owner stacks, effect vocabularies, boundary configuration, and access-census baselines.
