"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { NavPanel } from "./NavPanels";
import {
  EMAIL,
  ESTIMATE_HREF,
  ESTIMATE_LABEL,
  PHONE,
  PHONE_HREF,
  navLinks,
  type PanelId,
} from "./navData";

const NAV_HEIGHT = 90;
const TOP_OF_PAGE = 10;
const SCROLL_NOISE = 4;
const SLIDE_MS = 300;
const HOVER_CLOSE_MS = 120;
const DESKTOP_QUERY = "(min-width: 1100px)";
const MENU_LOOK_OPEN_MS = 500;
const MENU_LOOK_CLOSE_MS = 250;

export function Navbar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolledAway, setScrolledAway] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [panel, setPanel] = useState<PanelId>("services");
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuLook, setMenuLook] = useState(false);

  const menuOpenRef = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const menuButton = useRef<HTMLButtonElement>(null);

  const isHome = pathname === "/";
  const isActive = useCallback(
    (href: string) => pathname === href || pathname.startsWith(`${href}/`),
    [pathname],
  );

  // The transparent look is only for the top of the homepage, over the hero photo.
  const heroLook = isHome && !scrolledAway && !panelOpen;
  const onDark = heroLook && !menuLook;

  // The bar's text turns ink only once the paper menu has moved behind it.
  useEffect(() => {
    const timer = setTimeout(
      () => setMenuLook(menuOpen),
      menuOpen ? MENU_LOOK_OPEN_MS : MENU_LOOK_CLOSE_MS,
    );
    return () => clearTimeout(timer);
  }, [menuOpen]);

  // Scrolling down hides the bar. Scrolling up brings it back in its solid look.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    let swapTimer: ReturnType<typeof setTimeout> | undefined;

    const update = () => {
      frame = 0;
      if (menuOpenRef.current) return;
      const y = Math.max(0, window.scrollY);
      if (y <= TOP_OF_PAGE) {
        clearTimeout(swapTimer);
        setHidden(false);
        setScrolledAway(false);
        lastY = y;
        return;
      }
      const delta = y - lastY;
      if (Math.abs(delta) < SCROLL_NOISE) return;
      if (delta < 0) {
        clearTimeout(swapTimer);
        setScrolledAway(true);
        setHidden(false);
      } else if (y > NAV_HEIGHT) {
        setHidden(true);
        setPanelOpen(false);
        // Swap the look only once the bar has slid out of sight.
        clearTimeout(swapTimer);
        swapTimer = setTimeout(() => setScrolledAway(true), SLIDE_MS);
      }
      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // A page reloaded partway down should not start in the transparent look.
    const initial = requestAnimationFrame(() => {
      if (window.scrollY > TOP_OF_PAGE) setScrolledAway(true);
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(initial);
      clearTimeout(swapTimer);
    };
  }, []);

  // Keep the page behind the mobile menu still, and close the menu at desktop width.
  useEffect(() => {
    menuOpenRef.current = menuOpen;
    if (!menuOpen) return;
    document.documentElement.style.overflow = "hidden";
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => setMenuOpen(false);
    desktop.addEventListener("change", onChange);
    return () => {
      document.documentElement.style.overflow = "";
      desktop.removeEventListener("change", onChange);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!panelOpen && !menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setPanelOpen(false);
      setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [panelOpen, menuOpen]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const openPanel = (id: PanelId) => {
    clearTimeout(closeTimer.current);
    setPanel(id);
    setPanelOpen(true);
  };

  const closePanel = () => {
    clearTimeout(closeTimer.current);
    setPanelOpen(false);
  };

  const closePanelSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setPanelOpen(false), HOVER_CLOSE_MS);
  };

  const closeMenu = () => setMenuOpen(false);

  const barColor = onDark ? "text-paper" : "text-ink";

  return (
    <>
      <header
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") clearTimeout(closeTimer.current);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") closePanelSoon();
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) closePanel();
        }}
        className={`fixed inset-x-0 top-0 z-50 transition-[translate,background-color] duration-300 ease-out motion-reduce:transition-none ${
          hidden && !menuOpen
            ? "-translate-y-full has-[:focus-visible]:translate-y-0"
            : "translate-y-0"
        } ${onDark ? "bg-transparent" : "bg-paper"}`}
        style={{
          transitionDelay: menuOpen ? "450ms" : "0ms",
        }}
      >
        {/* Phone and email */}
        <div
          className={`flex h-[29px] items-center justify-end gap-6 border-b px-page text-[13px] leading-4 transition-colors duration-200 ${
            onDark
              ? "border-paper/40 text-paper/70"
              : "border-stone/60 text-stone"
          }`}
        >
          <a href={PHONE_HREF} className="transition-colors hover:text-orange">
            {PHONE}
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="transition-colors hover:text-orange"
          >
            {EMAIL}
          </a>
        </div>

        {/* Logo, links and action */}
        <div
          className={`flex h-[61px] items-center justify-between border-b px-page transition-colors duration-200 ${
            panelOpen
              ? "border-transparent"
              : onDark
                ? "border-hairline/40"
                : "border-hairline"
          }`}
        >
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5"
          >
            <Image
              src="/logo.png"
              alt=""
              width={46}
              height={45}
              priority
              className="size-10 min-[1100px]:h-[45px] min-[1100px]:w-[46px]"
            />
            <span
              className={`font-mono text-[19px] leading-6 font-semibold tracking-[-0.02em] transition-colors duration-200 ${barColor}`}
            >
              TrafficCorp
            </span>
          </Link>

          <nav
            aria-label="Main"
            className="hidden items-center gap-9 min-[1100px]:flex"
          >
            {navLinks.map((link) => {
              const open = panelOpen && panel === link.panel;
              const panelId = link.panel;
              return (
                <div
                  key={link.href}
                  className="flex items-center gap-1"
                  onPointerEnter={(event) => {
                    if (event.pointerType !== "mouse") return;
                    if (panelId) openPanel(panelId);
                    else closePanel();
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={closePanel}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`text-[15px] leading-[18px] transition-colors duration-200 hover:text-orange ${
                      open || isActive(link.href) ? "text-orange" : barColor
                    }`}
                  >
                    {link.label}
                  </Link>
                  {panelId && (
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-label={`${open ? "Close" : "Open"} ${link.label} menu`}
                      onClick={() =>
                        open ? closePanel() : openPanel(panelId)
                      }
                      className={`-mr-[18px] flex size-6 items-center text-sm leading-[18px] transition-colors duration-200 ${
                        open || isActive(link.href) ? "text-orange" : barColor
                      }`}
                    >
                      {open ? "▴" : "▾"}
                    </button>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={ESTIMATE_HREF}
              onClick={() => {
                closePanel();
                closeMenu();
              }}
              className={`hidden border bg-asphalt px-5 py-3 font-mono text-sm leading-[18px] font-medium text-paper uppercase transition-colors duration-200 hover:bg-ink md:block ${
                heroLook ? "border-transparent" : "border-olive-grey"
              }`}
            >
              {ESTIMATE_LABEL}
            </Link>

            <button
              ref={menuButton}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className={`relative -mr-2.5 size-11 transition-colors duration-200 min-[1100px]:hidden ${barColor}`}
            >
              {[
                menuOpen ? "rotate-45" : "-translate-y-[7px]",
                menuOpen ? "scale-x-0" : "",
                menuOpen ? "-rotate-45" : "translate-y-[7px]",
              ].map((position, index) => (
                <span
                  key={index}
                  className={`absolute inset-x-2.5 top-1/2 -mt-px h-0.5 bg-current transition-transform duration-300 ease-out ${position}`}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Dropdown panel */}
        <div
          inert={!panelOpen}
          className={`hidden transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none min-[1100px]:grid ${
            panelOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="max-h-[calc(100dvh-90px)] overflow-y-auto border-t-2 border-orange bg-paper">
              <NavPanel key={panel} panel={panel} onNavigate={closePanel} />
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        isActive={isActive}
        onClose={closeMenu}
        onTabPastEnd={() => menuButton.current?.focus()}
      />

      {/* Only the homepage hero runs underneath the bar. */}
      {!isHome && <div aria-hidden className="h-[90px]" />}
    </>
  );
}
