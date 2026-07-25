import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import BoilerplateActions from "@/app/media/BoilerplateActions";

const originalExecCommand = document.execCommand;
const originalClipboardDescriptor = Object.getOwnPropertyDescriptor(
  navigator,
  "clipboard",
);

afterEach(() => {
  if (originalExecCommand) {
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: originalExecCommand,
    });
  } else {
    Reflect.deleteProperty(document, "execCommand");
  }
  if (originalClipboardDescriptor) {
    Object.defineProperty(
      navigator,
      "clipboard",
      originalClipboardDescriptor,
    );
  } else {
    Reflect.deleteProperty(navigator, "clipboard");
  }
  vi.restoreAllMocks();
});

describe("BoilerplateActions", () => {
  it("restores focus after using the selection-based clipboard fallback", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: vi.fn(() => true),
    });
    const user = userEvent.setup();
    const { container } = render(
      <BoilerplateActions text="Approved boilerplate" />,
    );
    const copyButton = screen.getByRole("button", {
      name: "Copy boilerplate",
    });
    const guidance = screen.getByText(
      "Copy or download the approved boilerplate without reformatting it.",
    );
    const liveStatus = container.querySelector('[aria-live="polite"]');

    expect(guidance).not.toHaveAttribute("aria-live");
    expect(liveStatus).toBeEmptyDOMElement();

    await user.click(copyButton);

    expect(await screen.findByText("Copied")).toBeInTheDocument();
    expect(liveStatus).toHaveTextContent(
      "Approved boilerplate copied to the clipboard.",
    );
    expect(copyButton).toHaveFocus();
  });
});
