"use client";
import Image from "next/image";
import flashLogo from "../../images/flashLogo.webp";
import { LoginIcon } from "../icons/login-icon";
import { useAuth } from "@/config/AuthProvider";
import { useRouter } from "next/navigation";
import { LogoutIcon } from "../icons/logout-icon";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleAuth = () => {
    if (isAuthenticated) {
      logout();
    } else {
      router.push("auth");
    }
  };

  return (
    <header className="w-full px-5 py-5 md:px-32 md:py-3 flex items-center justify-between mb-6 bg-white shadow-md">
      <div
        className="flex justify-center items-center gap-1 md:gap-3 cursor-pointer"
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
