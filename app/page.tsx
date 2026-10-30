import { CustomerStories } from "@/components/CustomerStories";
import { Hero } from "@/components/Hero";
import { JoinOurTeam } from "@/components/JoinOurTeam";
import { Locations } from "@/components/Locations";
import { Reveal } from "@/components/Reveal";
import { Services } from "@/components/Services";
import { TrustedBy } from "@/components/TrustedBy";
import { TwoPaths } from "@/components/TwoPaths";
import { WorkingWithUs } from "@/components/WorkingWithUs";

export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      {/* Together the hero and the logo bar fill the first screen. */}
      <div className="flex min-h-svh flex-col">
        <Hero />
        <Reveal>
          <TrustedBy />
        </Reveal>
      </div>
      <Reveal>
        <Services />
      </Reveal>
      <Reveal>
        <WorkingWithUs />
      </Reveal>
      <Reveal>
        <CustomerStories />
      </Reveal>
      <Reveal>
        <TwoPaths />
      </Reveal>
      <Reveal>
        <Locations />
      </Reveal>
      <Reveal>
        <JoinOurTeam />
      </Reveal>
    </main>
  );
}
