import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import {Noto_Sans_JP} from "next/font/google"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const notoSansJP = Noto_Sans_JP({subsets:["latin"]})

export const metadata: Metadata = {
  title: "Todo App",
  description: "Next.js tutorial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={notoSansJP.className}
      >
        {children}
      </body>
    </html>
  );
}
