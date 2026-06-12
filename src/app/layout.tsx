import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "@/src/shared/styles/globals.css";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumbera",
  description: "Platform multi-koperasi digital Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#4a4a4a] font-[family-name:var(--font-sans)]">
        {children}
      </body>
    </html>
  );
}
