import Image from "next/image";
import Link from "next/link";

// Position and zoom match how each aerial photo is cropped in Paper. The wide photos
// fill the card's height, so they display about 960px wide at every screen size.
const locations = [
  {
    city: "Coeur d'Alene, ID",
    detail: "Headquarters · 5077 N Building Center Dr",
    area: "I-90 and US-95 corridor",
    href: "/locations/coeur-dalene",
    image: "/images/location-coeur-dalene.jpg",
    position: "67.35% 70.79%",
    zoom: 1.11,
  },
  {
    city: "Boise, ID",
    detail: "Field office · Treasure Valley",
    area: "I-84 and the Treasure Valley",
    href: "/locations/boise",
    image: "/images/location-boise.jpg",
    position: "49.99% 64.74%",
    zoom: 1.125,
  },
  {
    city: "Spokane, WA",
    detail: "Field office · Spokane County",
    area: "I-90 and Spokane Valley",
    href: "/locations/spokane",
    image: "/images/location-spokane.jpg",
    position: "57.69% 43.71%",
    zoom: 1.21,
  },
];

export function Locations() {
  return (
    <section className="flex flex-col gap-12 px-5 py-24 min-[768px]:py-28 min-[1100px]:px-16">
      <div className="flex flex-col gap-5">
        <p className="font-mono text-sm leading-[18px] text-burnt-orange uppercase">
          Locations
        </p>
        <h2 className="max-w-[636px] text-[36px] leading-[44px] font-medium tracking-[-0.04em] text-ink min-[1100px]:text-5xl min-[1100px]:leading-[58px]">
          Crews based in Coeur d&apos;Alene, Boise and Spokane, so they&apos;re
          already close to your job.
        </h2>
      </div>

      <div className="grid gap-4 min-[768px]:grid-cols-2 min-[1100px]:grid-cols-3">
        {locations.map((location) => (
          <Link
            key={location.href}
            href={location.href}
            className="group relative block h-[427px] overflow-hidden bg-asphalt min-[768px]:last:col-span-2 min-[1100px]:last:col-span-1"
          >
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none">
              <Image
                src={location.image}
                alt={`Aerial view of ${location.city}`}
                fill
                sizes="960px"
                className="object-cover"
                style={{
                  objectPosition: location.position,
                  transform: `scale(${location.zoom})`,
                  transformOrigin: location.position,
                }}
              />
            </div>
            <div className="absolute inset-0 bg-black/53" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 border-t border-hairline px-6 pt-6 pb-7">
              <h3 className="text-2xl leading-[30px] font-medium tracking-[-0.02em] text-paper">
                {location.city}
              </h3>
              <p className="text-[15px] leading-[23px] text-hairline">
                {location.detail}
              </p>
              <p className="pt-1.5 text-sm leading-[18px] font-medium text-orange">
                {location.area}{" "}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none">
                  →
                </span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
