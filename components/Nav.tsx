"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AMAZON_URL, AVAILABLE } from "@/lib/site";

const links = [
  { href: "/recipes/", label: "Recipes" },
  { href: "/chapters/", label: "Chapters" },
  { href: "/#how", label: "How it works" },
  { href: "/#author", label: "Author" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  const close = () => setOpen(false);
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <img src="/icon.png" alt="" width={36} height={36} className="h-9 w-9 shrink-0 rounded-sm border-2 border-ink bg-white object-cover" />
          <span className="display truncate text-xl leading-none sm:text-2xl">Get to the Chopper</span>
        </Link>

        {/* desktop */}
        <nav className="hidden items-center gap-6 text-sm font-extrabold uppercase tracking-wider md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-red">
              {l.label}
            </Link>
          ))}
          {AVAILABLE && (
            <a href={AMAZON_URL} target="_blank" rel="noopener" className="border-2 border-ink bg-red px-3 py-1.5 text-paper shadow-paper-sm hover:bg-ink">
              Buy the book
            </a>
          )}
        </nav>

        {/* mobile menu */}
        <div className="md:hidden">
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center border-2 border-ink bg-white shadow-paper-sm"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className={open ? "hidden" : "block"}>
              <path d="M2 4h16M2 10h16M2 16h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className={open ? "block" : "hidden"}>
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
          {open && (
          <nav className="absolute inset-x-0 top-full border-b-2 border-ink bg-paper shadow-paper">
            <ul className="mx-auto max-w-6xl divide-y-2 divide-ink/10 px-4 text-base font-extrabold uppercase tracking-wider">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={close} className="block py-4 hover:text-red">
                    {l.label}
                  </Link>
                </li>
              ))}
              {AVAILABLE && (
                <li className="py-4">
                  <a href={AMAZON_URL} target="_blank" rel="noopener" className="block border-2 border-ink bg-red px-4 py-3 text-center text-paper shadow-paper-sm">
                    Buy on Amazon →
                  </a>
                </li>
              )}
            </ul>
          </nav>
          )}
        </div>
      </div>
    </header>
  );
}
