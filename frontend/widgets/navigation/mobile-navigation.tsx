"use client";

import Image from "next/image";
import flashLogo from "@/shared/images/flashLogo.webp";
import { LoginIcon } from "../../shared/ui/icons/login-icon";
import { LogoutIcon } from "../../shared/ui/icons/logout-icon";
import { menuItems } from "@/shared/common/constants";
import { IconKey } from "@/shared/common/types";
import {
  SearchIcon,
  HomeIcon,
  MessageIcon,
  BankIcon,
  SettingsIcon,
} from "@/shared/ui/icons/index";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/config/hooks";
import authSlice from "@/features/auth/model/authSlice";
import { useState } from "react";

const iconComponents: Record<IconKey, () => JSX.Element> = {
  home: HomeIcon,
  search: SearchIcon,
  message: MessageIcon,
  bank: BankIcon,
  settings: SettingsIcon,
};

export default function MobileNavigation() {
  const isAuthenticated = useAppSelector(authSlice.selectors.isAuthenticated);
  const dispatch = useAppDispatch();

  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleAuth = () => {
    if (isAuthenticated) {
      dispatch(authSlice.actions.logout());
      localStorage.removeItem("token");
    } else {
      router.push("auth");
    }
  };

  return (
    <>
      {/* Верхнє меню */}
      <header className="w-full px-5 py-2 flex items-center justify-between bg-white shadow-md md:hidden">
        <button onClick={handleAuth}>
          {isAuthenticated ? <LogoutIcon /> : <LoginIcon />}
        </button>
        <Image
          src={flashLogo}
          alt="logo"
          width={40}
          height={40}
          className="rounded-xl"
        />
        <button
          className="text-xl font-bold"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
      </header>

      {/* Бічне меню */}
      {menuOpen && (
        <nav className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-2/3 h-full bg-white p-4 flex flex-col gap-4">
            <button
              className="self-end text-lg"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>

            {menuItems.map((menuItem) => {
              const Icon = iconComponents[menuItem.icon];
              const isActive = pathname === menuItem.link;
              return (
                <Link
                  href={menuItem.link}
                  key={menuItem.name}
                  className={`${
                    isActive ? "bg-main-blue-light bg-opacity-10" : ""
                  } flex items-center gap-3 hover:bg-gray-100 rounded-lg px-4 py-2`}
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon />
                  <span>{menuItem.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}

      {/* Нижнє меню */}
      <nav className="fixed bottom-0 w-full bg-white shadow-md flex justify-around items-center py-2 md:hidden">
        {menuItems.map((menuItem) => {
          const Icon = iconComponents[menuItem.icon];
          const isActive = pathname === menuItem.link;
          return (
            <Link
              href={menuItem.link}
              key={menuItem.name}
              className={`${
                isActive ? "text-main-blue" : "text-gray-500"
              } flex flex-col items-center text-sm`}
            >
              <Icon />
              <span>{menuItem.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
