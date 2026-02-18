"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import logo from "../../public/svg/logo.svg";
import menu from "../../public/svg/menu.svg";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for session cookie on mount
  useEffect(() => {
    if (typeof document !== "undefined") {
      const session = document.cookie
        .split("; ")
        .find((row) => row.startsWith("q_session="));
      if (session) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  return (
    <header className="flex justify-between overflow-x-hidden lg:px-30 items-center h-30">
      <a href="/" className="flex items-center gap-5 lg:pl-0 pl-10 hover:opacity-80 transition-opacity">
        <Image
          alt="logo"
          width={35}
          height={35}
          src={logo}
          style={{ color: "transparent" }}
        />
        <h1 className="text-black font-bold">jointheQ</h1>
      </a>

      <div className="lg:text-[#EB4219] hidden gap-5 lg:flex font-bold">
        <a href="/#how">how it works</a>
        <a href="">Blog</a>
        <a href="/claim">Claim</a>
      </div>

      <a
        className="bg-[#EB4219] hidden lg:flex text-white px-5 py-3 rounded-full font-black"
        href={isLoggedIn ? "/dashboard" : "/claim?intent=signup"}
        suppressHydrationWarning
      >
        {isLoggedIn ? "Dashboard" : "START FOR FREE"}
      </a>

      <Image
        alt="menu"
        width={22}
        height={18}
        src={menu}
        className={`lg:hidden mr-10 lg:mr-0 cursor-pointer z-50 relative`}
        style={{ color: "transparent" }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />

      <nav
        className={`fixed inset-0 bg-[#ededed] lg:hidden text-[#EB4219] flex flex-col items-center justify-center w-full h-screen z-40 transition-opacity duration-300 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <ul className="grid bg-[#ededed] text-center gap-8">
          <a className="font-bold text-2xl" href="/#how" onClick={() => setIsMenuOpen(false)}>
            how it works
          </a>
          <a className="font-bold text-2xl" href="" onClick={() => setIsMenuOpen(false)}>
            Blog
          </a>
          <a className="font-bold text-2xl" href="/claim" onClick={() => setIsMenuOpen(false)}>
            Claim
          </a>
          <a
            className="bg-[#EB4219] text-white px-8 py-3 rounded-full font-black text-xl hover:bg-[#d13a15] transition-colors mt-2 inline-block max-w-[280px] w-full mx-auto"
            href={isLoggedIn ? "/dashboard" : "/claim?intent=signup"}
            onClick={() => setIsMenuOpen(false)}
            suppressHydrationWarning
          >
            {isLoggedIn ? "Dashboard" : "START FOR FREE"}
          </a>
        </ul>
      </nav>
    </header>
  );
}
