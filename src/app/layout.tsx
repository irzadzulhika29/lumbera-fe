import type { Metadata, Viewport } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "@/src/shared/styles/globals.css";
import PwaRegistration from "@/src/shared/components/system/PwaRegistration";

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
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Lumbera",
  },
  applicationName: "Lumbera",
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0e6f6c",
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
        <PwaRegistration />
        {children}
      </body>
    </html>
  );
}
