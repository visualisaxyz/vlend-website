"use client";

import { useEffect, useRef } from "react";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://dapp.visualisa.xyz/";

type HeroStat = {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  decimals: number;
};

function animateCounter(
  el: HTMLElement,
  target: number,
  decimals: number,
  duration: number,
) {
  let start: number | null = null;
  const step = (ts: number) => {
    if (!start) start = ts;
    const prog = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - prog, 4);
    const val = (target * eased).toFixed(decimals);
    el.textContent = val;
    if (prog < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

type HeroClientProps = {
  stats: HeroStat[];
};

export default function HeroClient({ stats }: HeroClientProps) {
  const statsAnimated = useRef(false);

  useEffect(() => {
    if (statsAnimated.current) return;
    const timer = setTimeout(() => {
      const statVals = document.querySelectorAll(".hero-stat-val span");
      statVals.forEach((el, i) => {
        const config = stats[i];
        if (!config) return;
        animateCounter(
          el as HTMLElement,
          config.value,
          config.decimals,
          2000 + i * 200,
        );
      });
      statsAnimated.current = true;
    }, 600);
    return () => clearTimeout(timer);
  }, [stats]);

  return (
    <section id="hero">
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div className="hero-eyebrow">
          <span className="eyebrow-dot" />
          Live on MegaETH Mainnet
        </div>
        <h1 className="hero-title">
          Borrow
          <br />
          <span className="accent">Without</span>
          <br />
          <span className="dim-word">Limits</span>
        </h1>
        <p className="hero-sub">
          Deposit WETH. Mint vUSD. Keep full exposure to your collateral while
          unlocking liquidity at a minimum 110% collateral ratio.
        </p>
        <div className="hero-actions">
          <a href={APP_URL} className="btn-primary">
            Open dApp <span style={{ opacity: 0.7 }}>→</span>
          </a>
          <a
            href="https://vlend.gitbook.io/vlend-docs/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Documentation
          </a>
        </div>
        <div className="hero-stats">
          {stats.map((stat, i) => (
            <div key={i} className="hero-stat">
              <span className="hero-stat-val">
                {stat.prefix}
                <span>0</span>
                {stat.suffix}
              </span>
              <span className="hero-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="scroll-hint">
        <span>SCROLL</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

