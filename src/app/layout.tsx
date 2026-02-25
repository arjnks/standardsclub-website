import type { Metadata } from "next";
import "./globals.css";
import { CadGridBackground } from "@/components/CadGridBackground";

export const metadata: Metadata = {
  title: "BIS Student Chapter | Standards 2.0",
  description: "Precision. Structure. Excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased font-sans">
        <CadGridBackground />
        {children}
      </body>
    </html>
  );
}
