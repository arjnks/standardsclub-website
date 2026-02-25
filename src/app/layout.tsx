import type { Metadata } from "next";
import "./globals.css";
import { CadGridBackground } from "@/components/CadGridBackground";

export const metadata: Metadata = {
  title: "Standards Club VIT",
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
