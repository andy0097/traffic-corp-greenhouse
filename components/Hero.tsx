"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { ESTIMATE_HREF, ESTIMATE_LABEL, PHONE, PHONE_HREF } from "./nav/navData";

// The photo fades in first, then the heading part, then the bottom part.
const HEADING_DELAYS = { eyebrow: 600, title: 720, buttons: 860 };
const BOTTOM_DELAY = 1400;
const BOTTOM_STAGGER = 110;
// Start anyway if the photo is slow, so the text is never held back for long.
const MAX_WAIT_MS = 1200;

const stats = [
  {
    value: "25+",
    label: "years of experience",
    cell: "min-[1100px]:w-[200px] min-[1100px]:px-6",
    valueLeading: "leading-[41px]",
  },
  {
    value: "200+",
    label: "contractors served a year",
    cell: "border-l border-hairline/53 pl-4 min-[1100px]:h-[94px] min-[1100px]:w-[197px] min-[1100px]:pl-6",
    valueLeading: "leading-[44px]",
  },
  {
    value: "180+",
    label: "certified field staff",
    cell: "border-l border-hairline/50 pl-4 min-[1100px]:w-[200px] min-[1100px]:pl-6",
    valueLeading: "leading-[44px]",
  },
];

export function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), MAX_WAIT_MS);
    return () => clearTimeout(timer);
  }, []);

  const timing = (delay: number): CSSProperties => ({
    animationDelay: `${delay}ms`,
    animationPlayState: ready ? "running" : "paused",
  });

  const rise = "animate-hero-rise motion-reduce:animate-none";

  return (
    <section className="relative flex flex-1 overflow-hidden bg-ink px-page pt-[150px] pb-10 min-[1100px]:pt-[clamp(130px,calc(100svh-656px),244px)] min-[1100px]:pb-14">
      <Image
        src="/images/hero.jpg"
        alt="Traffic control flagger on site beside a road work zone"
        fill
        priority
        quality={60}
        sizes="100vw"
        onLoad={() => setReady(true)}
        className="animate-hero-image object-cover motion-reduce:animate-none"
        style={timing(0)}
      />
      <div className="absolute inset-0 bg-ink/72" />

      <div className="relative flex w-full flex-col justify-between gap-12 min-[1100px]:pr-1">
        <div className="flex flex-col gap-7">
          <p
            className={`${rise} font-mono text-[13px] leading-4 text-paper/53 uppercase`}
            style={timing(HEADING_DELAYS.eyebrow)}
          >
            Serving Coeur d&apos;Alene ID, Boise ID, Spokane WA and surrounding
            areas
          </p>
          <h1
            className={`${rise} max-w-[615px] text-[40px] leading-[52px] font-medium tracking-[-0.045em] text-canvas min-[1100px]:text-5xl min-[1100px]:leading-[76px]`}
            style={timing(HEADING_DELAYS.title)}
          >
            Traffic control, staffed on time. 100% Guaranteed.
          </h1>
          <div
            className={`${rise} flex flex-col gap-3 pt-2 min-[480px]:flex-row`}
            style={timing(HEADING_DELAYS.buttons)}
          >
            <a
              href={PHONE_HREF}
              className="flex items-center justify-center bg-orange px-3 py-4 font-mono text-xs leading-4 font-medium text-ink uppercase transition-colors duration-200 hover:bg-paper"
            >
              Call {PHONE}
            </a>
            <Link
              href={ESTIMATE_HREF}
              className="flex items-center justify-center border border-paper px-[26px] py-4 font-mono text-xs leading-4 font-medium text-paper uppercase transition-colors duration-200 hover:bg-paper hover:text-ink"
            >
              {ESTIMATE_LABEL}
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-8 min-[1100px]:flex-row min-[1100px]:items-start min-[1100px]:justify-center min-[1100px]:gap-4">
          <div className="grid grid-cols-3 min-[768px]:w-[590px] min-[1100px]:flex min-[1100px]:shrink-0 min-[1100px]:items-stretch">
            {stats.map((stat, index) => (
              <div
                key={stat.value}
                className={`${rise} flex shrink-0 flex-col justify-center gap-1 ${stat.cell}`}
                style={timing(BOTTOM_DELAY + index * BOTTOM_STAGGER)}
              >
                <p
                  className={`text-[29px] font-medium tracking-[-0.03em] text-hairline/71 ${stat.valueLeading}`}
                >
                  {stat.value}
                </p>
                <p className="text-sm leading-[18px] text-hairline/71">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-1 flex-col items-end">
            <p
              className={`${rise} w-full text-sm leading-5 text-hairline/71 min-[768px]:max-w-[500px] max-[1099px]:min-[768px]:self-start`}
              style={timing(BOTTOM_DELAY + stats.length * BOTTOM_STAGGER)}
            >
              With over 2 decades of operating in the Pacific Northwest, we have
              proven to be the most reliable source for quality traffic control.
              Our proprietary systems allows us to keep on our promise of our
              staff being on time, notifying our clients and monitoring the
              activity for each site.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
