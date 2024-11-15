"use client";

import DesktopNavigation from "./navigation-desktop";
import MobileNavigation from "./navigation-mobile";

export default function Navigation({ type }: { type: "mobile" | "desktop" }) {
  return (
    <>
      {type === "desktop" && <DesktopNavigation />}
      {type === "mobile" && <MobileNavigation />}
    </>
  );
}
