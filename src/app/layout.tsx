import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

const seoDescription =
  "Chris Bender is a custom software developer and designer in Kitchener-Waterloo building high-performance websites, web and mobile applications, AI automation, and search-ready digital products.";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  applicationName: DATA.name,
  title: {
    default: `${DATA.name} | Custom Software Developer & Designer`,
    template: `%s | ${DATA.name}`,
  },
  description: seoDescription,
  authors: [{ name: DATA.name, url: DATA.url }],
  creator: DATA.name,
  publisher: DATA.name,
  keywords: [
    "custom software developer",
    "web application developer",
    "mobile app developer",
    "website designer Kitchener-Waterloo",
    "AI automation developer",
    "technical SEO",
    "answer engine optimization",
  ],
  openGraph: {
    title: `${DATA.name} | Custom Software Developer & Designer`,
    description: seoDescription,
    url: DATA.url,
    siteName: DATA.name,
    locale: "en_CA",
    type: "website",
  },
  alternates: {
    types: {
      "application/rss+xml": `${DATA.url}/rss.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name} | Custom Software Developer & Designer`,
    description: seoDescription,
    card: "summary_large_image",
  },
  category: "technology",
  // Stops iOS Safari from turning the years and version numbers in the resume
  // copy into tel: links, which would inject markup search engines then parse.
  formatDetection: { telephone: false, address: false, email: false },
};

/* Matches the two theme backgrounds in globals.css, so the browser chrome
   follows the page instead of flashing white on a dark-mode load. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <TooltipProvider delayDuration={0}>
            <div className="absolute inset-0 top-0 left-0 right-0 h-[100px] overflow-hidden z-0">
              <FlickeringGrid
                className="h-full w-full"
                squareSize={2}
                gridGap={2}
                style={{
                  maskImage: "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
                }}
              />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto py-12 pb-24 sm:py-24 px-6">
              {children}
            </div>
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
