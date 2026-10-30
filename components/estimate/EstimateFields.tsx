"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { countDays, findService, formatDate, formatRange, serviceGroups } from "./estimateData";

export function fieldClasses(invalid = false) {
  return `h-[60px] border bg-white text-base leading-5 text-ink outline-orange placeholder:text-stone focus:border-orange focus:outline focus:outline-[0.5px] focus:-outline-offset-1 ${
    invalid ? "border-burnt-orange" : "border-[#CFCEC8]"
  }`;
}

export const labelClasses = "font-mono text-[13px] leading-4 text-stone uppercase";

export function Chevron({ up = false }: { up?: boolean }) {
  return (
    <svg
      aria-hidden
      width="14"
      height="14"
      viewBox="0 0 14 14"
      className={`shrink-0 ${up ? "rotate-180" : ""}`}
    >
      <path d="M3 5l4 4 4-4" fill="none" stroke="var(--color-ink)" strokeWidth="1.5" />
    </svg>
  );
}

// Closes a dropdown when someone presses outside it or presses Escape.
function usePopover(startOpen = false) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return { open, setOpen, ref };
}

export function ServicePicker({
  value,
  taken,
  invalid,
  startOpen,
  onChange,
}: {
  value: string | null;
  taken: (string | null)[];
  invalid: boolean;
  startOpen: boolean;
  onChange: (name: string) => void;
}) {
  const { open, setOpen, ref } = usePopover(startOpen);
  const [search, setSearch] = useState("");
  const selected = findService(value);
  const query = search.trim().toLowerCase();

  const groups = serviceGroups
    .map((group) => ({
      ...group,
      services: group.services.filter((service) => service.name.toLowerCase().includes(query)),
    }))
    .filter((group) => group.services.length > 0);

  const choose = (name: string) => {
    onChange(name);
    setSearch("");
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative min-w-0">
      <button
        type="button"
        aria-expanded={open}
        aria-label={value ? `Service: ${value}` : "Choose a service"}
        data-invalid={invalid || undefined}
        onClick={() => setOpen(!open)}
        className={`${fieldClasses(invalid)} flex w-full cursor-pointer items-center justify-between gap-3 px-[18px] text-left ${
          open ? "border-orange outline outline-[0.5px] -outline-offset-1" : ""
        }`}
      >
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className={`truncate font-medium ${selected ? "text-ink" : "text-stone"}`}>
            {value ?? "Choose a service"}
          </span>
          <span className="truncate text-xs leading-4 text-stone">
            {selected
              ? `${selected.group} · ${selected.service.detail}`
              : "People, equipment or planning"}
          </span>
        </span>
        <Chevron up={open} />
      </button>

      {open && (
        <div className="absolute top-16 left-0 z-20 flex max-h-[440px] w-[460px] max-w-full flex-col border border-[#CFCEC8] bg-white min-[1100px]:max-w-none">
          <label className="flex items-center gap-2.5 border-b border-hairline px-4 py-3.5">
            <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" className="shrink-0">
              <circle cx="6" cy="6" r="4.5" fill="none" stroke="var(--color-stone)" strokeWidth="1.4" />
              <path d="M9.5 9.5L13 13" stroke="var(--color-stone)" strokeWidth="1.4" />
            </svg>
            <span className="sr-only">Search services</span>
            <input
              autoFocus
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key !== "Enter") return;
                event.preventDefault();
                const first = groups
                  .flatMap((group) => group.services)
                  .find((service) => service.name === value || !taken.includes(service.name));
                if (first) choose(first.name);
              }}
              placeholder="Search services"
              className="w-full bg-transparent text-[15px] leading-[18px] text-ink outline-none placeholder:text-stone"
            />
          </label>

          <div className="overflow-y-auto">
            {groups.length === 0 && (
              <p className="px-4 py-4 text-[15px] leading-[18px] text-stone">
                No services match that search.
              </p>
            )}
            {groups.map((group, index) => (
              <div key={group.title} className={`py-2 ${index > 0 ? "border-t border-hairline" : ""}`}>
                <p className="px-4 py-2 font-mono text-xs leading-4 text-stone uppercase">
                  {group.title}
                </p>
                {group.services.map((service) => {
                  const added = service.name !== value && taken.includes(service.name);
                  return (
                    <button
                      key={service.name}
                      type="button"
                      disabled={added}
                      onClick={() => choose(service.name)}
                      className={`group flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left text-[15px] leading-[18px] ${
                        added
                          ? "text-stone"
                          : "cursor-pointer text-ink outline-none hover:bg-cone-tint hover:font-medium focus-visible:bg-cone-tint focus-visible:font-medium"
                      }`}
                    >
                      {service.name}
                      <span
                        className={`shrink-0 font-mono text-xs leading-4 font-normal uppercase ${
                          added
                            ? "text-stone"
                            : "text-stone group-hover:text-burnt-orange group-focus-visible:text-burnt-orange"
                        }`}
                      >
                        {added ? "Added" : service.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function QuantityStepper({
  value,
  label,
  onChange,
}: {
  value: number;
  label: string;
  onChange: (value: number) => void;
}) {
  const stepButton = (text: string, name: string, next: number, disabled: boolean, side: string): ReactNode => (
    <button
      type="button"
      aria-label={`${name} ${label}`}
      disabled={disabled}
      onClick={() => onChange(next)}
      className={`flex h-full w-11 shrink-0 items-center justify-center border-hairline text-xl leading-6 ${side} ${
        disabled ? "text-stone/50" : "cursor-pointer text-ink hover:bg-canvas"
      }`}
    >
      {text}
    </button>
  );

  return (
    <div className="flex h-[60px] w-[150px] items-center justify-between border border-[#CFCEC8] bg-white">
      {stepButton("−", "Fewer", value - 1, value <= 1, "border-r")}
      <span aria-live="polite" className="font-mono text-[17px] leading-[22px] text-ink">
        {value}
      </span>
      {stepButton("+", "More", value + 1, value >= 99, "border-l")}
    </div>
  );
}

function sameDay(a: Date | null, b: Date | null) {
  return !!a && !!b && a.getTime() === b.getTime();
}

export function DateRangePicker({
  start,
  end,
  invalid,
  onChange,
}: {
  start: Date | null;
  end: Date | null;
  invalid: boolean;
  onChange: (start: Date | null, end: Date | null) => void;
}) {
  const { open, setOpen, ref } = usePopover();
  // Set when the calendar opens, so it always starts on a current month.
  const [today, setToday] = useState<Date | null>(null);
  const [month, setMonth] = useState<Date | null>(null);

  const toggle = () => {
    if (!open) {
      const now = new Date();
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const shown = start ?? midnight;
      setToday(midnight);
      setMonth(new Date(shown.getFullYear(), shown.getMonth(), 1));
    }
    setOpen(!open);
  };

  const pick = (day: Date) => {
    if (!start || end || day < start) {
      onChange(day, null);
    } else {
      onChange(start, day);
      setOpen(false);
    }
  };

  const days: (Date | null)[] = [];
  if (month) {
    for (let blank = 0; blank < month.getDay(); blank++) days.push(null);
    const length = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    for (let day = 1; day <= length; day++) {
      days.push(new Date(month.getFullYear(), month.getMonth(), day));
    }
  }

  const onFirstMonth =
    !!month && !!today && month.getFullYear() === today.getFullYear() && month.getMonth() === today.getMonth();

  const changeMonth = (by: number) => {
    if (month) setMonth(new Date(month.getFullYear(), month.getMonth() + by, 1));
  };

  return (
    <div ref={ref} className="relative min-w-0">
      <button
        type="button"
        aria-expanded={open}
        aria-label={start && end ? `Dates: ${formatRange(start, end)}` : "Select dates"}
        data-invalid={invalid || undefined}
        onClick={toggle}
        className={`${fieldClasses(invalid)} flex w-full cursor-pointer items-center justify-between gap-3 px-[18px] text-left ${
          open ? "border-orange outline outline-[0.5px] -outline-offset-1" : ""
        }`}
      >
        <span className={`truncate ${start ? "text-ink" : "text-stone"}`}>
          {start && end
            ? formatRange(start, end)
            : start
              ? `${formatDate(start)} – pick end`
              : "Select dates"}
        </span>
        {start && end && (
          <span className="shrink-0 font-mono text-xs leading-4 text-stone uppercase">
            {countDays(start, end)} {countDays(start, end) === 1 ? "day" : "days"}
          </span>
        )}
      </button>

      {open && month && (
        <div className="absolute top-16 left-0 z-20 w-[320px] max-w-full border border-[#CFCEC8] bg-white p-4 min-[1100px]:right-0 min-[1100px]:left-auto">
          <div className="flex items-center justify-between pb-3">
            <button
              type="button"
              aria-label="Previous month"
              disabled={onFirstMonth}
              onClick={() => changeMonth(-1)}
              className={`size-9 ${onFirstMonth ? "text-stone/50" : "cursor-pointer text-ink hover:bg-canvas"}`}
            >
              ←
            </button>
            <p aria-live="polite" className="text-[15px] leading-[18px] font-medium text-ink">
              {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => changeMonth(1)}
              className="size-9 cursor-pointer text-ink hover:bg-canvas"
            >
              →
            </button>
          </div>

          <div className="grid grid-cols-7 text-center">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <span key={index} aria-hidden className="pb-2 font-mono text-xs leading-4 text-stone">
                {day}
              </span>
            ))}
            {days.map((day, index) => {
              if (!day) return <span key={`blank-${index}`} />;
              const past = !!today && day < today;
              const edge = sameDay(day, start) || sameDay(day, end);
              const between = !!start && !!end && day > start && day < end;
              return (
                <button
                  key={day.getTime()}
                  type="button"
                  disabled={past}
                  aria-label={day.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                  aria-pressed={edge || between}
                  onClick={() => pick(day)}
                  className={`h-10 text-sm leading-[18px] ${
                    past
                      ? "text-stone/50"
                      : edge
                        ? "cursor-pointer bg-ink text-paper"
                        : between
                          ? "cursor-pointer bg-cone-tint text-ink"
                          : "cursor-pointer text-ink hover:bg-canvas"
                  }`}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function TextField({
  label,
  value,
  invalid,
  error,
  onChange,
  ...input
}: {
  label: string;
  value: string;
  invalid: boolean;
  error: string;
  onChange: (value: string) => void;
  name: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-2.5">
      <span className={labelClasses}>{label}</span>
      <input
        {...input}
        required
        value={value}
        aria-invalid={invalid}
        data-invalid={invalid || undefined}
        onChange={(event) => onChange(event.target.value)}
        className={`${fieldClasses(invalid)} w-full px-[18px]`}
      />
      {invalid && <span role="alert" className="text-[13px] leading-4 text-burnt-orange">{error}</span>}
    </label>
  );
}
