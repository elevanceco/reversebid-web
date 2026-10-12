import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/app/globals.css";
import { cn } from "cn";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "ReverseBid | B2B eSourcing & Reverse Auction Platform",
  description:
    "Turn your Excel-based vendor quotation process into an auditable sourcing event in minutes. Create structured RFQs, run live reverse auctions, and export defensible audit trails.",
  keywords: [
    "eSourcing",
    "reverse auction software",
    "RFQ platform",
    "procurement software",
    "vendor quotation",
    "B2B sourcing",
    "ReverseBid",
  ],
  authors: [{ name: "ReverseBid" }],
  openGraph: {
    title: "ReverseBid | Graduate from Excel-based Procurement",
    description:
      "Replace scattered supplier quotations across Excel and email with structured RFQs, competitive bidding, and an auditable sourcing workflow.",
    url: "https://reversebid.com",
    siteName: "ReverseBid",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReverseBid | B2B eSourcing Platform",
    description:
      "Turn your Excel-based vendor quotation process into an auditable sourcing event in minutes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans scroll-smooth", geist.variable)}>
      <body
        className={`${geist.variable} font-sans antialiased bg-background text-foreground flex flex-col min-h-screen`}
      >
        <main className="grow">{children}</main>
      </body>
    </html>
  );
}
