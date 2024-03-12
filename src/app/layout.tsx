import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "CE Ticket Scanner",
  description: "Ticket scanner for CarEvents.com",
  authors: [{
    name: "Keshanth Jude"
  }],
  // manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#b89855",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials"></link>
      {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link> */}

      <body className={`min-h-screen ${poppins.className}`} suppressHydrationWarning={true}>
        <NextTopLoader
          color="#b89855"
          showSpinner={false}
        />
        <Header />
        {children}
        {/* <Script src="/sw.js" id="service-worker" strategy="beforeInteractive" /> */}
      </body>
    </html>
  );
}
