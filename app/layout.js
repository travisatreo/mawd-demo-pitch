import { EB_Garamond, Playfair_Display } from "next/font/google";
import "./globals.css";

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "Fanded — MAWD Demo Pitch",
  description: "The future of artist & athlete management is self-managed. Powered by agentic AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${garamond.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}
