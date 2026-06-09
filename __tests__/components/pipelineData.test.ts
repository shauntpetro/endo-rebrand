import { describe, it, expect } from "vitest";
import { pipeline, PHASES, type PipelineItem } from "@/components/pipeline/pipelineData";

describe("pipelineData", () => {
  it("has exactly four candidates", () => {
    expect(pipeline).toHaveLength(4);
  });

  it("includes both disease areas with a therapeutic+diagnostic pair each", () => {
    const byArea = (area: PipelineItem["area"]) => pipeline.filter(p => p.area === area);
    for (const area of ["Endometriosis", "Oncology"] as const) {
      const items = byArea(area);
      expect(items).toHaveLength(2);
      expect(items.map(i => i.type).sort()).toEqual(["Diagnostic", "Therapeutic"]);
    }
  });

  it("keeps the authoritative ENDO-205 / FemLUNA / ENDO-995 / ENDO-311 identities", () => {
    expect(pipeline.map(p => p.id).sort()).toEqual(["ENDO-205", "ENDO-311", "ENDO-995", "FemLUNA"]);
    const e205 = pipeline.find(p => p.id === "ENDO-205")!;
    expect(e205.area).toBe("Endometriosis");
    expect(e205.type).toBe("Therapeutic");
    expect(PHASES[e205.phase]).toBe("Phase 1");
  });
});
