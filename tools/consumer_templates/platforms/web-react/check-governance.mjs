#!/usr/bin/env node
// Local governance checker for {{PROJECT_NAME}}.
//
// Foundation shape (layer selection, required operation contracts) is verified by
// dev/foundation/tools/verify_consumer.py. This checker protects THIS project's own
// discovery wiring: each listed file must exist and contain its declared pointer
// strings, so a rename that breaks a pointer fails loudly instead of rotting silently.
//
// The CONTRACTS map below is a starter covering the universal startup chain. Extend it
// with this project's addenda, skill cards, and any local contract that has a real
// silent-loss risk; keep the human-readable rule in its canonical document and treat
// this list as protection, not the source of truth.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const errors = [];

// relativePath -> load-bearing pointer strings the file must contain.
const CONTRACTS = {
  "AGENTS.md": ["foundation_startup.md", "platform_startup.md", "dev/agent_rules/agent_startup.md"],
  "CLAUDE.md": ["foundation_startup.md", "platform_startup.md", "dev/agent_rules/agent_startup.md"],
  "dev/README.md": ["foundation_startup.md", "work_lifecycle.md", "dev/agent_rules/git_operations.md"],
  "dev/agent_rules/agent_startup.md": ["git_operations.md", "test_operations.md"],
  "dev/agent_rules/git_operations.md": ["dev/foundation/core/agent_rules/git_operations.md"],
  "dev/agent_rules/test_operations.md": ["# Test Operations"],
};

function read(relativePath) {
  const target = path.join(ROOT, relativePath);
  if (!fs.existsSync(target)) {
    errors.push(`missing required governance file: ${relativePath}`);
    return null;
  }
  return fs.readFileSync(target, "utf8");
}

for (const [relativePath, fragments] of Object.entries(CONTRACTS)) {
  const contents = read(relativePath);
  if (contents === null) {
    continue;
  }
  for (const fragment of fragments) {
    if (!contents.includes(fragment)) {
      errors.push(`${relativePath}: missing load-bearing pointer ${JSON.stringify(fragment)}`);
    }
  }
}

if (!fs.existsSync(path.join(ROOT, "dev/foundation/consumer_manifest.json"))) {
  errors.push("dev/foundation is missing or uninitialized; run git submodule update --init --recursive");
}

try {
  const config = JSON.parse(fs.readFileSync(path.join(ROOT, "dev/foundation.config.json"), "utf8"));
  if (config.schema_version !== 2) {
    errors.push("dev/foundation.config.json: schema_version must be 2");
  }
  if (config.platform !== "{{PLATFORM}}") {
    errors.push("dev/foundation.config.json: platform must be {{PLATFORM}}");
  }
} catch (error) {
  errors.push(`dev/foundation.config.json: invalid JSON (${error.message})`);
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`governance: ERROR: ${error}`);
  }
  process.exit(1);
}

console.log("governance: OK ({{PROJECT_NAME}} local contracts)");
