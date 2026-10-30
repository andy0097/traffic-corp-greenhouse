"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";

type Card = {
  title: string;
  description: string;
  href: string;
  image?: { src: string; alt: string };
  video?: string;
  photoNote?: string;
};

// People is from Paper. Equipment and Planning reuse the navigation's wording and still need photos.
const tabs: { label: string; cards: Card[] }[] = [
  {
    label: "People",
    cards: [
      {
        title: "Flaggers",
        description:
          "Certified flaggers and traffic control supervisors, booked for a single shift or a full season.",
        href: "/services/certified-flaggers",
        image: {
          src: "/images/service-flaggers.jpg",
          alt: "Flagger holding a stop sign and an orange flag beside a road",
        },
        video: "/images/video-flagger.mp4",
      },
      {
        title: "Pilot cars",
        description:
          "Escorted traffic through one-lane and long work zones, with radio-linked drivers and flaggers.",
        href: "/services/pilot-cars",
        image: {
          src: "/images/service-pilot-cars.jpg",
          alt: "Yellow pilot car truck with a lit message board on its roof",
        },
        video: "/images/video-pilot-car.mp4",
      },
      {
        title: "Lane closures",
        description:
          "Road and lane closures, detours and tapers set up, maintained and torn down to spec.",
        href: "/services/lane-and-road-closures",
        image: {
          src: "/images/service-lane-closures.jpg",
          alt: "Aerial view of a closed highway lane lined with orange barrels",
        },
        video: "/images/video-eagle-eye-trafficmp4.mp4",
      },
    ],
  },
  {
    label: "Equipment",
    cards: [
      {
        title: "Automated flagger devices",
        description: "AFADs that keep flaggers out of the lane.",
        href: "/services/automated-flagger-devices",
        photoNote: "Photo: automated flagger device",
      },
      {
        title: "Temporary traffic signals",
        description: "Portable signals for multi-day closures.",
        href: "/services/temporary-traffic-signals",
        photoNote: "Photo: temporary traffic signal",
      },
      {
        title: "Message boards",
        description: "Programmable boards for advance warning.",
        href: "/services/message-boards",
        photoNote: "Photo: message board",
      },
    ],
  },
  {
    label: "Planning",
    cards: [
      {
        title: "Traffic control plans",
        description: "Plans drawn for your permit and DOT spec.",
        href: "/services/traffic-control-plans",
        photoNote: "Photo: traffic control plan",
      },
      {
        title: "Full work-zone setups",
        description: "Design, install, maintain and tear down.",
        href: "/services/full-work-zone-setups",
        photoNote: "Photo: full work-zone setup",
      },
      {
        title: "Flagger certification classes",
        description: "Get your crew certified with us.",
        href: "/services/flagger-certification-classes",
        photoNote: "Photo: certification class",
      },
    ],
  },
];

/** Shows the card's photo, and plays its video over the photo on hover or keyboard focus. */
function ServiceCard({
  card,
  animationDelay,
}: {
  card: Card;
  animationDelay?: number;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const element = video.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    element.currentTime = 0;
    // Leaving the card before the video starts cancels the play request, which is expected.
    element.play().catch(() => {});
  };

  const stop = () => {
    video.current?.pause();
    setPlaying(false);
  };

  return (
    <Link
      href={card.href}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") play();
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") stop();
      }}
      onFocus={(event) => {
        if (event.currentTarget.matches(":focus-visible")) play();
      }}
      onBlur={stop}
      className={`group relative block h-[440px] overflow-hidden bg-asphalt min-[768px]:last:col-span-2 min-[1100px]:h-[486px] min-[1100px]:last:col-span-1 ${
        animationDelay !== undefined
          ? "animate-hero-rise motion-reduce:animate-none"
          : ""
      }`}
      style={
        animationDelay !== undefined
          ? { animationDelay: `${animationDelay}ms` }
          : undefined
      }
    >
      {card.image ? (
        <>
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none">
            <Image
              src={card.image.src}
              alt={card.image.alt}
              fill
              sizes="(min-width: 1100px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            {card.video && (
              <video
                ref={video}
                src={card.video}
                aria-hidden
                muted
                loop
                playsInline
                preload="none"
                onPlaying={() => setPlaying(true)}
                className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${
                  playing ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </div>
          <div className="absolute inset-0 bg-black/53" />
        </>
      ) : (
        <p className="absolute top-6 left-6 text-[13px] leading-4 text-hairline/71">
          {card.photoNote}
        </p>
      )}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 border-t border-hairline px-6 pt-6 pb-7">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-2xl leading-[30px] font-medium tracking-[-0.02em] text-paper">
            {card.title}
          </h3>
          <span className="shrink-0 font-mono text-sm leading-[18px] text-orange uppercase">
            See more{" "}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none">
              →
            </span>
          </span>
        </div>
        <p className="text-[15px] leading-[23px] text-hairline">
          {card.description}
        </p>
      </div>
    </Link>
  );
}

export function Services() {
  const [selected, setSelected] = useState(0);
  const [hasSwitched, setHasSwitched] = useState(false);
  const tabButtons = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    setSelected(index);
    setHasSwitched(true);
  };

  const onTabKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    const next = (selected + step + tabs.length) % tabs.length;
    select(next);
    tabButtons.current[next]?.focus();
  };

  return (
    <section className="flex flex-col gap-12 px-5 py-24 min-[768px]:py-32 min-[1100px]:px-16 min-[1100px]:py-[241px]">
      <h2 className="max-w-[600px] text-[36px] leading-[44px] font-medium tracking-[-0.04em] text-ink min-[1100px]:text-5xl min-[1100px]:leading-[58px]">
        Full-service traffic solutions for contractors, utility companies and
        state
      </h2>

      <div
        role="tablist"
        aria-label="Service types"
        className="flex w-fit max-w-full gap-1 bg-canvas"
      >
        {tabs.map((tab, index) => {
          const isSelected = index === selected;
          return (
            <button
              key={tab.label}
              ref={(button) => {
                tabButtons.current[index] = button;
              }}
              type="button"
              role="tab"
              id={`service-tab-${index}`}
              aria-selected={isSelected}
              aria-controls="service-cards"
              tabIndex={isSelected ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={onTabKeyDown}
              className={`px-[22px] py-2.5 text-[15px] leading-[18px] transition-colors duration-200 ${
                isSelected
                  ? "bg-ink font-medium text-paper"
                  : "text-ink hover:bg-hairline"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        key={selected}
        id="service-cards"
        role="tabpanel"
        aria-labelledby={`service-tab-${selected}`}
        className="grid gap-4 min-[768px]:grid-cols-2 min-[1100px]:grid-cols-3"
      >
        {tabs[selected].cards.map((card, index) => (
          <ServiceCard
            key={card.href}
            card={card}
            animationDelay={hasSwitched ? index * 70 : undefined}
          />
        ))}
      </div>
    </section>
  );
}
