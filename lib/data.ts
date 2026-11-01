import site from "@/data/site.json";

export type Extra = [string, string];
export type Recipe = {
  slug: string; title: string; chapter: number; tagline: string; time: string; serves: string;
  level: string; tools: string; protein: boolean; heat: number; gist: string;
  move_title: string; move: string; lineup: string[]; steps: string[]; extras: Extra[];
};
export type ChapterRecipe = { slug: string; title: string; featured: boolean };
export type Chapter = {
  number: number; title: string; line: string; color: string; intro: string[]; count: number; recipes: ChapterRecipe[];
};

export const chapters = site.chapters as Chapter[];
export const recipes = site.recipes as Recipe[];
export const homeSlugs = site.home as string[];
export const stills = site.stills as string[];

export const getRecipe = (slug: string) => recipes.find((r) => r.slug === slug);
export const getChapter = (n: number) => chapters.find((c) => c.number === n)!;
export const recipesForChapter = (n: number) => recipes.filter((r) => r.chapter === n);
export const homeRecipes = homeSlugs.map((s) => getRecipe(s)!).filter(Boolean);
export const pad = (n: number) => String(n).padStart(2, "0");
export const heroSrc = (slug: string) => `/img/r-${slug}.jpg`;
export const thumbSrc = (slug: string) => `/img/t-${slug}.jpg`;
export const openerSrc = (n: number) => `/img/opener-${pad(n)}.jpg`;
