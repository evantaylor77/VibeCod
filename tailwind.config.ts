import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        surface: "#12121a",
        "surface-light": "#1a1a25",
        border: "#2a2a3a",
        accent: "#6366f1",
        "accent-hover": "#4f46e5",
      },
    },
  },
  plugins: [],
};

export default config;
