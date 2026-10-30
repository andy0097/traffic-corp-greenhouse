import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { AgentationProvider } from "@/components/AgentationProvider";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/nav/Navbar";

export const metadata: Metadata = {
  title: {
    default: "TrafficCorp: traffic control, staffed on time",
    template: "%s | TrafficCorp",
  },
  description:
    "Certified flaggers, pilot cars, lane closures and traffic control plans across Idaho and Washington since 1999.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        {/* Without JavaScript nothing would trigger the section animations, so show the content. */}
        <noscript>
          <style>{`.reveal > section > *, .reveal > section > .xl\\:contents > * { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only bg-ink px-5 py-3 font-mono text-sm leading-[18px] text-paper uppercase focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60]"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
        <AgentationProvider />
      </body>
    </html>
  );
}
