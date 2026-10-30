// The services people can add to an estimate, in the order the dropdown shows them.
export const serviceGroups = [
  {
    title: "People",
    services: [
      { name: "Certified flaggers", detail: "per person, per day", tag: "per day", unit: ["person", "people"] },
      { name: "Traffic control supervisor", detail: "per person, per day", tag: "per day", unit: ["person", "people"] },
      { name: "Pilot car with driver", detail: "per car, per day", tag: "per day", unit: ["car", "cars"] },
    ],
  },
  {
    title: "Equipment",
    services: [
      { name: "Automated flagger devices", detail: "pair, with operator", tag: "per pair", unit: ["pair", "pairs"] },
      { name: "Temporary traffic signals", detail: "per pair", tag: "per pair", unit: ["pair", "pairs"] },
      { name: "Message boards", detail: "per unit, per day", tag: "per unit", unit: ["unit", "units"] },
      { name: "Signs, cones and barricades", detail: "per setup", tag: "per setup", unit: ["setup", "setups"] },
    ],
  },
  {
    title: "Planning",
    services: [
      { name: "Traffic control plan", detail: "per project", tag: "per project", unit: ["plan", "plans"] },
      { name: "Full work-zone setup", detail: "quoted", tag: "quoted", unit: ["setup", "setups"] },
    ],
  },
];

export const shifts = ["Day shift", "Night shift", "Day and night"];

export type Service = (typeof serviceGroups)[number]["services"][number];

export type OrderRow = {
  id: number;
  service: string | null;
  quantity: number;
  start: Date | null;
  end: Date | null;
};

export function findService(name: string | null) {
  for (const group of serviceGroups) {
    const service = group.services.find((item) => item.name === name);
    if (service) return { service, group: group.title };
  }
  return null;
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatRange(start: Date, end: Date) {
  return `${formatDate(start)} – ${formatDate(end)}`;
}

export function countDays(start: Date, end: Date) {
  return Math.round((end.getTime() - start.getTime()) / 86_400_000) + 1;
}

export function plural(count: number, singular: string, many: string) {
  return `${count} ${count === 1 ? singular : many}`;
}

export function formatQuantity(row: OrderRow) {
  const unit = findService(row.service)?.service.unit ?? ["unit", "units"];
  return plural(row.quantity, unit[0], unit[1]);
}
