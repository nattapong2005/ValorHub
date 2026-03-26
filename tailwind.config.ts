import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: {
          DEFAULT: "#ff4655",
          hover: "#ff5864",
        },
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-thai)", "Inter", "sans-serif"],
        noto: ["var(--font-noto-sans-thai)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
