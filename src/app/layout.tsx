import type { Metadata } from "next";
import "./globals.css";
import Nav from '../component/Nav';

export const metadata: Metadata = {
  title: "Le avventure di Barein",
  description: "",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="it" className={`h-full antialiased`}>
      <body className="min-h-full">
          <Nav/>
          {children}
        </body>
    </html>
  );
}
