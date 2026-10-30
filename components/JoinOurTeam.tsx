import { Button } from "./Button";

const APPLY_HREF = "https://trafficorp.bamboohr.com/careers";

// The same video and player settings as the current trafficorp.com homepage.
const VIDEO_SRC =
  "https://player.vimeo.com/video/442513691?color=f7941d&title=0&byline=0&portrait=0";

const jobs = [
  { role: "Crew member / flagger", location: "All locations" },
  { role: "Crew leader", location: "Coeur d'Alene, Spokane" },
  { role: "Traffic control supervisor", location: "Boise" },
];

export function JoinOurTeam() {
  return (
    <section className="flex flex-col gap-16 bg-asphalt px-5 py-24 min-[1100px]:flex-row min-[1100px]:items-center min-[1100px]:px-16 min-[1100px]:py-[120px]">
      <div className="flex flex-col gap-10 min-[1100px]:min-h-[520px] min-[1100px]:w-[520px] min-[1100px]:shrink-0 min-[1100px]:justify-between">
        <div className="flex flex-col gap-5">
          <p className="font-mono text-sm leading-[18px] text-orange uppercase">
            Careers
          </p>
          <h2 className="text-[40px] leading-[48px] font-semibold tracking-[-0.04em] text-paper min-[1100px]:text-[56px] min-[1100px]:leading-[58px]">
            Join our team
          </h2>
          <p className="text-[17px] leading-[27px] text-hairline">
            Solid wages, a solid team and a real path from crew member to
            traffic control supervisor. No experience needed. We train and
            certify you.
          </p>
        </div>

        <ul className="border-b border-hairline">
          {jobs.map((job) => (
            <li
              key={job.role}
              className="flex justify-between gap-4 border-t border-hairline py-4 text-base leading-5"
            >
              <span className="text-paper">{job.role}</span>
              <span className="text-right text-[#B4B3AC]">{job.location}</span>
            </li>
          ))}
        </ul>

        <Button
          href={APPLY_HREF}
          variant="light"
          size="large"
          className="self-start"
        >
          Apply now
        </Button>
      </div>

      {/* The video keeps its own shape, so nothing is cropped and no black bars appear. */}
      <div className="aspect-video w-full min-[1100px]:min-w-0 min-[1100px]:flex-1">
        <iframe
          src={VIDEO_SRC}
          title="TraffiCorp career opportunities"
          allow="autoplay; fullscreen; picture-in-picture"
          loading="lazy"
          className="h-full w-full"
        />
      </div>
    </section>
  );
}
