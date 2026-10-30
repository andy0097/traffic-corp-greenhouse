import { Button } from "./Button";
import { ESTIMATE_HREF, ESTIMATE_LABEL, PHONE, PHONE_HREF, SCHEDULE_HREF } from "./nav/navData";

function PathText({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-mono text-sm leading-[18px] text-orange uppercase">
        {label}
      </p>
      <h2 className="text-[32px] leading-10 font-medium tracking-[-0.035em] text-ink min-[1100px]:text-[40px] min-[1100px]:leading-[48px]">
        {title}
      </h2>
      {/* The same height in both columns keeps the two buttons level. */}
      <p className="text-base leading-[27px] text-pretty text-stone min-[1100px]:min-h-[81px]">
        {description}
      </p>
    </div>
  );
}

export function TwoPaths() {
  return (
    <section className="flex justify-center bg-canvas px-5 py-24 min-[768px]:py-32 min-[1100px]:px-16 min-[1100px]:py-[241px]">
      <div className="flex w-full flex-col gap-16 min-[1100px]:w-auto min-[1100px]:flex-row min-[1100px]:gap-0">
        <div className="flex flex-col items-start gap-[50px] min-[1100px]:w-[481px] min-[1100px]:border-r min-[1100px]:border-hairline min-[1100px]:pr-16">
          <PathText
            label="Quick job"
            title="Need traffic controlled as fast as possible?"
            description="Tell us where and when. You'll have a price within the hour and a crew lined up the same day where we can."
          />
          <Button href={ESTIMATE_HREF} size="large">
            {ESTIMATE_LABEL}
          </Button>
        </div>

        <div className="flex flex-col items-start gap-[50px] border-t border-hairline pt-16 min-[1100px]:w-[481px] min-[1100px]:border-t-0 min-[1100px]:pt-0 min-[1100px]:pl-16">
          <PathText
            label="Complex project"
            title="A project that needs real planning?"
            description="Multi-week closures, DOT specs, night work. Walk through it with someone who has planned hundreds of them."
          />
          <div className="flex flex-col items-start gap-[7px]">
            <Button
              href={SCHEDULE_HREF}
              variant="dark"
              size="large"
              className="text-center max-[480px]:px-4"
            >
              Schedule a call with an expert
            </Button>
            <a
              href={PHONE_HREF}
              className="text-[15px] leading-[18px] text-stone underline decoration-1 [text-underline-position:from-font]"
            >
              or call {PHONE}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
