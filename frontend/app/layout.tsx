import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/widgets/navigation/ui/navigation";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Flash",
  description: "best app:)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}  antialiased h-wull min-h-screen`}>
        <Navigation />
        <div className="w-full h-full px-32">{children}</div>
      </body>
    </html>
  );
}
