"use client";
import Image from "next/image";
import flashLogo from "@/shared/images/flashLogo.webp";
import { LoginIcon } from "../../shared/ui/icons/login-icon";
import { useAuth } from "@/config/AuthProvider";
import { useRouter } from "next/navigation";
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
import { usePathname } from "next/navigation";

const iconComponents: Record<IconKey, () => JSX.Element> = {
  home: HomeIcon,
  search: SearchIcon,
  message: MessageIcon,
  bank: BankIcon,
  settings: SettingsIcon,
};

export default function Navigation() {
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
    <header className="w-full h-screen px-8 py-5 flex flex-col items-start justify-between gap-10 bg-white shadow-md">
      <div
        className="w-full flex justify-center items-center gap-1 md:gap-3 cursor-pointer border border-slate-800"
        onClick={() => router.replace("/")}
      >
        <Image
          src={flashLogo}
          alt="logo"
          width={50}
          height={50}
          className="rounded-xl size-7 md:size-12"
        />
        <h1 className="text-xl md:text-3xl font-bold">flash</h1>
      </div>

      <nav className="flex w-full h-full flex-col items-start justify-start gap-3 rounded-xl border border-slate-800">
        {menuItems.map((menuItem) => {
          const Icon = iconComponents[menuItem.icon];
          const isActive = pathname === menuItem.link;
          return (
            <Link
              href={menuItem.link}
              key={menuItem.name}
              className={`${
                isActive && "bg-main-blue-light bg-opacity-10"
              } w-full flex justify-start items-center gap-3 hover:bg-gray-100 hover:scale-[1.02] rounded-xl px-4 py-2`}
            >
              <Icon />
              <p className="text-base font-semibold">{menuItem.name}</p>
            </Link>
          );
        })}
      </nav>

      <div
        className="w-full flex items-center gap-3 cursor-pointer px-4 py-1 border border-slate-800"
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
