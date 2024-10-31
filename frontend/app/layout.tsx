import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/shared/ui/header/header";
import { Navigation } from "@/widgets/navigation";
import { Profile } from "@/widgets/profile";

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
        <Header />
        <div className="w-full h-full px-32 flex">
          <div className="w-1/4 h-auto border border-stone-950">
            <Navigation />
          </div>
          <div className="w-full mx-5">{children}</div>
          <div className="w-1/3 h-auto border border-stone-950">
            <Profile />
          </div>
        </div>
      </body>
    </html>
  );
}
