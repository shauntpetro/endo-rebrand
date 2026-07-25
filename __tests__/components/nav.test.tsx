import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Nav from "@/components/site/Nav";
import { NAV_LINKS } from "@/lib/site";

const route = vi.hoisted(() => ({ pathname: "/innovation" }));
const prefetchRoute = vi.hoisted(() => vi.fn());
const originalMatchMedia = window.matchMedia;
const originalResizeObserver = globalThis.ResizeObserver;

type MediaListener = (event: MediaQueryListEvent) => void;

function installMediaQueries(initial: Record<string, boolean> = {}) {
  const matches = new Map(Object.entries(initial));
  const listeners = new Map<string, Set<MediaListener>>();

  window.matchMedia = vi.fn((query: string) => {
    const queryListeners = listeners.get(query) ?? new Set<MediaListener>();
    listeners.set(query, queryListeners);

    return {
      get matches() {
        return matches.get(query) ?? false;
      },
      media: query,
      onchange: null,
      addEventListener: (_type: string, listener: EventListenerOrEventListenerObject) => {
        queryListeners.add(listener as MediaListener);
      },
      removeEventListener: (_type: string, listener: EventListenerOrEventListenerObject) => {
        queryListeners.delete(listener as MediaListener);
      },
      addListener: (listener: MediaListener) => queryListeners.add(listener),
      removeListener: (listener: MediaListener) => queryListeners.delete(listener),
      dispatchEvent: () => true,
    } as MediaQueryList;
  });

  return {
    set(query: string, nextMatches: boolean) {
      matches.set(query, nextMatches);
      const event = { matches: nextMatches, media: query } as MediaQueryListEvent;
      listeners.get(query)?.forEach((listener) => listener(event));
    },
  };
}

function installResizeObserver() {
  const observers = new Set<{
    callback: ResizeObserverCallback;
    observer: ResizeObserver;
  }>();

  class ResizeObserverMock implements ResizeObserver {
    constructor(callback: ResizeObserverCallback) {
      observers.add({
        callback,
        observer: this,
      });
    }

    observe() {}
    unobserve() {}
    disconnect() {
      for (const entry of observers) {
        if (entry.observer === this) observers.delete(entry);
      }
    }
  }

  globalThis.ResizeObserver = ResizeObserverMock;

  return {
    notify() {
      for (const { callback, observer } of observers) {
        callback([], observer);
      }
    },
  };
}

vi.mock("next/navigation", () => ({
  usePathname: () => route.pathname,
  useRouter: () => ({ prefetch: prefetchRoute }),
}));

function renderNav() {
  render(
    <>
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <Nav />
      <main id="main-content" />
      <footer />
    </>,
  );

  return screen.getByRole("button", { name: "Open menu" });
}

function setNavMeasurements(desktopNavWidth: number) {
  const nav = document.querySelector<HTMLElement>("[data-enhanced-site-nav]");
  const desktopNav = document.querySelector<HTMLElement>("[data-desktop-nav]");
  const brand = nav?.querySelector<HTMLAnchorElement>(
    'a[aria-label="EndoCyclic Therapeutics — home"]',
  );

  if (!nav || !desktopNav || !brand) {
    throw new Error("Expected the enhanced navigation measurement targets");
  }

  let measuredDesktopNavWidth = desktopNavWidth;

  nav.style.paddingLeft = "20px";
  nav.style.paddingRight = "20px";
  nav.style.columnGap = "20px";
  Object.defineProperty(nav, "clientWidth", {
    configurable: true,
    get: () => 1000,
  });
  Object.defineProperty(brand, "offsetWidth", {
    configurable: true,
    get: () => 160,
  });
  Object.defineProperty(desktopNav, "scrollWidth", {
    configurable: true,
    get: () => measuredDesktopNavWidth,
  });

  return {
    brand,
    desktopNav,
    nav,
    setDesktopNavWidth(width: number) {
      measuredDesktopNavWidth = width;
    },
  };
}

function preventDocumentNavigation(event: MouseEvent) {
  if (event.target instanceof Element && event.target.closest("a")) {
    event.preventDefault();
  }
}

beforeEach(() => {
  installMediaQueries();
  prefetchRoute.mockReset();
  document.addEventListener("click", preventDocumentNavigation, true);
});

afterEach(() => {
  document.removeEventListener("click", preventDocumentNavigation, true);
  cleanup();
  window.matchMedia = originalMatchMedia;
  globalThis.ResizeObserver = originalResizeObserver;
  document.body.style.overflow = "";
  route.pathname = "/innovation";
});

function finishMenuExit(dialog: HTMLElement) {
  fireEvent.animationEnd(dialog);
}

