import Link from "next/link";

const links = [
  { href: "/recipes/", label: "Recipes" },
  { href: "/chapters/", label: "Chapters" },
  { href: "/#how", label: "How it works" },
  { href: "/#author", label: "Author" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <img src="/icon.png" alt="" width={36} height={36} className="h-9 w-9 rounded-sm border-2 border-ink bg-white object-cover" />
          <span className="display whitespace-nowrap text-lg leading-none sm:text-2xl">Get to the Chopper</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm font-extrabold uppercase tracking-wider sm:gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hidden hover:text-red sm:inline">
              {l.label}
            </Link>
          ))}
          <Link href="/recipes/" className="hover:text-red sm:hidden">Recipes</Link>
          <Link href="/chapters/" className="hover:text-red sm:hidden">Chapters</Link>
        </nav>
      </div>
    </header>
  );
}
