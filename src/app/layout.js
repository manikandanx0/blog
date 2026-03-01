import { Playfair_Display } from "next/font/google";
import { Source_Serif_4 } from "next/font/google";
import { Noto_Serif_JP } from "next/font/google";
import { Google_Sans_Code } from "next/font/google";

import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-body",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin", "japanese"],
  weight: ["400", "500"],
  variable: "--font-jp",
});

const googleSansCode = Google_Sans_Code({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Mani's Personal Archive",
  description: "Write for the sake of sanity",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sourceSerif.variable} ${notoSerifJP.variable} ${googleSansCode.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}