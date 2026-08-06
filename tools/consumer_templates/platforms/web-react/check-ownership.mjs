#!/usr/bin/env node
/**
 * Raw-state access census for a Web React consumer using the deterministic-rules profile.
 *
 * Copy this file to `dev/tools/` and configure the block below. The checker counts whole-state
 * bindings and direct state-rooted mutations per source module. An established baseline may only
 * shrink. Resolver trees also reject any occurrence of the configured state type outside their
 * declared executor exemptions.
 *
 * This is a token census rather than a parser-backed boundary. Import rules and contract types
 * remain the hard limits owned by
 * `dev/foundation/profiles/deterministic-rules/standards/rules_layer_ownership.md`.
 *
 * Usage:
 *   node dev/tools/check-ownership.mjs
 *   node dev/tools/check-ownership.mjs --record-baseline
 *   node dev/tools/check-ownership.mjs --update-baseline
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

// ---- Consumer configuration ---------------------------------------------------------------

const STATE_TYPE = "EDIT_ME_STATE_TYPE";
const STATE_PARAM = "EDIT_ME_STATE_PARAMETER";

const FENCED_TREES = [
  // {
  //   directory: "src/core/example-slice/decision",
  //   exempt: ["src/core/example-slice/decision/execute-example.ts"],
  // },
];

const SOURCE_DIR_NAME = "src";
const ALLOWLIST_RELATIVE = "dev/standards/raw_state_allowlist.json";

// ---- Configuration validation -------------------------------------------------------------

const IDENTIFIER = /^[A-Za-z_$][\w$]*$/;

function configurationErrors() {
  const errors = [];

  if (!IDENTIFIER.test(STATE_TYPE) || STATE_TYPE.startsWith("EDIT_ME")) {
    errors.push("set STATE_TYPE to the consumer's root session-state type name");
  }

  if (!IDENTIFIER.test(STATE_PARAM) || STATE_PARAM.startsWith("EDIT_ME")) {
    errors.push("set STATE_PARAM to the ordinary parameter name carrying that state");
  }

  if (FENCED_TREES.length === 0) {
    errors.push("declare at least one future resolver tree in FENCED_TREES");
  }

  for (const [index, tree] of FENCED_TREES.entries()) {
    if (typeof tree.directory !== "string" || tree.directory.length === 0) {
      errors.push(`FENCED_TREES[${index}] must declare a directory`);
    }
    if (!Array.isArray(tree.exempt) || !tree.exempt.every((entry) => typeof entry === "string")) {
      errors.push(`FENCED_TREES[${index}].exempt must be an array of paths`);
    }
  }

  return errors;
}

const configErrors = configurationErrors();

if (configErrors.length > 0) {
  for (const error of configErrors) {
    process.stderr.write(`ownership: configuration error: ${error}\n`);
  }
  process.exit(1);
}

// ---- Census -------------------------------------------------------------------------------

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const SOURCE_DIR = path.join(ROOT, SOURCE_DIR_NAME);
const ALLOWLIST = path.join(ROOT, ...ALLOWLIST_RELATIVE.split("/"));

const MUTATING_CALLS = ["push", "splice", "pop", "shift", "unshift", "sort", "reverse", "fill", "copyWithin", "set"];

function escapePattern(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const stateTypePattern = escapePattern(STATE_TYPE);
const stateParamPattern = escapePattern(STATE_PARAM);
const STATE_PATH = String.raw`\b${stateParamPattern}(?:\.[A-Za-z_$][\w$]*|\[[^\]\n]*\])+`;
const PARAMETER = new RegExp(String.raw`\b[A-Za-z_$][\w$]*\s*:\s*${stateTypePattern}\b`, "g");
const ASSIGNMENT = new RegExp(
  `${STATE_PATH}` + String.raw`\s*(?:\*\*=|<<=|>>>=|>>=|&&=|\|\|=|\?\?=|[+\-*/%&|^]=|=(?![=>]))`,
  "g",
);
const STEP = new RegExp(`(?:${STATE_PATH}\\s*(?:\\+\\+|--))|(?:(?:\\+\\+|--)\\s*${STATE_PATH})`, "g");
const MUTATING_CALL = new RegExp(
  String.raw`\b${stateParamPattern}(?:\.[A-Za-z_$][\w$]*|\[[^\]\n]*\])*\.(?:${MUTATING_CALLS.join("|")})\s*\(`,
  "g",
);

function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

function countOf(source, pattern) {
  return (source.match(pattern) ?? []).length;
}

function sourceFiles(directory) {
  const found = [];

  for (const entry of readdirSync(directory)) {
    const full = path.join(directory, entry);

    if (statSync(full).isDirectory()) {
      found.push(...sourceFiles(full));
      continue;
    }

    if (entry.endsWith(".ts") && !entry.endsWith(".d.ts")) {
      found.push(full);
    }
  }

  return found;
}

function relative(file) {
  return path.relative(ROOT, file).split(path.sep).join("/");
}

function measure() {
  if (!existsSync(SOURCE_DIR)) {
    return new Map();
  }

  const counts = new Map();

  for (const file of sourceFiles(SOURCE_DIR)) {
    const source = stripComments(readFileSync(file, "utf8"));
    const params = countOf(source, PARAMETER);
    const mutations = countOf(source, ASSIGNMENT) + countOf(source, STEP) + countOf(source, MUTATING_CALL);

    if (params > 0 || mutations > 0) {
      counts.set(relative(file), { params, mutations });
    }
  }

  return counts;
}

function fencedViolations() {
  const named = new RegExp(String.raw`\b${stateTypePattern}\b`);
  const violations = [];

  for (const tree of FENCED_TREES) {
    const directory = path.join(ROOT, tree.directory);

    if (!existsSync(directory)) {
      continue;
    }

    for (const file of sourceFiles(directory)) {
      const relativePath = relative(file);

      if (tree.exempt.includes(relativePath)) {
        continue;
      }

      if (named.test(stripComments(readFileSync(file, "utf8")))) {
        violations.push(relativePath);
      }
    }
  }

  return violations;
}

function readAllowlist() {
  return JSON.parse(readFileSync(ALLOWLIST, "utf8"));
}

function measuredObject(measured) {
  return Object.fromEntries([...measured].sort(([a], [b]) => a.localeCompare(b)));
}

function writeBaseline(measured) {
  mkdirSync(path.dirname(ALLOWLIST), { recursive: true });
  writeFileSync(ALLOWLIST, `${JSON.stringify(measuredObject(measured), null, 2)}\n`);
}

function compare(measured, allowed) {
  const errors = [];

  for (const [file, counts] of measured) {
    const limit = allowed[file];

    if (!limit) {
      errors.push(`${file}: not on the allowlist (${counts.params} parameters, ${counts.mutations} mutations)`);
      continue;
    }

    if (counts.params > limit.params) {
      errors.push(`${file}: ${counts.params} whole-state parameters, allowed ${limit.params}`);
    }

    if (counts.mutations > limit.mutations) {
      errors.push(`${file}: ${counts.mutations} direct mutations, allowed ${limit.mutations}`);
    }
  }

  for (const file of fencedViolations()) {
    errors.push(`${file}: names ${STATE_TYPE}, which a resolver may not`);
  }

  return errors;
}

function printErrors(errors) {
  for (const error of errors) {
    process.stderr.write(`ownership: ${error}\n`);
  }
  process.stderr.write(
    "\nThe baseline may only shrink. See dev/foundation/profiles/deterministic-rules/standards/rules_layer_ownership.md\n",
  );
}

const measured = measure();
const recordBaseline = process.argv.includes("--record-baseline");
const updateBaseline = process.argv.includes("--update-baseline");

if (recordBaseline && updateBaseline) {
  process.stderr.write("ownership: choose only one baseline operation\n");
  process.exit(1);
}

if (recordBaseline) {
  if (existsSync(ALLOWLIST)) {
    process.stderr.write(`ownership: baseline already exists at ${ALLOWLIST_RELATIVE}\n`);
    process.exit(1);
  }

  const violations = fencedViolations();
  if (violations.length > 0) {
    printErrors(violations.map((file) => `${file}: names ${STATE_TYPE}, which a resolver may not`));
    process.exit(1);
  }

  writeBaseline(measured);
  process.stdout.write(`ownership: recorded ${measured.size} modules to ${ALLOWLIST_RELATIVE}\n`);
  process.exit(0);
}

if (!existsSync(ALLOWLIST)) {
  process.stderr.write(
    `ownership: no baseline at ${ALLOWLIST_RELATIVE} — create it once with --record-baseline\n`,
  );
  process.exit(1);
}

const allowed = readAllowlist();
const errors = compare(measured, allowed);

if (errors.length > 0) {
  printErrors(errors);
  process.exit(1);
}

if (updateBaseline) {
  writeBaseline(measured);
  process.stdout.write(`ownership: tightened the baseline at ${ALLOWLIST_RELATIVE}\n`);
  process.exit(0);
}

const stale = Object.keys(allowed).filter((file) => !measured.has(file));
const params = [...measured.values()].reduce((total, entry) => total + entry.params, 0);
const mutations = [...measured.values()].reduce((total, entry) => total + entry.mutations, 0);
const staleNote = stale.length > 0 ? `, ${stale.length} baseline entries can be removed with --update-baseline` : "";

process.stdout.write(
  `ownership: OK (${measured.size} modules, ${params} parameters, ${mutations} mutations${staleNote})\n`,
);
