import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CE Ticket Scanner",
  description: "Ticket scanner for CarEvents.com",
  authors: [{
    name: "Keshanth Jude"
  }],
  // manifest: "/manifest.json",
  themeColor: "#b89855",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials"></link>
      <body className={`min-h-screen ${inter.className}`} suppressHydrationWarning={true}>
        <Header />
        {children}
      </body>
    </html>
  );
}
