"use client";
import AppProvider from "@/config/AppProvider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <div className="size-full flex justify-center items-center">
        {children}
      </div>
    </AppProvider>
  );
}
