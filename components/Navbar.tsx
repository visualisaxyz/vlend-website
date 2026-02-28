"use client";

import { useEffect, useState } from "react";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "#";

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
        <div className="nav-logo-mark">v</div>
        vLend
        <span
          style={{
            fontSize: "10px",
            color: "var(--dim)",
            border: "1px solid var(--border)",
            padding: "2px 6px",
            borderRadius: "5px",
            letterSpacing: "0.1em",
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
        <a href="https://github.com/visualisaxyz/vlend" target="_blank" rel="noopener noreferrer">
          Docs
        </a>
      </div>
      <a href={APP_URL} className="nav-cta">
        Launch App →
      </a>
    </nav>
  );
}
