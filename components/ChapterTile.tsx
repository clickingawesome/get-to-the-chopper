import Link from "next/link";
import { type Chapter, pad } from "@/lib/data";

export default function ChapterTile({ ch }: { ch: Chapter }) {
  return (
    <Link
      href={`/recipes/#ch${ch.number}`}
      className="hover-lift flex min-h-44 flex-col justify-between border-2 border-ink p-4 text-white shadow-paper"
      style={{ background: ch.color }}
    >
      <span className="stencil text-sm opacity-90">Chapter {pad(ch.number)}</span>
      <div>
        <h3 className="display text-2xl leading-none sm:text-3xl">{ch.title}</h3>
        <p className="mt-2 text-sm leading-snug opacity-95">{ch.line}</p>
        <p className="mt-3 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] opacity-80">{ch.count} recipes</p>
      </div>
    </Link>
  );
}
