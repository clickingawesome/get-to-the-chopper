import BuyButton from "@/components/BuyButton";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Heat from "@/components/Heat";
import RecipeCard from "@/components/RecipeCard";
import { getChapter, getRecipe, heroSrc, pad, recipes, recipesForChapter } from "@/lib/data";
import { AUTHOR, SITE_NAME } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = getRecipe(slug);
  if (!r) return {};
  const description = `${r.tagline} ${r.time}, ${r.serves.toLowerCase()}. A no-cook recipe from ${SITE_NAME} by ${AUTHOR}.`;
  return {
    title: r.title,
    description,
    openGraph: {
      type: "article",
      title: `${r.title} — ${SITE_NAME}`,
      description,
      url: `/recipes/${r.slug}/`,
      siteName: SITE_NAME,
      images: [{ url: `/og/${r.slug}.jpg`, width: 1200, height: 630, alt: `${r.title}: ${r.tagline}` }],
    },
    alternates: { canonical: `/recipes/${r.slug}/` },
  };
}

function Fact({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border-t-2 border-ink pt-2">
      <dt className="eyebrow text-ink-soft">{label}</dt>
      <dd className="mt-1 text-sm font-extrabold uppercase tracking-wide">{value}</dd>
    </div>
  );
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params;
  const r = getRecipe(slug);
  if (!r) notFound();
  const ch = getChapter(r.chapter);
  const more = recipesForChapter(r.chapter).filter((x) => x.slug !== r.slug).slice(0, 3);
  const level = r.level.replace(/ LEVEL$/i, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: r.title,
    author: { "@type": "Person", name: AUTHOR },
    description: r.gist,
    image: heroSrc(r.slug),
    recipeYield: "2 servings",
    recipeCategory: ch.title,
    recipeIngredient: r.lineup,
    recipeInstructions: r.steps.map((s) => ({ "@type": "HowToStep", text: s })),
    isPartOf: { "@type": "Book", name: SITE_NAME, author: { "@type": "Person", name: AUTHOR } },
  };

  return (
    <article style={{ ["--chapter" as string]: ch.color }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* header on chapter colour */}
      <header className="text-white" style={{ background: ch.color }}>
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_minmax(280px,420px)] md:items-end md:py-14">
          <div>
            <p className="stencil text-sm opacity-90">
              <Link href={`/recipes/#ch${ch.number}`} className="hover:underline">
                Chapter {pad(ch.number)} · {ch.title}
              </Link>
            </p>
            <h1 className="display mt-3 text-5xl sm:text-6xl md:text-7xl">{r.title}</h1>
            <p className="hand mt-4 text-2xl leading-tight sm:text-3xl">{r.tagline}</p>
          </div>
          <img
            src={heroSrc(r.slug)}
            alt={r.title}
            width={900}
            height={1200}
            className="w-full border-[3px] border-ink bg-white shadow-paper md:-mb-24"
          />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14">
        <div className="md:max-w-[calc(100%-440px)]">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
            <Fact label="Time" value={r.time} />
            <Fact label="Serves" value={r.serves.replace(/^SERVES /i, "")} />
            <Fact label="Skill" value={level} />
            <Fact label="Tools" value={r.tools} />
            <Fact label="Heat" value={<Heat level={r.heat} />} />
            <Fact label="Protein" value={r.protein ? "Bring your own" : "No cooked protein"} />
          </dl>

          <p className="mt-10 text-lg leading-relaxed text-ink-soft md:text-xl">{r.gist}</p>
        </div>

        {r.move && (
          <aside className="mt-10 max-w-3xl border-2 border-ink bg-white p-5 shadow-paper md:p-6">
            <p className="eyebrow" style={{ color: ch.color }}>
              The move: {r.move_title}
            </p>
            <p className="hand mt-2 text-2xl leading-tight">{r.move}</p>
          </aside>
        )}

        <div className="mt-14 grid gap-12 md:grid-cols-[minmax(260px,1fr)_2fr]">
          <section>
            <h2 className="display text-4xl">The lineup</h2>
            <ul className="mt-5 space-y-2">
              {r.lineup.map((item, i) => (
                <li key={i} className="flex gap-3 border-b border-ink/15 pb-2 font-bold">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rotate-45" style={{ background: ch.color }} aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="display text-4xl">The chop</h2>
            <ol className="steps mt-5 space-y-6">
              {r.steps.map((s, i) => (
                <li key={i} className="text-lg leading-relaxed">
                  {s}
                </li>
              ))}
            </ol>
          </section>
        </div>

        {r.extras.length > 0 && (
          <section className="mt-16">
            <h2 className="display text-4xl">The extras</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {r.extras.map(([label, text]) => (
                <div key={label} className="border-2 border-ink bg-paper-deep p-4">
                  <p className="stencil text-sm" style={{ color: ch.color }}>
                    {label}
                  </p>
                  <p className="mt-2 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-16 border-t-4 border-ink pt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="display text-4xl">More from {ch.title}</h2>
            <Link href="/recipes/" className="text-xs font-extrabold uppercase tracking-[0.2em] underline hover:text-red">
              All recipes
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((x) => (
              <RecipeCard key={x.slug} recipe={x} />
            ))}
          </div>
        </section>

        <p className="mt-14 text-center">
          <BuyButton label="Get the book on Amazon" />
        </p>
      </div>
    </article>
  );
}
