import Link from "next/link";
import { AMAZON_URL, AUTHOR, AVAILABLE, SITE_NAME, TAGLINE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-20 border-t-4 border-ink bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="display text-4xl leading-none">{SITE_NAME}</p>
          <p className="hand mt-2 text-xl text-paper/80">{TAGLINE}</p>
          <p className="mt-6">
            {AVAILABLE ? (
              <a href={AMAZON_URL} target="_blank" rel="noopener" className="inline-block border border-paper/60 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] hover:bg-paper hover:text-ink">Buy on Amazon &rarr;</a>
            ) : (
              <span className="inline-block border border-paper/40 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.2em]">Coming soon on Amazon</span>
            )}
          </p>
        </div>
        <div>
          <p className="eyebrow text-paper/60">Explore</p>
          <ul className="mt-3 space-y-2 font-bold">
            <li><Link className="hover:text-orange" href="/recipes/">Recipes</Link></li>
            <li><Link className="hover:text-orange" href="/chapters/">Chapters</Link></li>
            <li><Link className="hover:text-orange" href="/#how">How it works</Link></li>
            <li><Link className="hover:text-orange" href="/#author">About the author</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-paper/60">The book</p>
          <ul className="mt-3 space-y-2 font-bold">
            <li>By {AUTHOR}</li>
            <li>115+ recipes, 10 chapters</li>
            <li>Every one of them no-cook</li>
            <li>Serves 2. Double for 4.</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/20">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-paper/60 sm:px-6">
          © {new Date().getFullYear()} {AUTHOR}. All rights reserved. Recipes and images © {AUTHOR}.
        </p>
      </div>
    </footer>
  );
}
