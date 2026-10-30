"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

// Sites, names and times in the interfaces are sample content.
const features = [
  {
    title: "Notifications",
    description:
      "A text when your crew is dispatched, on site and wrapped, so nobody has to call around.",
    image: {
      src: "/images/background-for-notifications.jpg",
      alt: "TrafficCorp pilot car with a follow-me sign on a highway through green fields",
    },
    Scene: NotificationScene,
  },
  {
    title: "Real-time monitoring",
    description:
      "See every active work zone, crew and device on one map, with shift logs ready for inspectors.",
    image: {
      src: "/images/service-lane-closures.jpg",
      alt: "Aerial view of a forest road with a work zone lined with orange cones",
    },
    Scene: MonitoringScene,
  },
  {
    title: "One account manager",
    description:
      "A single person who knows your projects, your specs and your schedule changes.",
    image: {
      src: "/images/background-for-accountmanager.jpg",
      alt: "Two crew members in orange vests beside a large yellow crane at a railroad crossing",
    },
    Scene: MessageScene,
  },
];

const WIDE = 420;
const COMPACT = 320;

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });
const padFor = (width: number) => (width >= WIDE ? 22 : 16);

export function WorkingWithUs() {
  const [selected, setSelected] = useState(0);
  const [inView, setInView] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  // The list also waits while someone is reading it with a mouse or keyboard.
  const [holding, setHolding] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const { Scene } = features[selected];

  // Hold the animations until the visitor can see them, and pause the timer when they can't.
  useEffect(() => {
    const element = panel.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setOnScreen(entry.isIntersecting);
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="grid gap-y-12 border-t border-hairline px-page py-24 min-[768px]:py-32 min-[1100px]:grid-cols-2 min-[1100px]:grid-rows-[auto_1fr] min-[1100px]:gap-x-16 min-[1100px]:pt-[140px] min-[1100px]:pb-[241px] min-[1280px]:grid-cols-[560px_1fr]">
      <div className="flex flex-col gap-5">
        <p className="font-mono text-sm leading-[18px] text-burnt-orange uppercase">
          How it looks working with us
        </p>
        <h2 className="text-[36px] leading-[44px] font-medium tracking-[-0.04em] text-ink min-[1100px]:text-5xl min-[1100px]:leading-[58px]">
          You run the job. We keep you posted.
        </h2>
      </div>

      <div
        ref={panel}
        className="relative h-[460px] overflow-hidden bg-asphalt min-[768px]:h-[597px] min-[1100px]:col-start-2 min-[1100px]:row-span-2 min-[1100px]:row-start-1 min-[1100px]:h-auto min-[1100px]:min-h-[597px]"
      >
        {features.map((feature, index) => (
          <Image
            key={feature.title}
            src={feature.image.src}
            alt={index === selected ? feature.image.alt : ""}
            fill
            sizes="(min-width: 1100px) 50vw, 100vw"
            className={`object-cover transition-opacity duration-500 ease-out motion-reduce:transition-none ${
              index === selected ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {inView && (
          <div
            key={selected}
            className="fx-scene absolute inset-0 flex items-center justify-center p-3 min-[480px]:p-10"
          >
            <div className="hidden w-full max-w-[420px] min-[480px]:block">
              <Scene width={WIDE} />
            </div>
            <div className="w-full min-[480px]:hidden">
              <Scene width={COMPACT} />
            </div>
          </div>
        )}
      </div>

      <div
        className="flex flex-col"
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHolding(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setHolding(false);
        }}
        onFocus={(event) => {
          if (event.target.matches(":focus-visible")) setHolding(true);
        }}
        onBlur={() => setHolding(false)}
      >
        {features.map((feature, index) => {
          const isSelected = index === selected;
          return (
            <button
              key={feature.title}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelected(index)}
              className="group relative flex gap-6 border-t border-olive-grey py-6 text-left"
            >
              {isSelected && (
                <span
                  aria-hidden
                  className="fx-timer absolute inset-x-0 -top-px h-0.5 bg-orange"
                  style={{
                    animationPlayState:
                      onScreen && !holding ? "running" : "paused",
                  }}
                  onAnimationEnd={() =>
                    setSelected((index + 1) % features.length)
                  }
                />
              )}
              <span className="w-8 shrink-0 pt-1 text-sm leading-[18px] text-stone">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex flex-col gap-1.5">
                <span
                  className={`text-[22px] leading-7 font-semibold tracking-[-0.02em] transition-colors duration-300 motion-reduce:transition-none ${
                    isSelected ? "text-ink" : "text-stone group-hover:text-ink"
                  }`}
                >
                  {feature.title}
                </span>
                <span className="text-base leading-[25px] text-stone">
                  {feature.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function NotificationScene({ width }: { width: number }) {
  const pad = padFor(width);
  const height = 216;
  const slideX = `${width / 2 - (pad + 83)}px`;
  const steps = [
    { label: "Dispatched", time: "6:05 AM", done: true },
    { label: "On site", time: "6:42 AM", done: true },
    { label: "Wrapped", time: "Later today", done: false },
  ];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="A notification that opens to say four flaggers arrived at the US-95 paving site in Coeur d'Alene"
      className="fx-pop block h-auto w-full"
      style={
        { "--fx-pill-x": `${((width - 208) / 2 / width) * 100}%` } as CSSProperties
      }
    >
      <rect width={width} height={height} className="fill-paper" />

      <g className="fx-slide" style={{ "--fx-dx": slideX } as CSSProperties}>
        <circle cx={pad + 18} cy={42} r={18} className="fill-cone-tint" />
        <g
          transform={`translate(${pad + 8} 32) scale(0.83)`}
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-burnt-orange"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </g>
      </g>
      <g
        className="fx-slide"
        style={{ "--fx-dx": slideX, "--fx-dy": "12px" } as CSSProperties}
      >
        <text
          x={pad + 48}
          y={36}
          className="fill-ink text-base font-semibold"
        >
          Flaggers arrived
        </text>
      </g>
      <text
        x={pad + 48}
        y={56}
        className="fx-fade fill-stone text-[13px]"
        style={delay(1500)}
      >
        US-95 paving, Coeur d&apos;Alene
      </text>

      {steps.map((step, index) => {
        const top = 84 + index * 44;
        return (
          <g key={step.label} className="fx-rise" style={delay(1700 + index * 160)}>
            <line x1={0} x2={width} y1={top} y2={top} className="stroke-hairline" />
            {step.done ? (
              <>
                <circle cx={pad + 9} cy={top + 22} r={9} fill="#E2F1E5" />
                <path
                  d={`M${pad + 5} ${top + 22}l3 3 5-6`}
                  fill="none"
                  stroke="#23683A"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            ) : (
              <circle
                cx={pad + 9}
                cy={top + 22}
                r={8.5}
                fill="none"
                className="stroke-hairline"
              />
            )}
            {step.label === "On site" && (
              <circle
                cx={pad + 9}
                cy={top + 22}
                r={9}
                fill="none"
                stroke="#23683A"
                className="fx-pulse"
                style={delay(2400)}
              />
            )}
            <text
              x={pad + 28}
              y={top + 27}
              className={`text-[15px] font-medium ${
                step.done ? "fill-ink" : "fill-stone"
              }`}
            >
              {step.label}
            </text>
            <text
              x={width - pad}
              y={top + 27}
              textAnchor="end"
              className="fill-stone text-[13px]"
            >
              {step.time}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function MonitoringScene({ width }: { width: number }) {
  const pad = padFor(width);
  const headerHeight = 61;
  const rowHeight = 69;
  const height = headerHeight + rowHeight * 3;
  const rows = [
    {
      title: "US-95 paving, Coeur d'Alene",
      detail: "4 flaggers · 2 message boards",
      status: "On site",
      pillWidth: 62,
      pillFill: "#E2F1E5",
      textFill: "#23683A",
    },
    {
      title: "Pole replacement, Spokane",
      detail: "2 flaggers · 1 AFAD",
      status: "En route",
      pillWidth: 70,
      pillFill: "var(--color-cone-tint)",
      textFill: "var(--color-burnt-orange)",
    },
    {
      title: "Fiber trenching, Boise",
      detail: "Pilot car · temporary signals",
      status: "Starts 2 PM",
      pillWidth: 89,
      pillFill: "var(--color-canvas)",
      textFill: "var(--color-stone)",
    },
  ];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Today's work zones: US-95 paving in Coeur d'Alene is on site, pole replacement in Spokane is en route, and fiber trenching in Boise starts at 2 PM"
      className="block h-auto w-full"
    >
      <g className="fx-rise">
        <rect width={width} height={height} rx={4} className="fill-paper" />
        <text x={pad} y={36} className="fill-ink text-base font-semibold">
          Today&apos;s work zones
        </text>
        <text
          x={width - pad}
          y={35}
          textAnchor="end"
          className="fill-stone text-[13px]"
        >
          Tue, May 12
        </text>
      </g>

      {rows.map((row, index) => {
        const top = headerHeight + index * rowHeight;
        const pillX = width - pad - row.pillWidth;
        return (
          <g key={row.title} className="fx-rise" style={delay(250 + index * 180)}>
            <line x1={0} x2={width} y1={top} y2={top} className="stroke-hairline" />
            <text x={pad} y={top + 30} className="fill-ink text-[15px] font-medium">
              {row.title}
            </text>
            <text x={pad} y={top + 49} className="fill-stone text-[13px]">
              {row.detail}
            </text>
            <rect
              x={pillX}
              y={top + 21}
              width={row.pillWidth}
              height={26}
              rx={13}
              fill={row.pillFill}
            />
            {index === 0 && (
              <rect
                x={pillX}
                y={top + 21}
                width={row.pillWidth}
                height={26}
                rx={13}
                fill="none"
                stroke={row.textFill}
                className="fx-pulse"
                style={delay(1200)}
              />
            )}
            <text
              x={pillX + row.pillWidth / 2}
              y={top + 38}
              textAnchor="middle"
              fill={row.textFill}
              className="text-xs font-semibold"
            >
              {row.status}
            </text>
          </g>
        );
      })}

      {/* A crew on the move: a short line travels along the En route row. */}
      <rect
        x={-64}
        y={headerHeight + rowHeight * 2 - 1}
        width={64}
        height={2}
        className="fx-travel fill-burnt-orange"
        style={
          { "--fx-travel": `${width + 64}px`, ...delay(1200) } as CSSProperties
        }
      />
    </svg>
  );
}

function MessageScene({ width }: { width: number }) {
  const pad = padFor(width);
  const height = 203;
  const firstY = 77;
  const replyY = 151;
  const replyWidth = 168;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Your account manager sends a message: Your US-95 shift moved to 7 AM. All 4 flaggers are rebooked. You reply: Thanks, that works."
      className="block h-auto w-full"
    >
      <g className="fx-rise">
        <rect width={width} height={height} rx={4} className="fill-paper" />
        <circle cx={pad + 16} cy={30} r={16} className="fill-asphalt" />
        <text
          x={pad + 16}
          y={34}
          textAnchor="middle"
          className="fill-paper font-mono text-xs font-medium"
        >
          AC
        </text>
        <text x={pad + 42} y={26} className="fill-ink text-[15px] font-medium">
          Your account manager
        </text>
        <text x={pad + 42} y={44} className="fill-stone text-[13px]">
          TrafficCorp
        </text>
        <line x1={0} x2={width} y1={60.5} y2={60.5} className="stroke-hairline" />
      </g>

      <g className="fx-typing" style={delay(400)}>
        <rect x={pad} y={firstY} width={60} height={34} rx={4} className="fill-canvas" />
        {[0, 1, 2].map((dot) => (
          <circle
            key={dot}
            cx={pad + 18 + dot * 12}
            cy={firstY + 17}
            r={3}
            className="fx-dot fill-stone"
            style={delay(dot * 140)}
          />
        ))}
      </g>

      <g className="fx-rise" style={delay(1900)}>
        <rect x={pad} y={firstY} width={270} height={62} rx={4} className="fill-canvas" />
        <text x={pad + 14} y={firstY + 26} className="fill-ink text-[15px]">
          Your US-95 shift moved to 7 AM.
        </text>
        <text x={pad + 14} y={firstY + 47} className="fill-ink text-[15px]">
          All 4 flaggers are rebooked.
        </text>
      </g>

      <g className="fx-rise" style={delay(3300)}>
        <rect
          x={width - pad - replyWidth}
          y={replyY}
          width={replyWidth}
          height={36}
          rx={4}
          className="fill-ink"
        />
        <text
          x={width - pad - replyWidth / 2}
          y={replyY + 23}
          textAnchor="middle"
          className="fill-paper text-[15px]"
        >
          Thanks, that works.
        </text>
      </g>
    </svg>
  );
}
