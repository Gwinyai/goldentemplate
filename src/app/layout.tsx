import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { tokens } from "@/design-tokens";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: tokens.brandName,
  description: "__VG_SITE_DESCRIPTION__",
  keywords: "__VG_SITE_KEYWORDS__",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
