"use client";

import Image from "next/image";
import { useState } from "react";

// Only the Poe Asphalt quote is from the design, and its name and job title are still placeholders.
// The other quotes are placeholders until each company supplies its own.
const stories = [
  {
    company: "Poe Asphalt",
    logo: { src: "/logos/poe-asphalt.svg", width: 92, height: 40 },
    quote:
      "We had a paving crew of fifteen and a million dollars of equipment waiting on traffic control. TraffiCorp had flaggers on site before the first truck arrived.",
    name: "Customer name",
    role: "Project manager, prime contractor",
  },
  {
    company: "Knife River",
    logo: { src: "/logos/knife-river.png", width: 55, height: 59, invert: true },
    quote: "Testimonial from Knife River goes here.",
    name: "Customer name",
    role: "Job title, Knife River",
  },
  {
    company: "H&K Contractors",
    logo: { src: "/logos/hk-contractors.png", width: 108, height: 65.5, invert: true },
    quote: "Testimonial from H&K Contractors goes here.",
    name: "Customer name",
    role: "Job title, H&K Contractors",
  },
  {
    company: "Scarsella",
    logo: { src: "/logos/scarsella.png", width: 70, height: 52 },
    quote: "Testimonial from Scarsella goes here.",
    name: "Customer name",
    role: "Job title, Scarsella",
  },
  {
    company: "McMillen",
    logo: { src: "/logos/mcmillen.svg", width: 150, height: 30 },
    quote: "Testimonial from McMillen goes here.",
    name: "Customer name",
    role: "Job title, McMillen",
  },
  {
    company: "Interstate Concrete & Asphalt",
    logo: { src: "/logos/interstate.png", width: 117, height: 48, invert: true },
    quote: "Testimonial from Interstate Concrete & Asphalt goes here.",
    name: "Customer name",
    role: "Job title, Interstate Concrete & Asphalt",
  },
];

export function CustomerStories() {
  const [selected, setSelected] = useState(0);
  const [hasSwitched, setHasSwitched] = useState(false);

  return (
    <section className="flex flex-col items-center gap-12 border-t border-hairline px-5 py-24 min-[768px]:py-32 min-[1100px]:px-16 min-[1100px]:pt-[140px] min-[1100px]:pb-[241px]">
      <div className="flex flex-col items-center gap-5 text-center">
        <p className="font-mono text-sm leading-[18px] text-burnt-orange uppercase">
          Customer stories
        </p>
        <h2 className="max-w-[682px] text-[36px] leading-[44px] font-medium tracking-[-0.04em] text-ink min-[1100px]:text-5xl min-[1100px]:leading-[58px]">
          We serve more than 200 contractors in Pacific Northwest
        </h2>
      </div>

      <div className="flex w-full max-w-[1033px] flex-col border border-canvas bg-hairline min-[1100px]:flex-row">
        <ul className="grid shrink-0 auto-rows-fr grid-cols-[repeat(2,minmax(0,1fr))] min-[640px]:grid-cols-[repeat(3,minmax(0,1fr))] min-[1100px]:w-[560px]">
          {stories.map((story, index) => {
            const isSelected = index === selected;
            return (
              <li key={story.company} className="flex">
                <button
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={`Show the testimonial from ${story.company}`}
                  onClick={() => {
                    setSelected(index);
                    setHasSwitched(true);
                  }}
                  className={`flex min-h-[110px] w-full items-center justify-center transition-colors duration-200 motion-reduce:transition-none min-[640px]:min-h-[140px] ${
                    isSelected ? "bg-paper" : "hover:bg-paper/50"
                  }`}
                >
                  {/* Every logo fits the same box, so its size follows the cell. */}
                  <span className="relative h-[46%] w-[66%]">
                    <Image
                      src={story.logo.src}
                      alt=""
                      fill
                      sizes="200px"
                      className={`object-contain ${story.logo.invert ? "invert" : ""}`}
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Every quote takes up space, so the panel keeps its height when the quote changes. */}
        <div aria-live="polite" className="grid flex-1">
          {stories.map((story, index) => {
            const isSelected = index === selected;
            return (
              <figure
                key={story.company}
                className={`col-start-1 row-start-1 flex flex-col justify-between gap-8 px-6 py-8 min-[768px]:px-12 min-[768px]:py-11 ${
                  isSelected ? "" : "invisible"
                } ${
                  isSelected && hasSwitched
                    ? "animate-hero-rise motion-reduce:animate-none"
                    : ""
                }`}
              >
                <blockquote className="text-[28px] leading-[38px] tracking-[-0.02em] text-ink">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3.5">
                  <div className="size-11 shrink-0 rounded-full bg-[#cfcec8]" />
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[15px] leading-[18px] font-semibold text-ink">
                      {story.name}
                    </p>
                    <p className="text-sm leading-[18px] text-ink">{story.role}</p>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
