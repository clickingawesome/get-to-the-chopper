import type { Metadata } from "next";
import Link from "next/link";
import { chapters, openerSrc, pad } from "@/lib/data";

const description = "The ten chapters of Get to the Chopper: chopped sandwiches, the classics, the deli case, around the world, bring your own protein and carbs, slaws and pickles, salsas and dips, the dressing room, and sweet chops.";

export const metadata: Metadata = {
  title: "Chapters",
  description,
  alternates: { canonical: "/chapters/" },
  openGraph: {
    type: "website",
    siteName: "Get to the Chopper",
    title: "Chapters — Get to the Chopper",
    description,
    url: "/chapters/",
    images: [{ url: "/og/site.jpg", width: 1200, height: 630, alt: "Get to the Chopper by Nick Irmo" }],
  },
};

export default function ChaptersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <p className="eyebrow text-red">The chapter map</p>
      <h1 className="display mt-2 text-5xl sm:text-7xl">Ten chapters. One method.</h1>
      <p className="hand mt-3 max-w-2xl text-2xl text-ink-soft">
        Sandwiches first, because that is where the chop started. Dressings near the end, because they run the whole book.
      </p>

      <div className="mt-12 space-y-10">
        {chapters.map((ch, i) => (
          <article
            key={ch.number}
            className={`grid items-stretch gap-0 border-2 border-ink bg-white shadow-paper md:min-h-[340px] ${
              i % 2 ? "md:grid-cols-[1fr_300px]" : "md:grid-cols-[300px_1fr]"
            }`}
          >
            <img
              src={openerSrc(ch.number)}
              alt={`Chapter ${ch.number} opener art`}
              loading="lazy"
              width={675}
              height={900}
              className={`aspect-[3/4] w-full object-cover object-top md:aspect-auto md:h-full ${i % 2 ? "md:order-2" : ""}`}
            />
            <div className="p-6 md:p-8 md:self-center">
              <span
                className="stencil inline-block border-2 border-ink px-3 py-1 text-sm text-white"
                style={{ background: ch.color }}
              >
                Chapter {pad(ch.number)}
              </span>
              <h2 className="display mt-3 text-4xl sm:text-5xl">{ch.title}</h2>
              <p className="hand mt-2 text-2xl leading-tight text-ink-soft">{ch.line}</p>
              {ch.intro[0] && (
                <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">{ch.intro[0].replace(/\*\*/g, "")}</p>
              )}
              <p className="mt-5 flex flex-wrap items-center gap-4">
                <span className="text-xs font-extrabold uppercase tracking-[0.2em]" style={{ color: ch.color }}>
                  {ch.count} recipes
                </span>
                <Link
                  href={`/recipes/#ch${ch.number}`}
                  className="text-xs font-extrabold uppercase tracking-[0.2em] underline hover:text-red"
                >
                  See the list
                </Link>
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
