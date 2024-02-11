import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'namada-primary': '#ffff00',
      'namada-danger': '#ff0000',
      'namada-black': '#000000',
      'namada-secondary': '#00ffff',
      'namada-white': '#ffffff',
    },
    extend: {
    },
  },
  plugins: [],
};
export default config;
