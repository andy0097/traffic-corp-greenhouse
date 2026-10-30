import Image from "next/image";
import Link from "next/link";
import { EMAIL, PHONE, PHONE_HREF } from "./nav/navData";

const linkColumns = [
  {
    title: "Services",
    links: [
      { label: "Flagging", href: "/services/certified-flaggers" },
      { label: "Pilot cars", href: "/services/pilot-cars" },
      { label: "Lane closures", href: "/services/lane-and-road-closures" },
      { label: "AFADs", href: "/services/automated-flagger-devices" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Locations", href: "/locations" },
      { label: "Careers", href: "/careers" },
      { label: "Classes", href: "/services/flagger-certification-classes" },
    ],
  },
];

const linkStyle =
  "text-[15px] leading-[18px] text-stone transition-colors duration-200 hover:text-ink motion-reduce:transition-none";
const headingStyle = "text-[13px] leading-4 text-stone";

export function Footer() {
  return (
    <footer className="flex flex-col gap-16 bg-paper px-page pt-[72px] pb-10">
      <div className="flex flex-col gap-12 min-[1100px]:flex-row min-[1100px]:justify-between min-[1100px]:gap-8">
        <div className="flex max-w-[360px] flex-col gap-5">
          <Link href="/" className="flex w-fit items-center gap-2.5">
            <Image src="/logo.png" alt="" width={46} height={45} className="h-[45px] w-[46px]" />
            <span className="font-mono text-[19px] leading-6 font-semibold tracking-[-0.02em] text-ink">
              TrafficCorp
            </span>
          </Link>
          <p className="text-[15px] leading-6 text-stone">
            Safe, staffed work zones across Idaho and Washington since 1999.
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-8 min-[480px]:flex min-[480px]:gap-20"
        >
          {linkColumns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <p className={headingStyle}>{column.title}</p>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href} className="flex">
                    <Link href={link.href} className={linkStyle}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="flex flex-col gap-3 min-[1280px]:w-[341px]">
          <p className={headingStyle}>Contact</p>
          <a href={PHONE_HREF} className={linkStyle}>
            {PHONE}
          </a>
          <a href={`mailto:${EMAIL}`} className={linkStyle}>
            {EMAIL}
          </a>
          <address className="flex flex-col gap-3 text-[15px] leading-[18px] text-stone not-italic">
            <span>5077 N Building Center Dr</span>
            <span>Coeur d&apos;Alene, ID 83815</span>
          </address>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-hairline pt-6 text-[13px] leading-4 text-stone min-[480px]:flex-row min-[480px]:justify-between">
        <p>© 2026 TrafficCorp</p>
        <p>DBE · OMWBE · ATSSA · EEO</p>
      </div>
    </footer>
  );
}
