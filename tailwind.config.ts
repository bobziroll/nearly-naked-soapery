import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", ".dark"],
  theme: {
    extend: {
      maxWidth: {
        content: "72rem",
        "content-wide": "80rem",
      },
      boxShadow: {
        floating: "0 25px 60px -30px rgb(19 23 20 / 0.35)",
      },
      backgroundImage: {
        "soft-wave":
          "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 55%), radial-gradient(120% 120% at 0% 0%, rgba(255,214,186,0.65) 0%, rgba(255,255,255,0) 60%)",
      },
    },
  },
};

export default config;

