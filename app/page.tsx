import Link from "next/link";
import RecipeCard from "@/components/RecipeCard";
import ChapterTile from "@/components/ChapterTile";
import { chapters, homeRecipes, stills } from "@/lib/data";
import { AUTHOR, TAGLINE } from "@/lib/site";

const steps = [
  {
    n: "01",
    title: "Chop",
    text: "Pile everything on the board, sandwich fillings, salad, the lot, and run the knife through it until every piece is about the same size.",
  },
  {
    n: "02",
    title: "Bowl",
    text: "Whisk the dressing in the bottom of the bowl first. Scrape the pile in and toss until everything is coated.",
  },
  {
    n: "03",
    title: "Eat",
    text: "Pack it in a roll, scoop it with chips, or eat it straight from the bowl. Every bite gets everything. Nothing ever touches a stove.",
  },
];

const promises = [
  ["No heat", "Nothing in the book is ever cooked. Not a pan, not a toaster, not a microwave."],
  ["Three tools", "A knife, a cutting board and a bowl. Sometimes a peeler. Once in a while a can opener."],
  ["Whole ingredients", "One can, one avocado, one romaine heart. You are never left holding half a can of tuna."],
  ["Serves 2, double for 4", "US cups and spoons. Taste it, then add salt, acid or heat until it tastes right to you."],
  ["Bring your own", "Steak, chicken, shrimp, pasta and rice arrive already cooked. Rotisserie chicken counts."],
  ["Knife School", "About a dozen moves cover the whole book. Learn them once, practice them at lunch."],
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-orange text-ink">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:pb-24 md:pt-20">
          <div className="order-2 md:order-1">
            <p className="stencil mb-4 text-sm text-ink/80 sm:text-base">A cookbook by {AUTHOR}</p>
            <h1 className="display text-[22vw] leading-[0.85] sm:text-8xl md:text-[7.5rem] lg:text-[8.5rem]">
              Get to
              <br />
              the
              <br />
              <span className="text-paper">Chopper</span>
            </h1>
            <p className="hand mt-6 max-w-md text-2xl leading-tight sm:text-3xl">{TAGLINE}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="badge-soon">
                <span className="h-2 w-2 rounded-full bg-orange" aria-hidden />
                Coming soon on Amazon
              </span>
              <Link
                href="/recipes/"
                className="border-2 border-ink bg-paper px-5 py-3 text-sm font-extrabold uppercase tracking-[0.15em] shadow-paper-sm hover:bg-white"
              >
                Peek at the recipes
              </Link>
            </div>
          </div>
          <div className="order-1 flex justify-center md:order-2">
            <div className="tilt-r relative w-64 border-[3px] border-ink bg-white p-2 shadow-paper sm:w-80 md:w-[22rem]">
              <img
                src="/img/cover.jpg"
                alt="Get to the Chopper book cover: a chopped salad on an orange background"
                width={900}
                height={1200}
                className="block w-full"
              />
              <div className="absolute inset-x-2 top-2 flex flex-col items-start gap-1 p-4 sm:p-5">
                <span className="display text-3xl leading-none text-white drop-shadow-[2px_2px_0_#1b1b1b] sm:text-4xl">
                  Get to the
                  <br />
                  Chopper
                </span>
                <span className="hand text-base leading-tight text-white drop-shadow-[1px_1px_0_#1b1b1b] sm:text-lg">
                  116 no-cook chopped recipes
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS A CHOP */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <p className="eyebrow text-red">What is a chop?</p>
        <h2 className="display mt-2 max-w-3xl text-5xl sm:text-6xl md:text-7xl">
          Take the sandwich apart. <span className="underline-marker">Put it back together with a knife.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Here is the idea. Take everything that goes on a sandwich or into a salad, pile it on the board, and chop it together until
          the pieces are small enough to share a bite. Then dress it in the bowl. Nothing falls out, nothing slides, and the last bite
          tastes exactly like the first one.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="paper-card p-6">
              <span className="step-num">{s.n}</span>
              <h3 className="display mt-2 text-4xl">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROMISES */}
      <section className="border-y-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <p className="eyebrow text-red">The three promises, and a few more</p>
          <h2 className="display mt-2 text-4xl sm:text-5xl">Every recipe page works the same way.</h2>
          <p className="hand mt-2 text-2xl text-ink-soft">Learn one and you have learned them all.</p>
          <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {promises.map(([t, d]) => (
              <div key={t} className="border-l-4 border-red pl-4">
                <dt className="display text-2xl">{t}</dt>
                <dd className="mt-1 leading-relaxed text-ink-soft">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CHAPTERS */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-red">Ten chapters</p>
            <h2 className="display mt-2 text-5xl sm:text-6xl">116 recipes. Zero burners.</h2>
          </div>
          <Link href="/chapters/" className="text-sm font-extrabold uppercase tracking-[0.15em] underline hover:text-red">
            See the chapter map
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {chapters.map((ch) => (
            <ChapterTile key={ch.number} ch={ch} />
          ))}
        </div>
      </section>

      {/* FEATURED RECIPES */}
      <section className="pattern-band border-y-2 border-ink">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <div className="paper-card inline-block px-5 py-3">
            <p className="eyebrow text-red">From the book</p>
            <h2 className="display mt-1 text-4xl sm:text-5xl">A few to get you started</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homeRecipes.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/recipes/"
              className="inline-block border-2 border-ink bg-ink px-6 py-3 text-sm font-extrabold uppercase tracking-[0.15em] text-paper shadow-[4px_4px_0_0_#c8321f] hover:bg-red"
            >
              All featured recipes
            </Link>
          </div>
        </div>
      </section>

      {/* STILLS BAND */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="eyebrow text-red">A knife, a board, a bowl</p>
        <h2 className="display mt-2 text-4xl sm:text-5xl">Buy three good things once.</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
          {stills.map((s, i) => (
            <img
              key={s}
              src={`/img/${s}.jpg`}
              alt=""
              loading="lazy"
              width={825}
              height={1100}
              className={`aspect-[4/5] w-full border-2 border-ink object-cover ${i % 2 ? "tilt-r" : "tilt-l"}`}
            />
          ))}
        </div>
      </section>

      {/* AUTHOR */}
      <section id="author" className="mx-auto max-w-6xl px-4 pb-8 pt-8 sm:px-6">
        <div className="grid items-center gap-8 border-2 border-ink bg-white p-6 shadow-paper md:grid-cols-[auto_1fr] md:p-10">
          <img
            src="/img/helicopter.jpg"
            alt="The book's cartoon helicopter mascot"
            width={240}
            height={320}
            className="mx-auto w-40 border-2 border-ink md:w-56"
          />
          <div>
            <p className="eyebrow text-red">About the author</p>
            <h2 className="display mt-2 text-4xl sm:text-5xl">{AUTHOR}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Nick Irmo is a marketer and a home cook. Get to the Chopper collects 116 recipes that need a knife, a board and a
              bowl, and never a stove: chopped sandwiches, the classic salads, the deli case, bowls from around the world and a
              chapter of sweet chops to finish.
            </p>
            <p className="hand mt-4 text-2xl">If you are hungry, start with the Italian Chopped Sub.</p>
          </div>
        </div>
      </section>
    </>
  );
}
