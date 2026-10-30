export const PHONE = "(208) 665-4683";
export const PHONE_HREF = "tel:+12086654683";
export const EMAIL = "info@trafficorp.com";
export const ESTIMATE_HREF = "/estimate";
export const ESTIMATE_LABEL = "Get a same-hour estimate";
export const SCHEDULE_HREF = "/schedule-a-call";

export type PanelId = "services" | "solutions" | "locations";

export const navLinks: { label: string; href: string; panel?: PanelId }[] = [
  { label: "Services", href: "/services", panel: "services" },
  { label: "Solutions", href: "/solutions", panel: "solutions" },
  { label: "Locations", href: "/locations", panel: "locations" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
];

export const serviceColumns = [
  {
    title: "People",
    items: [
      {
        label: "Certified flaggers",
        description: "Flaggers for a single shift or a full season",
        href: "/services/certified-flaggers",
      },
      {
        label: "Traffic control supervisors",
        description: "TCS-certified leads who run the work zone",
        href: "/services/traffic-control-supervisors",
      },
      {
        label: "Pilot cars",
        description: "Escorted traffic through one-lane zones",
        href: "/services/pilot-cars",
      },
      {
        label: "Lane and road closures",
        description: "Closures, detours and tapers set up to spec",
        href: "/services/lane-and-road-closures",
      },
    ],
  },
  {
    title: "Equipment",
    items: [
      {
        label: "Automated flagger devices",
        description: "AFADs that keep flaggers out of the lane",
        href: "/services/automated-flagger-devices",
      },
      {
        label: "Temporary traffic signals",
        description: "Portable signals for multi-day closures",
        href: "/services/temporary-traffic-signals",
      },
      {
        label: "Message boards",
        description: "Programmable boards for advance warning",
        href: "/services/message-boards",
      },
      {
        label: "Signs, cones and barricades",
        description: "MUTCD-compliant devices, set up to spec",
        href: "/services/signs-cones-and-barricades",
      },
    ],
  },
  {
    title: "Consulting",
    items: [
      {
        label: "Traffic control plans",
        description: "Plans drawn for your permit and DOT spec",
        href: "/services/traffic-control-plans",
      },
      {
        label: "Full work-zone setups",
        description: "Design, install, maintain and tear down",
        href: "/services/full-work-zone-setups",
      },
      {
        label: "Flagger certification classes",
        description: "Get your crew certified with us",
        href: "/services/flagger-certification-classes",
      },
    ],
  },
];

// Only Contractors is written in Paper. Utilities and agencies are draft copy to review.
export const solutions = [
  {
    label: "Contractors",
    href: "/solutions/contractors",
    headline: "Keep your paving crew moving.",
    body: "Prime contractors and subs use us for flaggers, closures and full work-zone setups that show up before the first truck does.",
    points: [
      "Crews scheduled around your pour or paving window",
      "DBE participation for public bids",
      "One contact from bid to tear-down",
    ],
    photo: "Photo: paving crew with flaggers",
  },
  {
    label: "Utilities",
    href: "/solutions/utilities",
    headline: "Keep the line work on schedule.",
    body: "Utility crews use us for flaggers, lane closures and pilot cars around pole replacements, fiber trenching and emergency repairs.",
    points: [
      "Work zones set up before your crew arrives",
      "Flaggers for a single shift or a full season",
      "One contact from bid to tear-down",
    ],
    photo: "Photo: utility crew with flaggers",
  },
  {
    label: "Federal and public agencies",
    href: "/solutions/public-agencies",
    headline: "Traffic control built to public spec.",
    body: "Agencies use us for traffic control plans and work-zone setups drawn to DOT spec, with shift logs ready for inspectors.",
    points: [
      "Plans drawn for your permit and DOT spec",
      "MUTCD-compliant devices, set up to spec",
      "DBE, OMWBE, ATSSA and EEO credentials",
    ],
    photo: "Photo: highway work zone",
  },
];

// Only Coeur d'Alene is written in Paper. Boise and Spokane are draft copy to review.
export const locations = [
  {
    label: "Coeur d'Alene, ID",
    note: "Headquarters",
    href: "/locations/coeur-dalene",
    headline: "North Idaho and the I-90 corridor.",
    body: "Our home base since 1999. Crews and equipment stage here for jobs across Kootenai, Bonner and Shoshone counties.",
    address: "5077 N Building Center Dr, Coeur d'Alene, ID 83815",
    image: "/images/location-coeur-dalene.jpg",
    imagePosition: "67% 71%",
  },
  {
    label: "Boise, ID",
    note: "Treasure Valley",
    href: "/locations/boise",
    headline: "I-84 and the Treasure Valley.",
    body: "Our field office for jobs across the Treasure Valley, with crews already close to your site.",
    address: null,
    image: "/images/location-boise.jpg",
    imagePosition: "50% 65%",
  },
  {
    label: "Spokane, WA",
    note: "Spokane County",
    href: "/locations/spokane",
    headline: "I-90 and Spokane Valley.",
    body: "Our field office for jobs across Spokane County, with crews already close to your site.",
    address: null,
    image: "/images/location-spokane.jpg",
    imagePosition: "58% 44%",
  },
];

// Every address the navigation can link to, used by the temporary placeholder page.
export const allNavHrefs = [
  ESTIMATE_HREF,
  SCHEDULE_HREF,
  ...navLinks.map((link) => link.href),
  ...serviceColumns.flatMap((column) => column.items.map((item) => item.href)),
  ...solutions.map((solution) => solution.href),
  ...locations.map((location) => location.href),
];
