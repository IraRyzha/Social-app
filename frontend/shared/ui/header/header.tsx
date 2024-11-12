"use client";
import Image from "next/image";
import flashLogo from "../../images/flashLogo.webp";
import { LoginIcon } from "../icons/login-icon";
import { useAuth } from "@/config/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import { LogoutIcon } from "../icons/logout-icon";
import { menuItems } from "@/shared/common/constants";
import { IconKey } from "@/shared/common/types";
import Link from "next/link";
import {
  HomeIcon,
  SearchIcon,
  MessageIcon,
  BankIcon,
  SettingsIcon,
} from "../icons";

const iconComponents: Record<IconKey, () => JSX.Element> = {
  home: HomeIcon,
  search: SearchIcon,
  message: MessageIcon,
  bank: BankIcon,
  settings: SettingsIcon,
};

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleAuth = () => {
    if (isAuthenticated) {
      logout();
    } else {
      router.push("auth");
    }
  };

  return (
    <header className="w-full px-5 py-5 md:px-32 md:py-3 flex items-center justify-between mb-6 bg-white shadow-md">
      <div className="flex justify-center items-center gap-1 md:gap-3">
        <Image
          src={flashLogo}
          alt="logo"
          width={50}
          height={50}
          className="rounded-xl size-7 md:size-12"
        />
        <h1 className="text-xl md:text-3xl font-bold">flash</h1>
      </div>

      <nav className="flex md:hidden w-full h-auto items-center justify-center">
        {menuItems.map((menuItem) => {
          const Icon = iconComponents[menuItem.icon];
          const isActive = pathname === menuItem.link;
          return (
            <Link
              href={menuItem.link}
              key={menuItem.name}
              className={`${
                isActive && "bg-main-blue-light bg-opacity-10"
              } flex hover:bg-gray-100 hover:scale-[1.02] rounded-xl p-[5px]`}
            >
              <Icon />
            </Link>
          );
        })}
      </nav>

      <div
        className="flex items-center gap-[3px] cursor-pointer"
        onClick={handleAuth}
      >
        <span className="text-sm md:text-base font-semibold">
          {isAuthenticated ? "logout" : "login"}
        </span>
        {isAuthenticated ? <LogoutIcon /> : <LoginIcon />}
      </div>
    </header>
  );
}
