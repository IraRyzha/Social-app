import { IconKey } from "./types";

const menuItems: { name: string; link: string; icon: IconKey }[] = [
  { name: "Home", link: "/", icon: "home" },
  { name: "Search", link: "/search", icon: "search" },
  { name: "Messages", link: "/messages", icon: "message" },
  { name: "Bank", link: "/bank", icon: "bank" },
  { name: "Settings", link: "/settings", icon: "settings" },
];

export { menuItems };
