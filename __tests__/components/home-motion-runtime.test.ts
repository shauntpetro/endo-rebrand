import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  contextRevert,
  gsapContext,
  gsapSet,
  gsapTimeline,
  timelines,
} = vi.hoisted(() => {
  type TimelineRecord = {
    options: {
      scrollTrigger?: {
        onToggle?: (trigger: { isActive: boolean }) => void;
      };
    };
    set: ReturnType<typeof vi.fn>;
    to: ReturnType<typeof vi.fn>;
  };

  const timelineRecords: TimelineRecord[] = [];
  const revert = vi.fn();
  const set = vi.fn();
  const timeline = vi.fn((options: TimelineRecord["options"]) => {
    const record = {} as TimelineRecord;
    record.options = options;
    record.to = vi.fn(() => record);
    record.set = vi.fn(() => record);
    timelineRecords.push(record);
    return record;
  });

  return {
    contextRevert: revert,
    gsapContext: vi.fn((callback: () => void) => {
      callback();
      return { revert };
    }),
    gsapSet: set,
    gsapTimeline: timeline,
    timelines: timelineRecords,
  };
});

vi.mock("gsap", () => ({
  default: {
    context: gsapContext,
    registerPlugin: vi.fn(),
    set: gsapSet,
    timeline: gsapTimeline,
    utils: {
      toArray: <ElementType extends Element>(
        selector: string,
        scope: ParentNode,
      ) => Array.from(scope.querySelectorAll<ElementType>(selector)),
    },
  },
}));

vi.mock("gsap/MotionPathPlugin", () => ({
  MotionPathPlugin: {},
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {},
}));

import { initHomeDesktopMotion } from "@/components/figures/HomeMotionRuntime";

function createMechanismRoot() {
  const root = document.createElement("div");
  root.innerHTML = `
    <section data-home-mechanism>
      <div data-mechanism-image></div>
      <p data-mechanism-label></p>
      <p data-mechanism-label></p>
    </section>
  `;
  return root;
}

describe("HomeMotionRuntime mechanism compositor lifecycle", () => {
  beforeEach(() => {
    contextRevert.mockClear();
    gsapContext.mockClear();
    gsapSet.mockClear();
    gsapTimeline.mockClear();
    timelines.length = 0;
  });

  it("promotes mechanism layers only while their trigger is active and clears them afterward", () => {
    const root = createMechanismRoot();
    const mechanismImage = root.querySelector<HTMLElement>(
      "[data-mechanism-image]",
    )!;
    const labels = Array.from(
      root.querySelectorAll<HTMLElement>("[data-mechanism-label]"),
    );

    const dispose = initHomeDesktopMotion(root);

    const initialImageState = gsapSet.mock.calls.find(
      ([target, properties]) =>
        target === mechanismImage && "autoAlpha" in properties,
    );
    const initialLabelState = gsapSet.mock.calls.find(
      ([target, properties]) =>
        Array.isArray(target) &&
        target.length === labels.length &&
        target.every((label, index) => label === labels[index]) &&
        "autoAlpha" in properties,
    );

    expect(initialImageState).toBeDefined();
    expect(initialLabelState).toBeDefined();
    expect(initialImageState?.[1]).not.toHaveProperty("willChange");
    expect(initialLabelState?.[1]).not.toHaveProperty("willChange");
    expect(timelines).toHaveLength(1);

    const onToggle = timelines[0].options.scrollTrigger?.onToggle;
    expect(onToggle).toBeTypeOf("function");

    onToggle?.({ isActive: true });

    expect(gsapSet).toHaveBeenCalledWith(mechanismImage, {
      willChange: "clip-path, transform",
    });
    expect(gsapSet).toHaveBeenCalledWith(labels, {
      willChange: "transform, opacity",
    });

    onToggle?.({ isActive: false });

    expect(gsapSet).toHaveBeenCalledWith([mechanismImage, ...labels], {
      clearProps: "willChange",
    });

    dispose();

    expect(gsapSet).toHaveBeenLastCalledWith([mechanismImage, ...labels], {
      clearProps: "willChange",
    });
    expect(contextRevert).toHaveBeenCalledTimes(1);
  });
});
