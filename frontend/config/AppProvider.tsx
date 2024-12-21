"use client";

import QueryProvider from "@/config/QueryProvider";
import ReduxProvider from "@/config/ReduxProvider";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <QueryProvider>{children}</QueryProvider>
    </ReduxProvider>
  );
}
