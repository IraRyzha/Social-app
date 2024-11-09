import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  buttonType?: "button" | "submit" | "reset";
  size: "small" | "medium" | "big";
  color: "blue" | "gray" | "white";
  text: "small" | "medium" | "big";
  onClick?: () => void;
}

export default function Button({
  children,
  buttonType,
  size,
  color,
  text,
  onClick,
}: Props) {
  const sizeClasses = {
    small: "px-2 py-1",
    medium: "px-4 py-2",
    big: "px-6 py-3",
  };

  const colorClasses = {
    blue: "bg-main-blue hover:bg-main-blue-light text-white",
    gray: "bg-gray-400 hover:bg-gray-500 text-white",
    white: "bg-white hover:bg-gray-300 text-black",
  };

  const textSizeClasses = {
    small: "text-sm",
    medium: "text-base",
    big: "text-lg",
  };

  return (
    <button
      type={buttonType}
      onClick={onClick}
      className={`font-semibold rounded-lg ${sizeClasses[size]} ${colorClasses[color]} ${textSizeClasses[text]} hover:scale-[1.01] transition-transform`}
    >
      {children}
    </button>
  );
}
