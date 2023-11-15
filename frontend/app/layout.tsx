import type { Metadata } from "next";

import "./globals.scss";

import { Navbar } from "@/components";

export const metadata: Metadata = {
  title: "Jatin Rai",
  description:
    "Jatin Rai - Software Engineer | Frontend Developer | Web Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
