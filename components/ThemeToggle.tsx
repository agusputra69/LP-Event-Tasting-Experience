"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved === "light") {
      setTheme("light");
      document.documentElement.classList.add("light");
    } else {
      // Default is always dark — persist it on first visit so it never drifts
      setTheme("dark");
      document.documentElement.classList.remove("light");
      if (!saved) localStorage.setItem("theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };

  const buttonBg = theme === "dark"
    ? "bg-[#f5ece8] hover:bg-white text-[#190d0f] border-[#e6dde0] shadow-[0_8px_30px_rgba(255,255,255,0.15)]"
    : "bg-[#190d0f] hover:bg-[#2c1519] text-[#f5ece8] border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)]";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`fixed bottom-28 lg:bottom-8 right-4 lg:right-8 z-40 flex size-12 items-center justify-center rounded-full border transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md ${buttonBg}`}
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        // Sun Icon
        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        // Moon Icon
        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );
}
