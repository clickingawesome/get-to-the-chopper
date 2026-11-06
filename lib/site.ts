export const SITE_NAME = "Get to the Chopper";
export const TAGLINE = "115+ no-cook chopped recipes. Knife, board, bowl.";
export const AUTHOR = "Nick Irmo";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://choppedrecipes.com").replace(/\/$/, "");

// Amazon listing. Set this to the book's Amazon URL and every "Coming soon" turns into a buy button.
export const AMAZON_URL = (process.env.NEXT_PUBLIC_AMAZON_URL || "https://www.amazon.com/dp/B0HQJ489G4").trim();
export const AVAILABLE = AMAZON_URL.length > 0;
