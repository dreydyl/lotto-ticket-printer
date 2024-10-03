import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        primary_highlight: "var(--primary-highlight)",
        black_highlight: "var(--black-highlight)",
        primary_black_highlight: "var(--primary-black-highlight)",
      },
    },
  },
  plugins: [],
};
export default config;
