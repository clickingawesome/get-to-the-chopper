import type { Metadata } from "next";
import "@fontsource/anton/400.css";
import "@fontsource/nunito-sans/400.css";
import "@fontsource/nunito-sans/700.css";
import "@fontsource/nunito-sans/800.css";
import "@fontsource/patrick-hand/400.css";
import "@fontsource/stardos-stencil/400.css";
import "@fontsource/stardos-stencil/700.css";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { AUTHOR, SITE_NAME, SITE_URL, TAGLINE, AVAILABLE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description: `${SITE_NAME} by ${AUTHOR}: 115+ no-cook chopped recipes made with a knife, a board and a bowl. ${AVAILABLE ? "Available now on Amazon." : "Coming soon on Amazon."}`,
  authors: [{ name: AUTHOR }],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: `115+ no-cook chopped recipes by ${AUTHOR}. ${AVAILABLE ? "Available now on Amazon." : "Coming soon on Amazon."}`,
    url: "/",
    locale: "en_US",
    images: [{ url: "/og/site.jpg", width: 1200, height: 630, alt: `${SITE_NAME} by ${AUTHOR}: the book cover with a cartoon helicopter chasing running vegetables` }],
  },
  alternates: { canonical: "/" },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.png", apple: "/apple-icon.png", shortcut: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
