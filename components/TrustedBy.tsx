import Image from "next/image";

const logos = [
  { name: "Poe Asphalt", src: "/logos/poe-asphalt.svg", width: 92, height: 40 },
  { name: "Knife River", src: "/logos/knife-river.png", width: 55, height: 59, invert: true },
  { name: "H&K Contractors", src: "/logos/hk-contractors.png", width: 108, height: 66, invert: true },
  { name: "Scarsella", src: "/logos/scarsella.png", width: 70, height: 52 },
  { name: "McMillen", src: "/logos/mcmillen.svg", width: 200, height: 40 },
  { name: "Interstate Concrete & Asphalt", src: "/logos/interstate.png", width: 117, height: 48, invert: true },
  { name: "Western Construction", src: "/logos/western-construction.svg", width: 180, height: 30 },
];

export function TrustedBy() {
  return (
    <section className="flex flex-col gap-6 border-y border-hairline px-page py-8 xl:h-[114px] xl:flex-row xl:items-center xl:justify-between">
      <p className="w-[180px] shrink-0 text-[13px] leading-4 text-stone">
        Trusted by utilities, prime contractors and public agencies
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 xl:contents">
        {logos.map((logo) => (
          <Image
            key={logo.name}
            src={logo.src}
            alt={logo.name}
            width={logo.width}
            height={logo.height}
            className={`shrink-0 object-cover ${logo.invert ? "invert" : ""}`}
            style={{ width: logo.width, height: logo.height }}
          />
        ))}
      </div>
    </section>
  );
}
