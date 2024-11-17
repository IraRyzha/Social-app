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

export default function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav className="w-full flex md:hidden sticky bottom-0 inset-0 h-auto px-8 py-5 mt-5 items-center justify-center gap-7 bg-white shadow">
      {menuItems.map((menuItem) => {
        const Icon = iconComponents[menuItem.icon];
        const isActive = pathname === menuItem.link;
        return (
          <Link
            href={menuItem.link}
            key={menuItem.name}
            className={`${
              isActive && "bg-main-blue-light bg-opacity-10"
            } flex justify-center items-center  hover:bg-gray-100 hover:scale-[1.02] rounded-xl`}
          >
            <Icon />
          </Link>
        );
      })}
    </nav>
  );
}
