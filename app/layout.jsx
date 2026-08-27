import { IBM_Plex_Mono, Onest, Space_Grotesk } from "next/font/google";
import "./globals.css";

// Font system, self-hosted via next/font:
// Space Grotesk — display and body; geometric with ink-trap details.
// Onest — logo wordmark (type-test winner).
// IBM Plex Mono — data/code accents: labels, kickers, annotations.
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const wordmark = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-wordmark",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Tensir",
  description: "Compute logistics for chemistry R&D.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${wordmark.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
