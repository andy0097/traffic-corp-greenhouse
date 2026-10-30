"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "../Button";
import {
  STRIPE_CLOSE_START,
  STRIPE_CLOSE_TOTAL,
  STRIPE_COUNT,
  STRIPE_DURATION,
  STRIPE_OPEN_TOTAL,
  STRIPE_STAGGER,
} from "../nav/MobileMenu";
import {
  Chevron,
  DateRangePicker,
  QuantityStepper,
  ServicePicker,
  TextField,
  fieldClasses,
  labelClasses,
} from "./EstimateFields";
import {
  countDays,
  formatQuantity,
  formatRange,
  plural,
  shifts,
  type OrderRow,
} from "./estimateData";

const stepNames = ["What you need", "Your details", "Review and send"];
const CONFIRMATION = 3;

const stepIntro = [
  {
    title: "Build your estimate",
    text: "Add the crews and equipment you need. You'll have a confirmed price within the hour.",
  },
  {
    title: "Your details",
    text: "Tell us who to send the estimate to. We'll call or email within the hour to confirm.",
  },
  {
    title: "Review and send",
    text: "Check everything looks right. We'll confirm the final price within the hour.",
  },
];

const nextSteps = [
  "A dispatcher reviews your order and checks crew availability.",
  "You get a confirmed price by email within the hour.",
  "Approve it and your crew is booked. Nothing is charged until then.",
];

const emptyContact = { name: "", company: "", email: "", phone: "", details: "" };

function emptyRow(id: number): OrderRow {
  return { id, service: null, quantity: 1, start: null, end: null };
}

