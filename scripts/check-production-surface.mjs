import {
  existsSync,
  readFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const generatedRouteFiles = [
  path.join("app", "concepts", "layout.tsx"),
  path.join("app", "concepts", "page.tsx"),
  path.join("app", "concepts", "[concept]", "page.tsx"),
];

function isConceptRoute(value) {
  return (
    typeof value === "string" &&
    /^\/concepts(?:\/|$)/.test(value)
  );
}

function readJson(relativePath) {
  const absolutePath = path.join(projectRoot, relativePath);
  if (!existsSync(absolutePath)) {
    throw new Error(`Expected build manifest is missing: ${relativePath}`);
  }

  return JSON.parse(readFileSync(absolutePath, "utf8"));
}

function assertNoGeneratedRoutes() {
  const offenders = generatedRouteFiles.filter((relativePath) =>
    existsSync(path.join(projectRoot, relativePath)),
  );

  if (offenders.length > 0) {
    throw new Error(
      [
        "Local concept routes are materialized under app/.",
        "Stop npm run dev:concepts before building.",
        ...offenders.map((file) => `- ${file}`),
      ].join("\n"),
    );
  }
}

function runPrebuildCheck() {
  assertNoGeneratedRoutes();
  console.log("[production-surface] Prebuild route check passed.");
}

function runPostbuildCheck() {
  assertNoGeneratedRoutes();

  const appPaths = readJson(".next/server/app-paths-manifest.json");
  const routes = readJson(".next/routes-manifest.json");
  const appPathRoutesPath = ".next/app-path-routes-manifest.json";
  const appPathRoutes = existsSync(path.join(projectRoot, appPathRoutesPath))
    ? readJson(appPathRoutesPath)
    : {};

  const offenders = [
    ...Object.entries(appPaths)
      .filter(([route, output]) =>
        isConceptRoute(route) || isConceptRoute(output),
      )
      .map(([route]) => `app-paths-manifest: ${route}`),
    ...Object.entries(appPathRoutes)
      .filter(([route, pathname]) =>
        isConceptRoute(route) || isConceptRoute(pathname),
      )
      .map(([route]) => `app-path-routes-manifest: ${route}`),
    ...[
      ...(routes.staticRoutes ?? []),
      ...(routes.dynamicRoutes ?? []),
      ...(routes.dataRoutes ?? []),
    ]
      .filter((route) => isConceptRoute(route.page))
      .map((route) => `routes-manifest: ${route.page}`),
  ];

  const serverConceptsPath = path.join(
    projectRoot,
    ".next",
    "server",
    "app",
    "concepts",
  );
  if (existsSync(serverConceptsPath)) {
    offenders.push("server output: .next/server/app/concepts");
  }

  if (offenders.length > 0) {
    throw new Error(
      [
        "The production build contains concept-lab routes.",
        ...offenders.map((entry) => `- ${entry}`),
      ].join("\n"),
    );
  }

  console.log("[production-surface] Postbuild manifest check passed.");
}

const phase = process.argv[2];

try {
  if (phase === "prebuild") {
    runPrebuildCheck();
  } else if (phase === "postbuild") {
    runPostbuildCheck();
  } else {
    throw new Error(
      "Expected one phase argument: prebuild or postbuild.",
    );
  }
} catch (error) {
  console.error(
    `[production-surface] ${
      error instanceof Error ? error.message : String(error)
    }`,
  );
  process.exitCode = 1;
}