describe("Nav mobile-menu focus management", () => {
  it("server-renders a functional mobile navigation fallback without JavaScript", () => {
    const html = renderToStaticMarkup(<Nav />);
    const staticFallback = html.match(/<noscript>([\s\S]*?)<\/noscript>/)?.[1];

    expect(staticFallback).toBeDefined();
    expect(staticFallback).toContain("data-nojs-mobile-nav");
    expect(staticFallback).toContain("<details");
    expect(staticFallback).toContain("Main menu");
    expect(staticFallback).toContain(
      "[data-enhanced-site-nav] { display: none !important; }",
    );
    expect(html).toContain("data-enhanced-site-nav");
    expect(html).toContain('data-nav-mode="full"');
    expect(html).not.toContain('data-nav-mode="compact"');

    for (const link of NAV_LINKS) {
      expect(staticFallback).toContain(`href="${link.href}"`);
      expect(staticFallback).toContain(link.name);
    }

    expect(staticFallback).toContain('href="/investors"');
    expect(staticFallback).toContain(
      'href="/contact?subject=partnership#contact-form"',
    );
  });

  it("prefetches persistent destinations on user intent without eager viewport prefetch", () => {
    renderNav();
    const pipeline = screen.getByRole("link", { name: "Pipeline" });

    expect(prefetchRoute).not.toHaveBeenCalled();
    fireEvent.pointerEnter(pipeline);
    expect(prefetchRoute).toHaveBeenCalledWith("/pipeline");

    fireEvent.focus(
      screen.getByRole("link", { name: "Partner with us" }),
    );
    expect(prefetchRoute).toHaveBeenCalledWith(
      "/contact?subject=partnership",
    );
  });

  it("only exposes the dialog relationship while the menu target is mounted", async () => {
    const user = userEvent.setup();
    const menuButton = renderNav();

    expect(menuButton).not.toHaveAttribute("aria-controls");
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById("mobile-nav")).not.toBeInTheDocument();

    await user.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-controls", "mobile-nav");
    expect(document.getElementById("mobile-nav")).toBeInTheDocument();
  });

  it("restores focus when the active route link only closes the menu", async () => {
    const user = userEvent.setup();
    const menuButton = renderNav();

    await user.click(menuButton);
    const dialog = screen.getByRole("dialog", { name: "Main menu" });
    await user.click(screen.getByRole("link", { name: "Platform" }));
    finishMenuExit(dialog);

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Main menu" })).not.toBeInTheDocument();
      expect(menuButton).toHaveFocus();
    });
  });

  it("does not return focus to the trigger during genuine route navigation", async () => {
    const user = userEvent.setup();
    const menuButton = renderNav();

    await user.click(menuButton);
    const dialog = screen.getByRole("dialog", { name: "Main menu" });
    await user.click(screen.getByRole("link", { name: "Pipeline" }));
    finishMenuExit(dialog);

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Main menu" })).not.toBeInTheDocument();
    });
    expect(menuButton).not.toHaveFocus();
  });

  it("does not return focus to the trigger for a same-path Contact destination", async () => {
    route.pathname = "/contact";
    const user = userEvent.setup();
    const menuButton = renderNav();

    await user.click(menuButton);
    const dialog = screen.getByRole("dialog", { name: "Main menu" });
    await user.click(
      within(dialog).getByRole("link", { name: "Partner with us" }),
    );
    finishMenuExit(dialog);

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: "Main menu" }),
      ).not.toBeInTheDocument();
    });
    expect(menuButton).not.toHaveFocus();
  });

  it("locks and inerts the background until the exit completes", async () => {
    const user = userEvent.setup();
    renderNav();
    const nav = document.querySelector('nav[aria-label="Main"]');
    const skipLink = document.querySelector(".skip-to-content");
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const dialog = screen.getByRole("dialog", { name: "Main menu" });

    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(nav).toHaveAttribute("aria-hidden", "true");
    expect(nav).toHaveAttribute("inert");
    expect(skipLink).toHaveAttribute("inert");
    expect(main).toHaveAttribute("inert");
    expect(footer).toHaveAttribute("inert");
    expect(document.body.style.overflow).toBe("hidden");

    await user.click(within(dialog).getByRole("button", { name: "Close menu" }));
    expect(dialog).toHaveAttribute("data-state", "closed");
    expect(nav).toHaveAttribute("inert");

    finishMenuExit(dialog);

    await waitFor(() => {
      expect(document.getElementById("mobile-nav")).not.toBeInTheDocument();
      expect(nav).not.toHaveAttribute("aria-hidden");
      expect(nav).not.toHaveAttribute("inert");
      expect(skipLink).not.toHaveAttribute("inert");
      expect(main).not.toHaveAttribute("inert");
      expect(footer).not.toHaveAttribute("inert");
      expect(document.body.style.overflow).toBe("");
    });
  });

  it("closes on Escape and restores focus to the trigger", async () => {
    const user = userEvent.setup();
    const menuButton = renderNav();

    await user.click(menuButton);
    const dialog = screen.getByRole("dialog", { name: "Main menu" });
    fireEvent.keyDown(document, { key: "Escape" });
    finishMenuExit(dialog);

    await waitFor(() => {
      expect(document.getElementById("mobile-nav")).not.toBeInTheDocument();
      expect(menuButton).toHaveFocus();
    });
  });

  it("wraps Tab and Shift+Tab within the dialog", async () => {
    const user = userEvent.setup();
    renderNav();

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const dialog = screen.getByRole("dialog", { name: "Main menu" });
    const first = within(dialog).getByRole("link", {
      name: "EndoCyclic Therapeutics — home",
    });
    const last = within(dialog).getByRole("link", { name: "Partner with us" });

    last.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(first).toHaveFocus();

    first.focus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(last).toHaveFocus();
  });

  it("moves focus to the persistent brand link when the dialog is removed at the desktop breakpoint", async () => {
    const media = installMediaQueries();
    const user = userEvent.setup();
    const menuButton = renderNav();
    const brandLink = screen.getByRole("link", {
      name: "EndoCyclic Therapeutics — home",
    });

    await user.click(menuButton);
    const dialog = screen.getByRole("dialog", { name: "Main menu" });
    within(dialog).getByRole("button", { name: "Close menu" }).focus();

    act(() => media.set("(min-width: 1024px)", true));

    await waitFor(() => {
      expect(document.getElementById("mobile-nav")).not.toBeInTheDocument();
      expect(brandLink).toHaveFocus();
    });
    expect(menuButton).not.toHaveFocus();
  });

  it("switches to the compact menu when scaled desktop navigation no longer fits", async () => {
    installMediaQueries({ "(min-width: 1024px)": true });
    const resize = installResizeObserver();
    const menuButton = renderNav();
    const measurements = setNavMeasurements(900);

    act(() => resize.notify());

    await waitFor(() => {
      expect(measurements.nav).toHaveAttribute("data-nav-mode", "compact");
    });
    expect(measurements.desktopNav).toHaveAttribute("aria-hidden", "true");
    expect(measurements.desktopNav).toHaveAttribute("inert");
    expect(measurements.desktopNav).toHaveClass(
      "lg:absolute",
      "lg:invisible",
    );
    expect(menuButton).toHaveClass("lg:flex");
    expect(menuButton).not.toHaveClass("lg:hidden");

    measurements.setDesktopNavWidth(700);
    act(() => resize.notify());

    await waitFor(() => {
      expect(measurements.nav).toHaveAttribute("data-nav-mode", "full");
    });
    expect(measurements.desktopNav).not.toHaveAttribute("aria-hidden");
    expect(measurements.desktopNav).not.toHaveAttribute("inert");
    expect(measurements.desktopNav).not.toHaveClass("lg:absolute");
    expect(menuButton).toHaveClass("lg:hidden");
    expect(menuButton).not.toHaveClass("lg:flex");
  });

  it("keeps the compact drawer available at desktop widths until the full navigation fits", async () => {
    installMediaQueries({ "(min-width: 1024px)": true });
    const resize = installResizeObserver();
    const user = userEvent.setup();
    const menuButton = renderNav();
    const measurements = setNavMeasurements(900);

    act(() => resize.notify());
    await waitFor(() => {
      expect(measurements.nav).toHaveAttribute("data-nav-mode", "compact");
    });

    await user.click(menuButton);
    const dialog = screen.getByRole("dialog", { name: "Main menu" });

    expect(dialog).toHaveClass("lg:block");
    expect(dialog).not.toHaveClass("lg:hidden");

    act(() => resize.notify());
    expect(screen.getByRole("dialog", { name: "Main menu" })).toBe(dialog);

    measurements.setDesktopNavWidth(700);
    act(() => resize.notify());

    await waitFor(() => {
      expect(document.getElementById("mobile-nav")).not.toBeInTheDocument();
      expect(measurements.brand).toHaveFocus();
    });
  });

  it("removes a closing menu immediately for reduced-motion users", async () => {
    installMediaQueries({ "(prefers-reduced-motion: reduce)": true });
    const user = userEvent.setup();
    renderNav();

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const dialog = screen.getByRole("dialog", { name: "Main menu" });
    await user.click(within(dialog).getByRole("button", { name: "Close menu" }));

    await waitFor(() => {
      expect(document.getElementById("mobile-nav")).not.toBeInTheDocument();
    });
  });
});
