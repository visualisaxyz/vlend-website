"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import LogoBlack from "@/app/logo-black2.png";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://dapp.visualisa.xyz/";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <div className="nav-logo">
        <div
          className="nav-logo-mark"
          style={{
            width: 32,
            height: 32,
            borderRadius: "9999px",
            overflow: "hidden",
          }}
        >
          <Image src={LogoBlack} alt="vLend logo" width={32} height={32} />
        </div>
        <span style={{ marginLeft: 8 }}>vLend</span>
        <span
          style={{
            fontSize: 10,
            color: "var(--dim)",
            border: "1px solid var(--border)",
            padding: "2px 6px",
            borderRadius: 5,
            letterSpacing: "0.1em",
            marginLeft: 8,
          }}
        >
          MEGAETH
        </span>
      </div>
      <div className="nav-links">
        <a href="#how">How it works</a>
        <a href="#features">Features</a>
        <a href="#token">Token</a>
        <a href="#roadmap">Roadmap</a>
        <a
          href="https://vlend.gitbook.io/vlend-docs/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Docs
        </a>
      </div>
      <a href={APP_URL} className="nav-cta">
        Launch dApp →
      </a>
    </nav>
  );
}
