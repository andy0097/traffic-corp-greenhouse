"use client";

import { useEffect, useRef, type ReactNode } from "react";

const SHOWN = "data-shown";

// Fades each part of a section in the first time that part scrolls into view, rather than
// when the section's empty top space does. The look is in globals.css.
export function Reveal({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = wrapper.current?.firstElementChild;
    if (!section) return;

    const intersection = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute(SHOWN, "");
          intersection.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    // The logo row has no box of its own on wide screens, so its logos are watched too.
    const parts = [
      ...section.children,
      ...section.querySelectorAll(":scope > .xl\\:contents > *"),
    ];
    parts.forEach((part) => intersection.observe(part));

    // Parts swapped in later, like a new tab's cards, have their own animation and show straight away.
    const swaps = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) node.setAttribute(SHOWN, "");
        });
      }
    });
    swaps.observe(section, { childList: true });

    return () => {
      intersection.disconnect();
      swaps.disconnect();
    };
  }, []);

  return (
    <div ref={wrapper} className="reveal">
      {children}
    </div>
  );
}
