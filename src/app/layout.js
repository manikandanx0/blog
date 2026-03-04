import { Playfair_Display, Special_Elite, Courier_Prime, Space_Mono, Noto_Serif_JP } from "next/font/google";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-stamp",
});

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-body",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin", "japanese"],
  weight: ["400", "500"],
  variable: "--font-jp",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Mani's Archive",
  description: "Thoughts. Systems. Obsessions.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${specialElite.variable} ${courierPrime.variable} ${spaceMono.variable} ${notoSerifJP.variable}`}
    >
      <body className="antialiased">
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}