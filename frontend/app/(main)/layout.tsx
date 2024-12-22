"use client";
import AppProvider from "@/config/AppProvider";
import { Profile } from "@/entities/profile";
import MobileNavigation from "@/widgets/navigation/mobile-navigation";
import Navigation from "@/widgets/navigation/navigation";
import { Suspense } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="w-full h-auto relative z-10">
          <div className="w-full h-full relative flex justify-between md:flex-row flex-col md:p-0">
            <div className="w-1/5 h-screen hidden md:block sticky inset-y-0 min-w-[10%]">
              <Navigation />
            </div>
            <div className="w-full block md:hidden sticky inset-y-0 z-50">
              <MobileNavigation />
            </div>
            <div className="w-full h-auto p-5 my-1 md:p-10 overflow-x-auto overflow-y-hidden z-10">
              {children}
            </div>
            <div className="w-2/6 h-screen sticky inset-0 hidden md:block p-5">
              <div className="w-full h-full hidden md:flex flex-col items-center rounded-xl bg-white p-5 ">
                <div className="w-4/5 h-1/5">
                  <Profile type="base" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </AppProvider>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}
