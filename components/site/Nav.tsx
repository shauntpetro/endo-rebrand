"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { NAV_LINKS, PARTNERSHIP_CONTACT_HREF } from "@/lib/site";
import Button from "./Button";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [menuPresent, setMenuPresent] = useState(false);
  const [compactDesktopNav, setCompactDesktopNav] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const brandLinkRef = useRef<HTMLAnchorElement>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const restoreMenuFocusRef = useRef(true);
  const previousPathnameRef = useRef(pathname);
  const close = useCallback(() => {
    restoreMenuFocusRef.current = true;
    setOpen(false);
  }, []);
  const closeForNavigation = useCallback(() => {
    restoreMenuFocusRef.current = false;
    setOpen(false);
  }, []);
  const openMenu = useCallback(() => {
    restoreMenuFocusRef.current = true;
    setMenuPresent(true);
    setOpen(true);
  }, []);
  const prefetchOnIntent = useCallback(
    (
      event:
        | React.FocusEvent<HTMLAnchorElement>
        | React.PointerEvent<HTMLAnchorElement>,
    ) => {
      const href = event.currentTarget.getAttribute("href");
      if (!href?.startsWith("/")) return;

      router.prefetch(href.split("#", 1)[0] || "/");
    },
    [router],
  );
  const fullDesktopNavFits = useCallback(() => {
    const nav = navRef.current;
    const brand = brandLinkRef.current;
    const desktopNav = desktopNavRef.current;

    if (!nav || !brand || !desktopNav) return true;

    const navStyles = window.getComputedStyle(nav);
    const navWidth = nav.clientWidth || nav.getBoundingClientRect().width;
    const padding =
      (Number.parseFloat(navStyles.paddingLeft) || 0) +
      (Number.parseFloat(navStyles.paddingRight) || 0);
    const gap =
      Number.parseFloat(navStyles.columnGap) ||
      Number.parseFloat(navStyles.gap) ||
      0;
    const brandWidth =
      brand.getBoundingClientRect().width || brand.offsetWidth;
    const desktopNavWidth = Math.max(
      desktopNav.scrollWidth,
      desktopNav.getBoundingClientRect().width,
    );

    return brandWidth + gap + desktopNavWidth <= navWidth - padding;
  }, []);

  useEffect(() => {
    let frame = 0;
    let lastScrolled: boolean | null = null;
    let lastProgressTransform = "";
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const updateNav = () => {
      const nav = navRef.current;
      const progress = progressRef.current;
      const scrollableHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        0,
      );
      const scale = scrollableHeight
        ? Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1)
        : 0;

      const scrolled = window.scrollY > 18;
      if (nav && scrolled !== lastScrolled) {
        nav.dataset.scrolled = scrolled ? "true" : "false";
        lastScrolled = scrolled;
      }
      if (progress) {
        const progressTransform = reducedMotionQuery.matches
          ? "scaleX(0)"
          : `scaleX(${scale})`;
        if (progressTransform !== lastProgressTransform) {
          progress.style.transform = progressTransform;
          lastProgressTransform = progressTransform;
        }
      }
      frame = 0;
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateNav);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    reducedMotionQuery.addEventListener("change", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      reducedMotionQuery.removeEventListener("change", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    let frame = 0;
    let cancelled = false;

    const updateFit = () => {
      frame = 0;
      const useCompactNav =
        desktopQuery.matches && !fullDesktopNavFits();
      setCompactDesktopNav((current) =>
        current === useCompactNav ? current : useCompactNav,
      );
    };
    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateFit);
    };
    const handleDesktopChange = () => updateFit();
    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(scheduleUpdate);

    if (navRef.current) resizeObserver?.observe(navRef.current);
    if (brandLinkRef.current) resizeObserver?.observe(brandLinkRef.current);
    if (desktopNavRef.current) resizeObserver?.observe(desktopNavRef.current);

    desktopQuery.addEventListener("change", handleDesktopChange);
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    const fontSet = "fonts" in document ? document.fonts : null;
    fontSet?.addEventListener("loadingdone", scheduleUpdate);
    void fontSet?.ready.then(() => {
      if (!cancelled) scheduleUpdate();
    });

    updateFit();

    return () => {
      cancelled = true;
      desktopQuery.removeEventListener("change", handleDesktopChange);
      window.removeEventListener("resize", scheduleUpdate);
      fontSet?.removeEventListener("loadingdone", scheduleUpdate);
      resizeObserver?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [fullDesktopNavFits]);

  useEffect(() => {
    if (!menuPresent) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const menuButton = menuButtonRef.current;
    const background = Array.from(document.querySelectorAll<HTMLElement>(".skip-to-content, main, footer"));
    const previouslyInert = new Map(background.map((node) => [node, node.hasAttribute("inert")]));
    const previousBodyOverflow = document.body.style.overflow;
    background.forEach((node) => node.setAttribute("inert", ""));

    const focusable = () => Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [],
    );
    requestAnimationFrame(() => focusable()[0]?.focus());

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousBodyOverflow;
      background.forEach((node) => {
        if (!previouslyInert.get(node)) node.removeAttribute("inert");
      });
      if (restoreMenuFocusRef.current) {
        const focusTarget = previouslyFocused?.isConnected ? previouslyFocused : menuButton;
        focusTarget?.focus();
      }
      restoreMenuFocusRef.current = true;
    };
  }, [menuPresent, close]);

  useEffect(() => {
    if (previousPathnameRef.current === pathname) return;
    previousPathnameRef.current = pathname;
    restoreMenuFocusRef.current = false;
    const frame = window.requestAnimationFrame(() => {
      setOpen(false);
      setMenuPresent(false);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (open || !menuPresent) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timer = window.setTimeout(
      () => setMenuPresent(false),
      reducedMotion ? 0 : 300,
    );

    return () => window.clearTimeout(timer);
  }, [menuPresent, open]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const dismissHiddenMenu = () => {
      if (
        !desktopQuery.matches ||
        compactDesktopNav ||
        !fullDesktopNavFits() ||
        !menuPresent
      ) {
        return;
      }
      restoreMenuFocusRef.current = false;
      setOpen(false);
      setMenuPresent(false);
      requestAnimationFrame(() => {
        brandLinkRef.current?.focus({ preventScroll: true });
      });
    };

    desktopQuery.addEventListener("change", dismissHiddenMenu);
    dismissHiddenMenu();
    return () => desktopQuery.removeEventListener("change", dismissHiddenMenu);
  }, [compactDesktopNav, fullDesktopNavFits, menuPresent]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 sm:px-4">
      <div
        ref={progressRef}
        aria-hidden
        className="nav-scroll-progress pointer-events-none fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-rose via-gold to-teal"
      />
      <nav
        ref={navRef}
        data-enhanced-site-nav
        data-nav-mode={compactDesktopNav ? "compact" : "full"}
        data-scrolled="false"
        aria-label="Main"
        aria-hidden={menuPresent || undefined}
        inert={menuPresent || undefined}
        className="site-nav-shell pointer-events-auto relative isolate mx-auto mt-2 flex h-14 max-w-[74rem] items-center justify-between gap-5 px-3 sm:px-5 lg:px-7"
      >
        <span
          aria-hidden
          className="site-nav-surface pointer-events-none absolute inset-0 -z-10 rounded-full border border-line-soft bg-paper/95 opacity-0 shadow-[0_12px_38px_rgb(57_38_56/0.08)]"
        />
        <Link
          ref={brandLinkRef}
          href="/"
          prefetch={false}
          onFocus={prefetchOnIntent}
          onPointerEnter={prefetchOnIntent}
          aria-label="EndoCyclic Therapeutics — home"
          className="relative flex h-11 w-36 shrink-0 items-center lg:w-40"
        >
          <Image
            src="/logo.avif"
            alt="EndoCyclic Therapeutics"
            width={233}
            height={70}
            priority
            className="h-auto w-full object-contain object-left"
          />
        </Link>

        <div
          ref={desktopNavRef}
          data-desktop-nav
          aria-hidden={compactDesktopNav || undefined}
          inert={compactDesktopNav || undefined}
          className={clsx(
            "hidden w-max shrink-0 items-center gap-3",
            compactDesktopNav
              ? "lg:invisible lg:pointer-events-none lg:absolute lg:right-0 lg:flex"
              : "lg:flex",
          )}
        >
          <ul className="flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    onFocus={prefetchOnIntent}
                    onPointerEnter={prefetchOnIntent}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "relative inline-flex min-h-11 items-center px-2.5 text-sm transition-colors after:absolute after:inset-x-2.5 after:bottom-1.5 after:h-px after:origin-left after:bg-gradient-to-r after:from-rose after:to-teal after:transition-transform",
                      active ? "text-ink after:scale-x-100" : "text-muted after:scale-x-0 hover:text-ink hover:after:scale-x-100",
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/investors"
            prefetch={false}
            onFocus={prefetchOnIntent}
            onPointerEnter={prefetchOnIntent}
            aria-current={pathname === "/investors" ? "page" : undefined}
            className={clsx(
              "relative inline-flex min-h-11 items-center px-2 text-sm transition-colors after:absolute after:inset-x-2 after:bottom-1.5 after:h-px after:origin-left after:bg-gradient-to-r after:from-rose after:to-teal after:transition-transform",
              pathname === "/investors"
                ? "text-ink after:scale-x-100"
                : "text-muted after:scale-x-0 hover:text-ink hover:after:scale-x-100",
            )}
          >
            Investors
          </Link>
          <Button
            href={PARTNERSHIP_CONTACT_HREF}
            prefetch={false}
            onFocus={prefetchOnIntent}
            onPointerEnter={prefetchOnIntent}
          >
            Partner with us
          </Button>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls={menuPresent ? "mobile-nav" : undefined}
          ref={menuButtonRef}
          onClick={openMenu}
          className={clsx(
            "flex h-11 w-11 items-center justify-center text-ink",
            compactDesktopNav ? "lg:flex" : "lg:hidden",
          )}
        >
          <Menu size={22} />
        </button>
      </nav>

      <noscript>
        <style>{`
          @media (max-width: 1023px) {
            [data-enhanced-site-nav] { display: none !important; }
          }
        `}</style>
        <nav
          data-nojs-mobile-nav
          aria-label="Main navigation"
          className="pointer-events-auto relative mx-auto mt-2 flex h-14 max-w-[74rem] items-center justify-between gap-4 rounded-full border border-line-soft bg-paper/95 px-3 shadow-[0_12px_38px_rgb(57_38_56/0.08)] sm:px-5 lg:hidden"
        >
          <Link
            href="/"
            prefetch={false}
            aria-label="EndoCyclic Therapeutics — home"
            className="relative flex h-11 w-36 shrink-0 items-center"
          >
            <Image
              src="/logo.avif"
              alt="EndoCyclic Therapeutics"
              width={233}
              height={70}
              className="h-auto w-full object-contain object-left"
            />
          </Link>

          <details className="group relative">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center text-ink [&::-webkit-details-marker]:hidden">
              <Menu aria-hidden size={22} />
              <span className="sr-only">Main menu</span>
            </summary>
            <div className="absolute right-0 top-[calc(100%+0.55rem)] w-[min(22rem,calc(100vw-1.5rem))] max-h-[calc(100dvh-5rem)] overflow-y-auto rounded-bl-[2rem] rounded-tr-[2rem] border border-line bg-paper px-5 pb-6 pt-5 shadow-[0_24px_70px_rgb(57_38_56/0.14)]">
              <p className="eyebrow">Navigate</p>
              <ul className="mt-3 divide-y divide-line-soft border-y border-line-soft">
                {NAV_LINKS.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        prefetch={false}
                        aria-current={active ? "page" : undefined}
                        className={clsx(
                          "flex min-h-12 items-center justify-between gap-4 text-base",
                          active ? "text-rose-ink" : "text-ink",
                        )}
                      >
                        {link.name}
                        <span
                          aria-hidden
                          className={clsx(
                            active
                              ? "text-xs font-semibold uppercase tracking-[0.12em] text-rose-ink"
                              : "text-sm text-muted",
                          )}
                        >
                          {active ? "Current" : "→"}
                        </span>
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link
                    href="/investors"
                    prefetch={false}
                    aria-current={
                      pathname === "/investors" ? "page" : undefined
                    }
                    className={clsx(
                      "flex min-h-12 items-center justify-between gap-4 text-base",
                      pathname === "/investors"
                        ? "text-rose-ink"
                        : "text-ink",
                    )}
                  >
                    Investors
                    <span
                      aria-hidden
                      className={clsx(
                        pathname === "/investors"
                          ? "text-xs font-semibold uppercase tracking-[0.12em] text-rose-ink"
                          : "text-sm text-muted",
                      )}
                    >
                      {pathname === "/investors" ? "Current" : "→"}
                    </span>
                  </Link>
                </li>
              </ul>
              <Button
                href={PARTNERSHIP_CONTACT_HREF}
                prefetch={false}
                className="mt-5 w-full"
              >
                Partner with us
              </Button>
            </div>
          </details>
        </nav>
      </noscript>

      {menuPresent && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          ref={menuRef}
          data-state={open ? "open" : "closed"}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget && !open) {
              setMenuPresent(false);
            }
          }}
          className={clsx(
            "mobile-nav-panel pointer-events-auto fixed inset-0 overflow-y-auto bg-paper px-5 pb-10 pt-4",
            compactDesktopNav ? "lg:block" : "lg:hidden",
          )}
        >
          <div className="mx-auto flex max-w-xl items-center justify-between">
            <Link
              href="/"
              prefetch={false}
              onFocus={prefetchOnIntent}
              onPointerEnter={prefetchOnIntent}
              onClick={pathname === "/" ? close : closeForNavigation}
              aria-label="EndoCyclic Therapeutics — home"
              className="relative flex h-11 w-36 items-center"
            >
              <Image
                src="/logo.avif"
                alt="EndoCyclic Therapeutics"
                width={233}
                height={70}
                className="h-auto w-full object-contain object-left"
              />
            </Link>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center text-ink"
            >
              <X size={23} />
            </button>
          </div>

          <div className="mx-auto mt-8 max-w-xl">
            <p
              className="mobile-nav-item eyebrow"
              style={{ "--nav-item-delay": "0ms" } as React.CSSProperties}
            >
              Navigate
            </p>
            <ul className="mt-4 flex flex-col divide-y divide-line-soft border-y border-line-soft">
              {NAV_LINKS.map((link, index) => {
                const active = pathname === link.href;
                return (
                  <li
                    key={link.href}
                    className="mobile-nav-item"
                    style={{
                      "--nav-item-delay": `${(index + 1) * 24}ms`,
                    } as React.CSSProperties}
                  >
                    <Link
                      href={link.href}
                      prefetch={false}
                      onFocus={prefetchOnIntent}
                      onPointerEnter={prefetchOnIntent}
                      aria-current={active ? "page" : undefined}
                      onClick={active ? close : closeForNavigation}
                      className={clsx(
                        "flex min-h-16 items-center justify-between text-xl",
                        active ? "text-rose-ink" : "text-ink",
                      )}
                    >
                      {link.name}
                      <span
                        aria-hidden
                        className={clsx(
                          "text-sm",
                          active
                            ? "text-xs font-semibold uppercase tracking-[0.12em] text-rose-ink"
                            : "text-muted",
                        )}
                      >
                        {active ? "Current" : "→"}
                      </span>
                    </Link>
                  </li>
                );
              })}
              <li
                className="mobile-nav-item"
                style={{
                  "--nav-item-delay": `${(NAV_LINKS.length + 1) * 24}ms`,
                } as React.CSSProperties}
              >
                <Link
                  href="/investors"
                  prefetch={false}
                  onFocus={prefetchOnIntent}
                  onPointerEnter={prefetchOnIntent}
                  aria-current={
                    pathname === "/investors" ? "page" : undefined
                  }
                  onClick={
                    pathname === "/investors" ? close : closeForNavigation
                  }
                  className={clsx(
                    "flex min-h-16 items-center justify-between text-xl",
                    pathname === "/investors"
                      ? "text-rose-ink"
                      : "text-ink",
                  )}
                >
                  Investors{" "}
                  <span
                    aria-hidden
                    className={clsx(
                      "text-sm",
                      pathname === "/investors"
                        ? "text-xs font-semibold uppercase tracking-[0.12em] text-rose-ink"
                        : "text-muted",
                    )}
                  >
                    {pathname === "/investors" ? "Current" : "→"}
                  </span>
                </Link>
              </li>
            </ul>
            <div
              className="mobile-nav-item"
              style={{
                "--nav-item-delay": `${(NAV_LINKS.length + 2) * 24}ms`,
              } as React.CSSProperties}
            >
              <Button
                href={PARTNERSHIP_CONTACT_HREF}
                prefetch={false}
                onFocus={prefetchOnIntent}
                onPointerEnter={prefetchOnIntent}
                onClick={closeForNavigation}
                className="mt-8"
              >
                Partner with us
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
