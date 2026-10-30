import { notFound } from "next/navigation";
import { allNavHrefs } from "@/components/nav/navData";

// Temporary stand-in so navigation links work until each real page is built.
// A real page, such as app/services/page.tsx, automatically takes over its address.
export default async function PlaceholderPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const href = `/${slug.join("/")}`;

  if (!allNavHrefs.includes(href)) notFound();

  return (
    <main id="main" tabIndex={-1} className="min-h-[150vh] px-page py-28 outline-none">
      <p className="font-mono text-sm leading-[18px] text-burnt-orange uppercase">
        Page coming soon
      </p>
      <h1 className="mt-5 text-5xl leading-[58px] font-medium tracking-[-0.04em] text-ink">
        {href}
      </h1>
    </main>
  );
}