function Stepper({ step, onSelect }: { step: number; onSelect: (step: number) => void }) {
  return (
    <ol className="flex border-b border-hairline">
      {stepNames.map((name, index) => {
        const active = index === step;
        const done = index < step;
        const content = (
          <>
            <span className="font-mono text-[13px] leading-4 text-burnt-orange">
              {done ? "✓" : `0${index + 1}`}
            </span>
            <span
              className={`font-mono text-sm leading-[18px] uppercase ${active ? "text-ink" : "text-stone"} ${
                active ? "" : "max-[767px]:sr-only"
              }`}
            >
              {name}
            </span>
          </>
        );
        const classes = `-mb-px flex w-full items-center gap-2.5 border-b-2 pb-3.5 ${
          active ? "border-ink" : done ? "border-hairline" : "border-transparent"
        }`;
        return (
          <li
            key={name}
            aria-current={active ? "step" : undefined}
            className={`min-[768px]:w-[220px] ${active ? "max-[767px]:flex-1" : "max-[767px]:w-14"}`}
          >
            {done && step !== CONFIRMATION ? (
              <button
                type="button"
                onClick={() => onSelect(index)}
                className={`${classes} cursor-pointer text-left`}
              >
                {content}
              </button>
            ) : (
              <div className={classes}>{content}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

// The same stripes and timing as the mobile menu: they fill from the bottom up, the
// step changes while everything is covered, then they leave from the top down.
function StripeWipe({ covering }: { covering: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-30 flex flex-col">
      {Array.from({ length: STRIPE_COUNT }, (_, index) => (
        <div
          key={index}
          className={`-mb-px flex-1 bg-paper transition-transform ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none ${
            covering ? "origin-left scale-x-100" : "origin-right scale-x-0"
          }`}
          style={{
            transitionDuration: `${STRIPE_DURATION}ms`,
            transitionDelay: covering
              ? `${(STRIPE_COUNT - 1 - index) * STRIPE_STAGGER}ms`
              : `${STRIPE_CLOSE_START + index * STRIPE_STAGGER}ms`,
          }}
        />
      ))}
    </div>
  );
}

function ContinueButton({ children = "Continue" }: { children?: ReactNode }) {
  return (
    <Button type="submit" variant="dark" size="large" className="group gap-2.5">
      {children}
      <span aria-hidden className="text-orange transition-colors duration-200 group-hover:text-ink">
        →
      </span>
    </Button>
  );
}

function BackButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer py-4 font-mono text-base leading-5 text-ink uppercase underline-offset-4 hover:underline"
    >
      ← {label}
    </button>
  );
}

function OrderTable({ rows }: { rows: OrderRow[] }) {
  return (
    <div className="border border-[#CFCEC8] bg-white">
      <div className={`hidden border-b border-[#CFCEC8] bg-canvas px-6 py-3.5 min-[768px]:flex ${labelClasses}`}>
        <span className="flex-1">Service</span>
        <span className="w-[140px] shrink-0">Quantity</span>
        <span className="w-[220px] shrink-0">Dates</span>
      </div>
      {rows.map((row) => (
        <div
          key={row.id}
          className="flex flex-col gap-1 border-b border-hairline px-6 py-5 text-base leading-5 text-ink last:border-b-0 min-[768px]:flex-row min-[768px]:items-center min-[768px]:gap-0"
        >
          <span className="font-medium min-[768px]:flex-1">{row.service}</span>
          <span className="min-[768px]:w-[140px] min-[768px]:shrink-0">{formatQuantity(row)}</span>
          <span className="min-[768px]:w-[220px] min-[768px]:shrink-0">
            {row.start && row.end && formatRange(row.start, row.end)}
          </span>
        </div>
      ))}
    </div>
  );
}

function SummaryCard({
  label,
  title,
  detail,
  onEdit,
}: {
  label: string;
  title: string;
  detail: string;
  onEdit?: () => void;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3.5 bg-canvas p-6">
      <div className="flex justify-between gap-4">
        <p className="font-mono text-[13px] leading-4 text-stone uppercase">{label}</p>
        {onEdit && (
          <button
            type="button"
            aria-label={`Edit ${label.toLowerCase()}`}
            onClick={onEdit}
            className="cursor-pointer font-mono text-[13px] leading-4 text-ink uppercase underline decoration-1 [text-underline-position:from-font]"
          >
            Edit
          </button>
        )}
      </div>
      <div className="flex flex-col gap-1 wrap-anywhere">
        <p className="text-base leading-5 font-medium text-ink">{title}</p>
        <p className="text-[15px] leading-[18px] text-stone">{detail}</p>
      </div>
    </div>
  );
}

export function EstimateConfigurator() {
  // The stepper moves straight away. The content below it waits until the stripes cover it.
  const [step, setStep] = useState(0);
  const [shownStep, setShownStep] = useState(0);
  const [phase, setPhase] = useState<"idle" | "covering" | "revealing">("idle");
  const [showErrors, setShowErrors] = useState(false);

  const [rows, setRows] = useState<OrderRow[]>([emptyRow(1)]);
  const [openRowId, setOpenRowId] = useState<number | null>(null);
  const [site, setSite] = useState("");
  const [shift, setShift] = useState(shifts[0]);
  const [contact, setContact] = useState(emptyContact);
  const [textUpdates, setTextUpdates] = useState(true);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasMounted = useRef(false);

  const showStep = (next: number) => {
    if (shownStep === CONFIRMATION && next === 0) {
      setRows([emptyRow(1)]);
      setSite("");
      setShift(shifts[0]);
      setContact(emptyContact);
      setTextUpdates(true);
    }
    setOpenRowId(null);
    setShownStep(next);
    setShowErrors(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const goTo = (next: number) => {
    if (phase !== "idle") return;
    setStep(next);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showStep(next);
    } else {
      setPhase("covering");
    }
  };

  useEffect(() => {
    if (phase === "idle") return;
    const timer = setTimeout(
      () => {
        if (phase === "covering") {
          showStep(step);
          setPhase("revealing");
        } else {
          setPhase("idle");
        }
      },
      phase === "covering" ? STRIPE_OPEN_TOTAL : STRIPE_CLOSE_TOTAL,
    );
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, step]);

  // Move keyboard and screen reader users to the new step's heading.
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [shownStep]);

  const updateRow = (id: number, change: Partial<OrderRow>) => {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, ...change } : row)));
  };

  const removeRow = (id: number) => {
    setRows((current) =>
      current.length === 1 ? [emptyRow(id)] : current.filter((row) => row.id !== id),
    );
  };

  const addRow = () => {
    const id = Math.max(...rows.map((row) => row.id)) + 1;
    setRows([...rows, emptyRow(id)]);
    setOpenRowId(id);
  };

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim());
  const contactInvalid = {
    name: !contact.name.trim(),
    company: !contact.company.trim(),
    email: !emailValid,
    phone: !contact.phone.trim(),
  };

  const stepValid = [
    rows.every((row) => row.service && row.start && row.end) && !!site.trim(),
    !Object.values(contactInvalid).some(Boolean),
  ];

  // Nothing is sent anywhere yet: finishing the last step only shows the confirmation.
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (shownStep < 2 && !stepValid[shownStep]) {
      setShowErrors(true);
      setTimeout(() => document.querySelector<HTMLElement>("[data-invalid]")?.focus());
      return;
    }
    goTo(shownStep + 1);
  };

  const dated = rows.filter((row) => row.start && row.end);
  const firstDay = dated.length ? new Date(Math.min(...dated.map((row) => row.start!.getTime()))) : null;
  const lastDay = dated.length ? new Date(Math.max(...dated.map((row) => row.end!.getTime()))) : null;
  const siteDetail = firstDay && lastDay ? `${shift} · ${formatRange(firstDay, lastDay)}` : shift;
  const contactTitle = `${contact.name.trim()} · ${contact.company.trim()}`;
  const contactDetail = `${contact.email.trim()} · ${contact.phone.trim()}`;

  const intro =
    shownStep === CONFIRMATION
      ? {
          title: "Request received",
          text: `Thanks, ${contact.name.trim().split(" ")[0]}. A dispatcher will confirm your final price at ${contact.email.trim()} within the hour.`,
        }
      : stepIntro[shownStep];

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <div className="px-5 pt-10 min-[1100px]:px-16 min-[1100px]:pt-[72px]">
        <nav aria-label="Estimate steps">
          <Stepper step={step} onSelect={goTo} />
        </nav>
      </div>

      <div className="relative min-h-[640px]">
        <StripeWipe covering={phase === "covering"} />

        <div
          inert={phase === "covering"}
          className="px-5 pt-8 pb-24 min-[1100px]:px-16 min-[1100px]:pb-[120px]"
        >
          <div className="flex flex-col gap-3.5 pb-10">
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="text-[40px] leading-[48px] font-medium tracking-[-0.035em] text-ink outline-none min-[1100px]:text-[52px] min-[1100px]:leading-14"
            >
              {intro.title}
            </h1>
            <p className="max-w-[660px] text-[17px] leading-[27px] text-stone">{intro.text}</p>
          </div>

          {shownStep === 0 && (
            <form noValidate onSubmit={submit} className="flex flex-col">
              <div className={`hidden grid-cols-[minmax(0,5fr)_150px_minmax(0,3fr)_40px] gap-3 pb-2.5 min-[1100px]:grid ${labelClasses}`}>
                <span>What you need</span>
                <span>Quantity</span>
                <span>Dates</span>
              </div>

              <div className="flex flex-col gap-3">
                {rows.map((row) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-[minmax(0,1fr)_40px] gap-3 border-b border-hairline pb-3 last:border-b-0 last:pb-0 min-[1100px]:grid-cols-[minmax(0,5fr)_150px_minmax(0,3fr)_40px] min-[1100px]:border-b-0 min-[1100px]:pb-0"
                  >
                    <div className="col-span-2 min-[1100px]:col-span-1">
                      <ServicePicker
                        value={row.service}
                        taken={rows.map((item) => item.service)}
                        invalid={showErrors && !row.service}
                        startOpen={openRowId === row.id}
                        onChange={(service) => updateRow(row.id, { service })}
                      />
                    </div>
                    <div className="order-1 min-[1100px]:order-none">
                      <QuantityStepper
                        value={row.quantity}
                        label={row.service ?? "of this service"}
                        onChange={(quantity) => updateRow(row.id, { quantity })}
                      />
                    </div>
                    <div className="col-span-2 min-[1100px]:col-span-1">
                      <DateRangePicker
                        start={row.start}
                        end={row.end}
                        invalid={showErrors && !(row.start && row.end)}
                        onChange={(start, end) => updateRow(row.id, { start, end })}
                      />
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${row.service ?? "this line"}`}
                      onClick={() => removeRow(row.id)}
                      className="order-2 flex h-[60px] w-10 cursor-pointer items-center justify-center text-stone hover:text-ink min-[1100px]:order-none"
                    >
                      <svg aria-hidden width="16" height="16" viewBox="0 0 16 16">
                        <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {showErrors && rows.some((row) => !(row.service && row.start && row.end)) && (
                <p role="alert" className="pt-2.5 text-[13px] leading-4 text-burnt-orange">
                  Choose a service and dates for each line.
                </p>
              )}

              <button
                type="button"
                onClick={addRow}
                className="flex cursor-pointer items-center gap-2.5 self-start pt-[18px] font-mono text-sm leading-[18px] text-ink uppercase"
              >
                <span aria-hidden className="flex size-7 items-center justify-center border border-dashed border-ink font-sans text-base leading-5">
                  +
                </span>
                Add more
              </button>

              <div className="flex flex-col gap-2.5 pt-12">
                <label htmlFor="job-site" className={labelClasses}>
                  Job site
                </label>
                <div className="flex flex-col gap-3 min-[768px]:flex-row">
                  <input
                    id="job-site"
                    required
                    value={site}
                    aria-invalid={showErrors && !site.trim()}
                    data-invalid={(showErrors && !site.trim()) || undefined}
                    onChange={(event) => setSite(event.target.value)}
                    placeholder="Address, highway or mile marker"
                    className={`${fieldClasses(showErrors && !site.trim())} w-full min-w-0 px-[18px] min-[768px]:flex-1`}
                  />
                  <div className="relative min-[768px]:w-60 min-[768px]:shrink-0">
                    <select
                      aria-label="Shift"
                      value={shift}
                      onChange={(event) => setShift(event.target.value)}
                      className={`${fieldClasses()} w-full cursor-pointer appearance-none rounded-none px-[18px]`}
                    >
                      {shifts.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute top-1/2 right-[18px] flex -translate-y-1/2">
                      <Chevron />
                    </span>
                  </div>
                </div>
                {showErrors && !site.trim() && (
                  <p role="alert" className="text-[13px] leading-4 text-burnt-orange">
                    Tell us where the job is.
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-5 pt-14">
                <p className="text-sm leading-[18px] text-stone">Step 1 of 3</p>
                <ContinueButton />
              </div>
            </form>
          )}

          {shownStep === 1 && (
            <div className="flex flex-col items-start gap-12 min-[1100px]:flex-row">
              <form noValidate onSubmit={submit} className="flex w-full min-w-0 flex-1 flex-col">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-5 min-[768px]:flex-row min-[768px]:gap-4">
                    <TextField
                      label="Full name"
                      name="name"
                      autoComplete="name"
                      placeholder="Your name"
                      value={contact.name}
                      invalid={showErrors && contactInvalid.name}
                      error="Add your name."
                      onChange={(name) => setContact({ ...contact, name })}
                    />
                    <TextField
                      label="Company"
                      name="company"
                      autoComplete="organization"
                      placeholder="Company name"
                      value={contact.company}
                      invalid={showErrors && contactInvalid.company}
                      error="Add your company."
                      onChange={(company) => setContact({ ...contact, company })}
                    />
                  </div>
                  <div className="flex flex-col gap-5 min-[768px]:flex-row min-[768px]:gap-4">
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={contact.email}
                      invalid={showErrors && contactInvalid.email}
                      error="Add a valid email address."
                      onChange={(email) => setContact({ ...contact, email })}
                    />
                    <TextField
                      label="Phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="(208) 555-0142"
                      value={contact.phone}
                      invalid={showErrors && contactInvalid.phone}
                      error="Add your phone number."
                      onChange={(phone) => setContact({ ...contact, phone })}
                    />
                  </div>
                  <label className="flex flex-col gap-2.5">
                    <span className="flex justify-between">
                      <span className={labelClasses}>Other details</span>
                      <span className={labelClasses}>Optional</span>
                    </span>
                    <textarea
                      value={contact.details}
                      onChange={(event) => setContact({ ...contact, details: event.target.value })}
                      placeholder="Permit numbers, DOT spec, night work, site access or anything else we should know"
                      className={`${fieldClasses()} h-[140px] w-full resize-y p-[18px] leading-[25px]`}
                    />
                  </label>
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={textUpdates}
                      onChange={(event) => setTextUpdates(event.target.checked)}
                      className="peer sr-only"
                    />
                    <span className="flex size-5 shrink-0 items-center justify-center border border-ink peer-checked:bg-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange">
                      {textUpdates && (
                        <svg aria-hidden width="12" height="12" viewBox="0 0 12 12">
                          <path d="M2.5 6.2l2.3 2.3 4.7-5" fill="none" stroke="var(--color-paper)" strokeWidth="1.6" />
                        </svg>
                      )}
                    </span>
                    <span className="text-[15px] leading-[18px] text-ink">
                      Text me updates when my crew is dispatched and on site
                    </span>
                  </label>
                </div>
                <div className="flex items-center justify-between gap-5 pt-14">
                  <BackButton label="Back" onClick={() => goTo(0)} />
                  <ContinueButton />
                </div>
              </form>

              <aside className="flex w-full flex-col bg-canvas min-[1100px]:w-[400px] min-[1100px]:shrink-0">
                <div className="flex items-center justify-between border-b border-hairline px-7 py-[22px]">
                  <p className="font-mono text-[13px] leading-4 text-stone uppercase">Your estimate</p>
                  <p className="font-mono text-xs leading-4 text-stone uppercase">
                    {plural(rows.length, "item", "items")}
                  </p>
                </div>
                <div className="flex flex-col px-7 py-2">
                  {rows.map((row) => (
                    <div key={row.id} className="flex flex-col gap-[3px] border-b border-hairline py-4">
                      <p className="text-[15px] leading-[18px] font-medium text-ink">{row.service}</p>
                      <p className="text-[13px] leading-4 text-stone">
                        {formatQuantity(row)}
                        {row.start && row.end && ` · ${plural(countDays(row.start, row.end), "day", "days")}`}
                      </p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          )}

          {shownStep === 2 && (
            <form noValidate onSubmit={submit} className="flex flex-col">
              <OrderTable rows={rows} />
              <div className="flex flex-col gap-4 pt-6 min-[768px]:flex-row">
                <SummaryCard label="Job site" title={site.trim()} detail={siteDetail} onEdit={() => goTo(0)} />
                <SummaryCard label="Contact" title={contactTitle} detail={contactDetail} onEdit={() => goTo(1)} />
              </div>
              <div className="flex flex-col gap-6 pt-10 min-[1100px]:flex-row min-[1100px]:gap-10">
                <p className={`${labelClasses} min-[1100px]:w-40 min-[1100px]:shrink-0`}>What happens next</p>
                <ol className="flex flex-1 flex-col gap-6 min-[768px]:flex-row">
                  {nextSteps.map((text, index) => (
                    <li key={text} className="flex flex-1 flex-col gap-1.5">
                      <span className="font-mono text-[13px] leading-4 text-burnt-orange">0{index + 1}</span>
                      <span className="text-[15px] leading-[23px] text-ink">{text}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-5 pt-14">
                <BackButton label="Edit order" onClick={() => goTo(0)} />
                <Button type="submit" size="large" className="gap-2.5">
                  Send for estimate <span aria-hidden>→</span>
                </Button>
              </div>
            </form>
          )}

          {shownStep === CONFIRMATION && (
            <div className="flex flex-col">
              <OrderTable rows={rows} />
              <div className="flex flex-col gap-4 pt-6 min-[768px]:flex-row">
                <SummaryCard label="Job site" title={site.trim()} detail={siteDetail} />
                <SummaryCard label="Contact" title={contactTitle} detail={contactDetail} />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-5 pt-14">
                <BackButton label="Start another estimate" onClick={() => goTo(0)} />
                <Button href="/" variant="dark" size="large">
                  Back to homepage
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
