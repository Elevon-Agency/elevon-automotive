import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LoadingScreen } from "@/components/layout/loading-screen";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Elevon Automotive Motors | Luxury Hypercar Showroom",
    template: "%s | Elevon Automotive Motors",
  },
  description:
    "Curated collection of the world's finest hypercars and supercars. Experience automotive excellence at Elevon Automotive Motors — where engineering meets artistry.",
  keywords: [
    "luxury cars",
    "hypercars",
    "supercars",
    "Elevon Automotive Motors",
    "exotic cars",
    "premium automotive",
  ],
  openGraph: {
    title: "Elevon Automotive Motors | Luxury Hypercar Showroom",
    description:
      "Curated collection of the world's finest hypercars and supercars.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body
        className={`${inter.variable} ${syne.variable} min-h-full flex flex-col font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SmoothScrollProvider>
            <LoadingScreen />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
