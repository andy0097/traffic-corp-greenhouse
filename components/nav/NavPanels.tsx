"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ESTIMATE_HREF,
  ESTIMATE_LABEL,
  PHONE,
  PHONE_HREF,
  locations,
  serviceColumns,
  solutions,
  type PanelId,
} from "./navData";

const eyebrow =
  "font-mono text-[13px] leading-4 uppercase text-burnt-orange";

function ServicesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <>
      <div className="flex px-16 pt-10">
        {serviceColumns.map((column) => (
          <div
            key={column.title}
            className="flex flex-1 flex-col gap-1.5 border-r border-hairline px-10 pb-10 first:pl-0 last:border-r-0 last:pr-0"
          >
            <p className={`${eyebrow} pb-2 pl-3.5`}>{column.title}</p>
            {column.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className="group flex flex-col gap-1 px-3.5 py-3 transition-colors duration-150 hover:bg-canvas focus-visible:bg-canvas"
              >
                <span className="text-[17px] leading-[22px] font-medium text-ink">
                  {item.label}{" "}
                  <span className="opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
                    →
                  </span>
                </span>
                <span className="text-sm leading-[18px] text-stone">
                  {item.description}
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-hairline bg-canvas px-16 py-[18px]">
        <p className="text-[15px] leading-[18px] text-stone">
          Not sure what you need? Tell us about the job and we&apos;ll put it
          together.
        </p>
        <Link
          href={ESTIMATE_HREF}
          onClick={onNavigate}
          className="font-mono text-sm leading-[18px] text-ink uppercase underline underline-offset-2"
        >
          {ESTIMATE_LABEL} →
        </Link>
      </div>
    </>
  );
}

/** The left-hand list shared by Solutions and Locations. Pointing at a row changes the detail beside it. */
function SelectList({
  title,
  rows,
  selected,
  onSelect,
  onNavigate,
}: {
  title: string;
  rows: { label: string; href: string; note?: string }[];
  selected: number;
  onSelect: (index: number) => void;
  onNavigate: () => void;
}) {
  return (
    <div className="flex w-80 shrink-0 flex-col gap-1.5 border-r border-hairline pr-12 xl:w-[360px]">
      <p className={`${eyebrow} px-3.5 pb-2`}>{title}</p>
      {rows.map((row, index) => {
        const isSelected = index === selected;
        return (
          <Link
            key={row.href}
            href={row.href}
            onClick={onNavigate}
            onPointerEnter={() => onSelect(index)}
            onFocus={() => onSelect(index)}
            className={`flex items-center justify-between border-l-2 px-3.5 py-4 transition-colors duration-150 ${
              isSelected ? "border-orange bg-canvas" : "border-transparent"
            }`}
          >
            <span className="flex flex-col gap-0.5">
              <span className="text-[17px] leading-[22px] font-medium text-ink">
                {row.label}
              </span>
              {row.note && (
                <span className="text-[13px] leading-4 text-stone">
                  {row.note}
                </span>
              )}
            </span>
            {isSelected && (
              <span className="pl-3 font-mono text-base leading-5 text-ink">
                →
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}

function DetailText({ headline, body }: { headline: string; body: string }) {
  return (
    <div className="flex flex-col gap-3.5">
      <p className="text-[17px] leading-[22px] font-medium text-ink">
        {headline}
      </p>
      <p className="text-base leading-[25px] text-stone">{body}</p>
    </div>
  );
}

function SolutionsPanel({ onNavigate }: { onNavigate: () => void }) {
  const [selected, setSelected] = useState(0);
  const solution = solutions[selected];

  return (
    <div className="flex gap-12 px-16 pt-10 pb-12">
      <SelectList
        title="Who we work with"
        rows={solutions}
        selected={selected}
        onSelect={setSelected}
        onNavigate={onNavigate}
      />
      <div className="flex flex-1 gap-10">
        <div className="flex flex-1 flex-col gap-7">
          <DetailText headline={solution.headline} body={solution.body} />
          <ul className="flex flex-col gap-2.5">
            {solution.points.map((point) => (
              <li key={point} className="text-[15px] leading-[18px] text-ink">
                · {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-[260px] shrink-0 flex-col xl:w-[380px]">
          <div className="flex h-[220px] items-end bg-[#D6D5CF] p-3.5">
            <p className="text-[13px] leading-4 text-stone">{solution.photo}</p>
          </div>
          <Link
            href={ESTIMATE_HREF}
            onClick={onNavigate}
            className="flex items-center justify-between gap-3 bg-orange px-5 py-4 font-mono text-[15px] leading-[18px] text-ink uppercase"
          >
            {ESTIMATE_LABEL}
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function LocationsPanel({ onNavigate }: { onNavigate: () => void }) {
  const [selected, setSelected] = useState(0);
  const location = locations[selected];

  return (
    <div className="flex gap-12 px-16 pt-10 pb-12">
      <SelectList
        title="Where we work"
        rows={locations}
        selected={selected}
        onSelect={setSelected}
        onNavigate={onNavigate}
      />
      <div className="flex flex-1 gap-10">
        <div className="flex flex-1 flex-col gap-7">
          <DetailText headline={location.headline} body={location.body} />
          <dl className="flex flex-col gap-3">
            {location.address && (
              <div className="flex gap-4">
                <dt className="w-20 shrink-0 font-mono text-[13px] leading-4 text-stone uppercase">
                  Address
                </dt>
                <dd className="text-[15px] leading-[18px] text-ink">
                  {location.address}
                </dd>
              </div>
            )}
            <div className="flex gap-4">
              <dt className="w-20 shrink-0 font-mono text-[13px] leading-4 text-stone uppercase">
                Phone
              </dt>
              <dd className="text-[15px] leading-[18px] text-ink">
                <a href={PHONE_HREF}>{PHONE}</a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="flex w-[260px] shrink-0 flex-col xl:w-[380px]">
          <div className="relative h-[220px] xl:h-[291px]">
            <Image
              src={location.image}
              alt={`Aerial view of ${location.label}`}
              fill
              sizes="380px"
              className="object-cover"
              style={{ objectPosition: location.imagePosition }}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <Link
            href="/locations"
            onClick={onNavigate}
            className="flex items-center justify-between gap-3 bg-ink px-5 py-4 font-mono text-[15px] leading-[18px] text-paper uppercase"
          >
            View all locations
            <span className="text-orange">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function NavPanel({
  panel,
  onNavigate,
}: {
  panel: PanelId;
  onNavigate: () => void;
}) {
  if (panel === "services") return <ServicesPanel onNavigate={onNavigate} />;
  if (panel === "solutions") return <SolutionsPanel onNavigate={onNavigate} />;
  return <LocationsPanel onNavigate={onNavigate} />;
}
