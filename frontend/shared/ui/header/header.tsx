"use client";
import Image from "next/image";
import flashLogo from "../../images/flashLogo.webp";
import { LoginIcon } from "../icons/login-icon";
import { useAuth } from "@/config/AuthProvider";
import { useRouter } from "next/navigation";

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
    <header className="w-full px-32 py-3 flex items-center justify-between mb-6 bg-white shadow-md">
      <div className="flex justify-center items-center gap-3">
        <Image
          src={flashLogo}
          alt="logo"
          width={50}
          height={50}
          className="rounded-xl"
        />
        <h1 className="text-3xl font-bold">flash</h1>
      </div>

      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={handleAuth}
      >
        <span className="text-base font-semibold">
          {isAuthenticated ? "logout" : "login"}
        </span>
        <LoginIcon />
      </div>
    </header>
  );
}
