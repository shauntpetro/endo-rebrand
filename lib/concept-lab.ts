/**
 * The concept laboratory is a local design-review surface, not a public route.
 * Keep the environment check centralized so its layout, index, and dynamic
 * routes all fail closed in production.
 */
export function isConceptLabAvailable(
  nodeEnv = process.env.NODE_ENV,
): boolean {
  return nodeEnv !== "production";
}
