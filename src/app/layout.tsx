import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import NextTopLoader from 'nextjs-toploader';
import { Footer } from "@/components/Footer";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "CE Ticket Scanner",
  description: "Ticket scanner for CarEvents.com",
  authors: [{
    name: "Keshanth Jude"
  }],
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials"></link> */}
      <body className={`min-h-screen ${poppins.className}`} suppressHydrationWarning={true}>
        <NextTopLoader
          color="#b89855"
          showSpinner={false}
        />
        <Header />
        {children}
        <div className="h-20"></div> {/* Spacer */}
        <Footer />
      </body>
    </html>
  );
}
