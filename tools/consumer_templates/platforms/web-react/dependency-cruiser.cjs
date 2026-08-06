/**
 * Machine-enforced layering for a Web React consumer using the deterministic-rules profile.
 *
 * Copy this file to the repository root as `.dependency-cruiser.cjs`. The base layer rules enforce
 * `dev/foundation/platforms/web-react/standards/project_structure_standard.md`. The generated
 * profile rules enforce
 * `dev/foundation/profiles/deterministic-rules/standards/rules_layer_ownership.md`.
 *
 * Configure every future decision slice before its directory is created. Regexes are explicit
 * consumer-owned paths; this starter contains no game-domain defaults.
 */

const DECISION_FENCES = [
  // {
  //   name: "example-decision",
  //   from: "^src/core/example-slice/decision/",
  //   executors: "^src/core/example-slice/decision/execute-example\\.ts$",
  //   allowed: "^src/core/(example-slice|query|geometry)/",
  // },
];

const OWNER_BOUNDARIES = [
  // {
  //   name: "lower-owner-does-not-import-upper-owner",
  //   from: "^src/core/owner/lower-owner\\.ts$",
  //   forbidden: "^src/core/owner/upper-owner\\.ts$",
  // },
];

const STATE_FACADES = [
  // "^src/core/model/index\\.ts$",
];

const configurationErrors = [];

if (DECISION_FENCES.length === 0) {
  configurationErrors.push("configure at least one deterministic-rules decision fence");
}

for (const [index, fence] of DECISION_FENCES.entries()) {
  for (const field of ["name", "from", "allowed"]) {
    if (typeof fence[field] !== "string" || fence[field].length === 0) {
      configurationErrors.push(`DECISION_FENCES[${index}].${field} must be a non-empty string`);
    }
  }
  if (fence.executors !== undefined && typeof fence.executors !== "string") {
    configurationErrors.push(`DECISION_FENCES[${index}].executors must be a regex string when present`);
  }
}

for (const [index, boundary] of OWNER_BOUNDARIES.entries()) {
  for (const field of ["name", "from", "forbidden"]) {
    if (typeof boundary[field] !== "string" || boundary[field].length === 0) {
      configurationErrors.push(`OWNER_BOUNDARIES[${index}].${field} must be a non-empty string`);
    }
  }
}

if (!STATE_FACADES.every((entry) => typeof entry === "string" && entry.length > 0)) {
  configurationErrors.push("STATE_FACADES entries must be non-empty regex strings");
}

if (configurationErrors.length > 0) {
  throw new Error(`Configure the deterministic-rules starter:\n- ${configurationErrors.join("\n- ")}`);
}

const decisionFenceRules = DECISION_FENCES.map((fence) => ({
  name: `${fence.name}-imports-only-its-declared-surface`,
  severity: "error",
  comment:
    "A resolver imports only its slice, contract, vocabularies, and permitted query helpers. Blocking known owners alone is not a decision fence.",
  from: {
    path: fence.from,
    ...(fence.executors ? { pathNot: fence.executors } : {}),
  },
  to: {
    path: "^src/core/",
    pathNot: fence.allowed,
  },
}));

const ownerBoundaryRules = OWNER_BOUNDARIES.map((boundary) => ({
  name: boundary.name,
  severity: "error",
  comment: "Mutation owners follow the consumer-declared acyclic owner order.",
  from: { path: boundary.from },
  to: { path: boundary.forbidden },
}));

const stateFacadeRules =
  STATE_FACADES.length === 0
    ? []
    : [
        {
          name: "state-facades-are-for-outside-the-rules-layer",
          severity: "error",
          comment: "A rules module cannot bypass decision fences through a whole-state re-export.",
          from: { path: "^src/core/" },
          to: { path: STATE_FACADES.join("|") },
        },
      ];

module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      comment: "A runtime cycle makes module initialization order load-bearing.",
      from: {},
      to: { circular: true, dependencyTypesNot: ["type-only"] },
    },
    {
      name: "no-orphan-modules",
      severity: "warn",
      comment:
        "A module nothing imports is either dead or missing registration. Declaration files, the HTML-referenced bootstrap, and directly invoked tooling entrypoints are exempt.",
      from: {
        orphan: true,
        pathNot: "\\.d\\.ts$|(^|/)vite-env\\.d\\.ts$|^src/app/main\\.ts$|^dev/tools/[^/]+\\.ts$",
      },
      to: {},
    },
    {
      name: "core-imports-only-core",
      severity: "error",
      comment:
        "The deterministic rules layer imports no UI, renderer, DOM global, platform adapter, authored asset, or asset URL.",
      from: { path: "^src/core/" },
      to: { path: "^src/", pathNot: "^src/core/" },
    },
    {
      name: "content-imports-only-content-and-core",
      severity: "error",
      comment: "Authored data types itself through core contracts only.",
      from: { path: "^src/content/" },
      to: { path: "^src/", pathNot: "^src/(content|core)/" },
    },
    {
      name: "runtime-and-platform-never-import-ui-shared-app",
      severity: "error",
      comment: "Orchestration and adapters sit below the interface and application shell.",
      from: { path: "^src/(runtime|platform)/" },
      to: { path: "^src/(ui|shared|app)/" },
    },
    {
      name: "ui-reaches-platform-through-runtime",
      severity: "error",
      comment: "The interface reaches platform capabilities through runtime ports.",
      from: { path: "^src/ui/" },
      to: { path: "^src/(platform|app)/" },
    },
    {
      name: "only-the-app-imports-harness",
      severity: "error",
      comment: "The application shell is the only harness wiring point.",
      from: { path: "^src/", pathNot: "^src/(harness|app)/" },
      to: { path: "^src/harness/" },
    },
    {
      name: "platform-and-shared-are-leaves",
      severity: "error",
      comment: "Support layers do not depend on the layers that consume them.",
      from: { path: "^src/(platform|shared)/" },
      to: { path: "^src/", pathNot: "^src/(platform|shared)/" },
    },
    ...decisionFenceRules,
    ...ownerBoundaryRules,
    ...stateFacadeRules,
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    exclude: { path: "\\.test\\.ts$" },
    tsConfig: { fileName: "tsconfig.json" },
    tsPreCompilationDeps: true,
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default"],
    },
    reporterOptions: { text: { highlightFocused: true } },
  },
};
