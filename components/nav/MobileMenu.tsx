"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ESTIMATE_HREF,
  ESTIMATE_LABEL,
  locations,
  navLinks,
  serviceColumns,
  solutions,
  type PanelId,
} from "./navData";

// Also used by the stripe transition between the estimate steps.
export const STRIPE_COUNT = 6;
export const STRIPE_STAGGER = 70;
export const STRIPE_DURATION = 450;
export const STRIPE_OPEN_TOTAL = (STRIPE_COUNT - 1) * STRIPE_STAGGER + STRIPE_DURATION;
export const STRIPE_CLOSE_START = 120;
export const STRIPE_CLOSE_TOTAL = STRIPE_CLOSE_START + STRIPE_OPEN_TOTAL;

const dropdownGroups: Record<
  PanelId,
  { title?: string; items: { label: string; href: string }[] }[]
> = {
  services: serviceColumns,
  solutions: [{ items: solutions }],
  locations: [{ items: locations }],
};

export function MobileMenu({
  open,
  isActive,
  onClose,
  onTabPastEnd,
}: {
  open: boolean;
  isActive: (href: string) => boolean;
  onClose: () => void;
  onTabPastEnd: () => void;
}) {
  const [openDropdown, setOpenDropdown] = useState<PanelId | null>(null);

  // Start with every dropdown closed next time, once the menu has left the screen.
  useEffect(() => {
    if (open) return;
    const timer = setTimeout(() => setOpenDropdown(null), STRIPE_CLOSE_TOTAL);
    return () => clearTimeout(timer);
  }, [open]);

  const subLink = (label: string, href: string) => (
    <li key={href}>
      <Link
        href={href}
        onClick={onClose}
        aria-current={isActive(href) ? "page" : undefined}
        className={`block py-[9px] text-[17px] leading-[27px] font-normal ${
          isActive(href) ? "text-burnt-orange" : "text-ink"
        }`}
      >
        {label}
      </Link>
    </li>
  );

  return (
    <div
      id="mobile-menu"
      inert={!open}
      className={`fixed inset-0 z-40 motion-reduce:delay-0! min-[1100px]:hidden ${
        open ? "visible" : "invisible"
      }`}
      style={{
        transition: "visibility 0s",
        transitionDelay: open ? "0ms" : `${STRIPE_CLOSE_TOTAL}ms`,
      }}
    >
      {/* Stripes fill from the bottom up when opening, and leave from the top down when closing. */}
      <div aria-hidden className="absolute inset-0 flex flex-col">
        {Array.from({ length: STRIPE_COUNT }, (_, index) => (
          <div
            key={index}
            className={`-mb-px flex-1 bg-paper transition-transform ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none ${
              open ? "origin-left scale-x-100" : "origin-right scale-x-0"
            }`}
            style={{
              transitionDuration: `${STRIPE_DURATION}ms`,
              transitionDelay: open
                ? `${(STRIPE_COUNT - 1 - index) * STRIPE_STAGGER}ms`
                : `${STRIPE_CLOSE_START + index * STRIPE_STAGGER}ms`,
            }}
          />
        ))}
      </div>

      <div className="relative flex h-dvh flex-col justify-between gap-10 overflow-y-auto px-5 pt-[122px] pb-8">
        <nav aria-label="Mobile">
          <ul>
            {navLinks.map((link, index) => {
              const panelId = link.panel;
              const expanded = panelId !== undefined && openDropdown === panelId;
              const rowClasses = `flex w-full items-center py-4 text-left text-[32px] leading-[38px] font-medium tracking-[-0.03em] ${
                isActive(link.href) ? "text-burnt-orange" : "text-ink"
              }`;
              return (
                <li
                  key={link.href}
                  className={`border-t border-hairline transition-[opacity,translate] duration-300 ease-out last:border-b motion-reduce:transition-none ${
                    open
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0"
                  }`}
                  style={{
                    transitionDelay: open ? `${500 + index * 50}ms` : "0ms",
                    transitionDuration: open ? "300ms" : "120ms",
                  }}
                >
                  {panelId ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={`mobile-${panelId}`}
                        onClick={() =>
                          setOpenDropdown(expanded ? null : panelId)
                        }
                        className={rowClasses}
                      >
                        {link.label}
                      </button>
                      <div
                        id={`mobile-${panelId}`}
                        inert={!expanded}
                        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <ul className="pb-4">
                            {subLink(
                              `All ${link.label.toLowerCase()}`,
                              link.href,
                            )}
                            {dropdownGroups[panelId].map((group, groupIndex) => (
                              <li key={group.title ?? groupIndex}>
                                {group.title && (
                                  <p className="mt-4 mb-1 font-mono text-sm leading-[18px] text-stone uppercase">
                                    {group.title}
                                  </p>
                                )}
                                <ul>
                                  {group.items.map((item) =>
                                    subLink(item.label, item.href),
                                  )}
                                </ul>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={rowClasses}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <Link
          href={ESTIMATE_HREF}
          onClick={onClose}
          onKeyDown={(event) => {
            if (event.key === "Tab" && !event.shiftKey) {
              event.preventDefault();
              onTabPastEnd();
            }
          }}
          className={`bg-orange px-6 py-4 text-center font-mono text-base leading-5 text-ink uppercase transition-[opacity,translate] ease-out motion-reduce:transition-none ${
            open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
          style={{
            transitionDelay: open ? `${500 + navLinks.length * 50}ms` : "0ms",
            transitionDuration: open ? "300ms" : "120ms",
          }}
        >
          {ESTIMATE_LABEL}
        </Link>
      </div>
    </div>
  );
}
