import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClientProviders } from "@/components/ClientProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "StartupPerks - Exclusive Perks for Ambitious Founders",
  description: "Discover exclusive deals, discounts, and perks designed for founders and startup teams.",
  openGraph: {
    title: "StartupPerks - Exclusive Perks for Ambitious Founders",
    description: "Discover exclusive deals, discounts, and perks designed for founders and startup teams.",
    url: "https://venturenext.co",
    type: "website",
    siteName: "StartupPerks",
    images: [
      {
        url: "https://venturenext.co/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "StartupPerks - Exclusive Perks for Founders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StartupPerks - Exclusive Perks for Ambitious Founders",
    description: "Discover exclusive deals, discounts, and perks designed for founders and startup teams.",
    images: ["https://venturenext.co/og-image.jpg"],
  },
  alternates: {
    canonical: "https://venturenext.co",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
