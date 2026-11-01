import Link from "next/link";
import { type Recipe, getChapter, thumbSrc } from "@/lib/data";

export default function RecipeCard({ recipe, big = false }: { recipe: Recipe; big?: boolean }) {
  const ch = getChapter(recipe.chapter);
  return (
    <Link
      href={`/recipes/${recipe.slug}/`}
      className="paper-card hover-lift group flex flex-col overflow-hidden"
      style={{ ["--chapter" as string]: ch.color }}
    >
      <div className="relative aspect-square overflow-hidden border-b-2 border-ink">
        <img
          src={thumbSrc(recipe.slug)}
          alt={recipe.title}
          loading="lazy"
          width={480}
          height={480}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span
          className="absolute left-0 top-3 px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-white"
          style={{ background: ch.color }}
        >
          Ch. {recipe.chapter} · {recipe.time}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className={`display ${big ? "text-3xl" : "text-2xl"} group-hover:text-red`}>{recipe.title}</h3>
        <p className="hand mt-1 text-lg leading-snug text-ink-soft">{recipe.tagline}</p>
      </div>
    </Link>
  );
}
