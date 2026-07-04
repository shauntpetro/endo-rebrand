/** The acts of the film, in order. `id` anchors each <Scene> for HUD navigation. */
export const SCENES = [
  { id: "cover", label: "Cover" },
  { id: "problem", label: "The Problem" },
  { id: "platform", label: "The Platform" },
  { id: "mechanism", label: "Mechanism" },
  { id: "pipeline-scene", label: "Pipeline" },
  { id: "proof", label: "Validation" },
  { id: "team-scene", label: "Team" },
  { id: "ask", label: "The Ask" },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];
