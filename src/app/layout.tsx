import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`min-h-screen ${poppins.className}`} suppressHydrationWarning={true}>
          <NextTopLoader
            color="#b89855"
            showSpinner={false}
          />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
