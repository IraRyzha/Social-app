import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./config/**/*.{js,ts,jsx,tsx,mdx}", // Для сторінок, якщо використовуєте папку pages
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Для нової структури Next.js з app папкою
    "./shared/**/*.{js,ts,jsx,tsx,mdx}", // Спільні компоненти та утиліти
    "./features/**/*.{js,ts,jsx,tsx,mdx}", // Фічі
    "./entities/**/*.{js,ts,jsx,tsx,mdx}", // Доменні сутності
    "./widgets/**/*.{js,ts,jsx,tsx,mdx}", // Віджети
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
