import { Archivo_Black, JetBrains_Mono, Space_Grotesk } from "next/font/google";

export const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-brutal",
  weight: ["400", "700", "800"],
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body-brutal",
  weight: ["300", "400", "700"],
});

export const brutalFontVariables = `${archivoBlack.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`;
