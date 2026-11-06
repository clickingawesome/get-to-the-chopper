import { AMAZON_URL, AVAILABLE } from "@/lib/site";

type Props = { variant?: "dark" | "light" | "outline"; label?: string };

/** "Buy on Amazon" when the listing is live, otherwise the "Coming soon on Amazon" badge. */
export default function BuyButton({ variant = "dark", label = "Buy on Amazon" }: Props) {
  if (!AVAILABLE) {
    return (
      <span className="badge-soon">
        <span className="h-2 w-2 rounded-full bg-orange" aria-hidden />
        Coming soon on Amazon
      </span>
    );
  }
  const cls =
    variant === "outline"
      ? "inline-block border border-paper/60 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] hover:bg-paper hover:text-ink"
      : variant === "light"
      ? "inline-flex items-center gap-2 border-2 border-ink bg-paper px-5 py-3 text-sm font-extrabold uppercase tracking-[0.15em] shadow-paper-sm hover:bg-white"
      : "badge-soon hover:bg-red";
  return (
    <a href={AMAZON_URL} target="_blank" rel="noopener" className={cls}>
      {label} <span aria-hidden>&rarr;</span>
    </a>
  );
}
