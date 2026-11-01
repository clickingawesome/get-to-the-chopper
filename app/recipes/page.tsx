import type { Metadata } from "next";
import Link from "next/link";
import RecipeCard from "@/components/RecipeCard";
import { chapters, pad, recipesForChapter } from "@/lib/data";

export const metadata: Metadata = {
  title: "Recipes",
  description: "Every recipe in Get to the Chopper, chapter by chapter, with 30 featured recipes in full. All no-cook. Knife, board, bowl.",
};

export default function RecipesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <p className="eyebrow text-red">The recipes</p>
      <h1 className="display mt-2 text-5xl sm:text-7xl">All 116, chapter by chapter.</h1>
      <p className="hand mt-3 max-w-2xl text-2xl text-ink-soft">
        Thirty are here in full, with photos. The rest are listed so you know what is coming.
      </p>

      <nav className="mt-8 flex flex-wrap gap-2" aria-label="Chapters">
        {chapters.map((ch) => (
          <a
            key={ch.number}
            href={`#ch${ch.number}`}
            className="border-2 border-ink px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white hover:opacity-90"
            style={{ background: ch.color }}
          >
            {pad(ch.number)} {ch.title}
          </a>
        ))}
      </nav>

      {chapters.map((ch) => {
        const featured = recipesForChapter(ch.number);
        const rest = ch.recipes.filter((r) => !r.featured);
        return (
          <section key={ch.number} id={`ch${ch.number}`} className="mt-16 scroll-mt-24">
            <div className="border-l-8 pl-4" style={{ borderColor: ch.color }}>
              <p className="stencil text-sm" style={{ color: ch.color }}>
                Chapter {pad(ch.number)} · {ch.count} recipes
              </p>
              <h2 className="display mt-1 text-4xl sm:text-5xl">{ch.title}</h2>
              <p className="mt-2 max-w-2xl text-lg text-ink-soft">{ch.line}</p>
            </div>

            {featured.length > 0 && (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((r) => (
                  <RecipeCard key={r.slug} recipe={r} />
                ))}
              </div>
            )}

            {rest.length > 0 && (
              <div className="mt-8">
                <p className="eyebrow text-ink-soft">{featured.length ? "Also in this chapter" : "In this chapter"}</p>
                <ul className="mt-3 columns-1 gap-x-8 sm:columns-2 lg:columns-3">
                  {rest.map((r) => (
                    <li key={r.slug} className="break-inside-avoid border-b border-ink/15 py-2 font-bold">
                      {r.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        );
      })}

      <p className="mt-16 text-center">
        <Link href="/chapters/" className="text-sm font-extrabold uppercase tracking-[0.15em] underline hover:text-red">
          See the chapter map
        </Link>
      </p>
    </div>
  );
}
