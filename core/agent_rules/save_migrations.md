# Save Migrations

Save files live on player disks. Code that parses old save formats is not dead code, even when nothing in the current codebase writes that format anymore. That is exactly what a migration is.

## When To Create A Migration

Create a migration only when all of the following hold:

1. A shipped or explicitly supported version can have persisted data in the old shape.
2. The current change would otherwise make that data fail to load, change meaning, or lose information.
3. The project's active compatibility contract or explicit user direction requires that data to remain supported.

Do not create migrations, legacy reads, fallback branches, or version bumps for hypothetical data or schemas that have not shipped. For unshipped development data, update the current writer, reader, fixtures, and authored samples together and remove the obsolete shape.

When it is unclear whether persisted data is covered by an active compatibility contract, inspect the project's version and persistence owners. Ask only when preserving or breaking that compatibility is a user-authority decision.

## Never Delete Without Sign-Off

- Versioned migration blocks such as `if from_version < N:` are append-only. Old blocks stay in place so saves can migrate through every historical step.
- Legacy-key reads in `from_dict()` or migrations are intentional compatibility paths. The old keys no longer existing in authored data or current saves is not proof they are removable.
- Always-run idempotent migrations are compatibility code, not cleanup targets.
- Defensive `has()`, `get(..., default)`, and fallback reads in load paths usually exist for saves written before a field existed.

Deleting or simplifying any compatibility path requires explicit user sign-off and is normally only done at a declared save-compatibility break.

## Implementing A Required Migration

When the creation conditions above require a migration for a renamed, removed, restructured, or reinterpreted serialized field:

1. Bump the relevant store/provider version.
2. Append a new migration step that rewrites the old payload into the new shape. Migrate the data rather than branching normal runtime code around old formats.
3. Leave older migration steps untouched so saves can chain through `v1 -> v2 -> v3`.
4. Log or surface degraded/dropped data through the project's load context or warning mechanism. Dropping data must not be silent.
5. If a migration depends on a type or lookup being refactored away, stop and ask before removing it. Options include keeping a minimal legacy lookup, snapshotting required data into the migration, or accepting a declared data loss with sign-off.
6. Stamp the migrated payload with the current version after all migration steps so re-entering the load path does not re-apply earlier migrations.

Use the project's save architecture for the exact location: whole-file migrations belong in the save coordinator when it owns the whole payload view; per-section migrations belong in the provider/store that owns that section.
