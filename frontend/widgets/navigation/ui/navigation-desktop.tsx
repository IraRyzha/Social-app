"use client";
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

export default function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex w-full h-auto px-8 py-5 flex-col items-start justify-center gap-2 rounded-xl bg-white shadow">
      {menuItems.map((menuItem) => {
        const Icon = iconComponents[menuItem.icon];
        const isActive = pathname === menuItem.link;
        return (
          <Link
            href={menuItem.link}
            key={menuItem.name}
            className={`${
              isActive && "bg-main-blue-light bg-opacity-10"
            } flex justify-start items-center gap-2 hover:bg-gray-100 hover:scale-[1.02] rounded-xl px-4 py-1`}
          >
            <Icon />
            <p className="text-base font-semibold">{menuItem.name}</p>
          </Link>
        );
      })}
    </nav>
  );
}
