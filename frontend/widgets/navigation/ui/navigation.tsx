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

const iconComponents: Record<IconKey, () => JSX.Element> = {
  home: HomeIcon,
  search: SearchIcon,
  message: MessageIcon,
  bank: BankIcon,
  settings: SettingsIcon,
};

export default function Navigation() {
  return (
    <nav className="w-full h-auto px-8 py-5 flex flex-col items-start justify-center gap-2 rounded-xl border border-stone-950 bg-white">
      {menuItems.map((menuItem) => {
        const Icon = iconComponents[menuItem.icon];
        return (
          <Link
            href={menuItem.link}
            key={menuItem.name}
            className="flex justify-start items-center gap-2 hover:bg-gray-100 hover:scale-[1.02] rounded-xl px-2 py-1"
          >
            <Icon />
            <p className="text-base font-semibold">{menuItem.name}</p>
          </Link>
        );
      })}
    </nav>
  );
}
