import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "machine-test-lsquaredai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-svw overflow-x-clip">
      <body className={`${poppins.className} antialiased flex w-screen lg:h-screen lg:overflow-hidden max-w-lg:overflow-x-hidden`}>
        {children}
      </body>
      <Analytics />
    </html>
  );
}
