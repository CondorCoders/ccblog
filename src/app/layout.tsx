import type { Metadata } from "next";
import "./globals.css";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Blog de Condor Coders",
  description: "Blog de tecnologias y programación en español.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh flex flex-col prose dark:prose-invert relative max-w-full">
        <header className="w-full">
          <div className="max-w-3xl mx-auto">
            <Link href="/">
              <Logo />
            </Link>
          </div>
        </header>
        <div className="w-full flex-1">{children}</div>

        <footer className="w-full bg-purple-700 text-white p-4">
          <div className="max-w-3xl mx-auto text-center">
            Hecho con ❤️ por{" "}
            <Link
              href="www.condorcoders.com"
              className="hover:text-purple-200 text-white"
            >
              Condor Coders
            </Link>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
