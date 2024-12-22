"use client";

import QueryProvider from "@/config/QueryProvider";
import ReduxProvider from "@/config/ReduxProvider";
// import { fetchUser } from "@/features/auth/model/authSlice";
// import { useEffect } from "react";
// import { useAppDispatch } from "./hooks";

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
