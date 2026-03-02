"use client";

import { useEffect, useRef } from "react";
import Reveal from "./Reveal";

const tokenBreakdown = [
  {
    name: "Community / SP Rewards",
    pct: 35,
    gradient: "linear-gradient(90deg,#22c55e,#4ade80)",
  },
  {
    name: "Ecosystem / Grants",
    pct: 20,
    gradient: "linear-gradient(90deg,#8b5cf6,#a78bfa)",
  },
  {
    name: "Protocol Treasury",
    pct: 20,
    gradient: "linear-gradient(90deg,#eab308,#fde047)",
  },
  {
    name: "Public Launch",
    pct: 15,
    gradient: "linear-gradient(90deg,#ef4444,#f87171)",
  },
  {
    name: "Team",
    pct: 10,
    gradient: "linear-gradient(90deg,#3b82f6,#60a5fa)",
  },
];

export default function Tokenomics() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const counterEl = counterRef.current;
    if (!section || !counterEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || doneRef.current) return;
        doneRef.current = true;

        document.querySelectorAll(".token-bar-fill").forEach((bar) => {
          const target = parseFloat(
            (bar as HTMLElement).getAttribute("data-target") || "0"
          );
          (bar as HTMLElement).style.width = target + "%";
        });

        const start = 0;
        const end = 15;
        const duration = 1800;
        const step = (timestamp: number) => {
          const startTime = (step as unknown as { startTime?: number }).startTime ?? timestamp;
          (step as unknown as { startTime?: number }).startTime = startTime;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          counterEl.textContent = Math.round(start + (end - start) * eased) + "M";
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="token" ref={sectionRef}>
      <div className="container">
        <div className="token-layout">
          <div>
            <Reveal>
              <div className="section-label">Tokenomics</div>
              <h2 className="section-title">
                VLEND.
                <br />
                The governance layer.
              </h2>
              <p className="section-sub" style={{ marginBottom: 36 }}>
                15 million VLEND tokens govern the protocol. Stake, earn, vote.
                Every parameter — from the borrow fee to collateral types — is
                decided on-chain.
              </p>
              <div className="token-breakdown" id="token-breakdown">
                {tokenBreakdown.map((row, i) => (
                  <div key={i} className="token-row">
                    <div className="token-row-top">
                      <span className="token-row-name">{row.name}</span>
                      <span className="token-row-pct">{row.pct}%</span>
                    </div>
                    <div className="token-bar">
                      <div
                        className="token-bar-fill"
                        style={{
                          width: 0,
                          background: row.gradient,
                        }}
                        data-target={row.pct}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <div className="token-ring-wrap">
              <div className="token-ring">
                <svg viewBox="0 0 280 280" width={280} height={280}>
                  <circle
                    cx={140}
                    cy={140}
                    r={110}
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth={22}
                  />
                  <circle
                    cx={140}
                    cy={140}
                    r={110}
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth={22}
                    strokeDasharray="242 449"
                    strokeDashoffset={0}
                    strokeLinecap="round"
                  />
                  <circle
                    cx={140}
                    cy={140}
                    r={110}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth={22}
                    strokeDasharray="69 622"
                    strokeDashoffset={-250}
                    strokeLinecap="round"
                  />
                  <circle
                    cx={140}
                    cy={140}
                    r={110}
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth={22}
                    strokeDasharray="138 553"
                    strokeDashoffset={-327}
                    strokeLinecap="round"
                  />
                  <circle
                    cx={140}
                    cy={140}
                    r={110}
                    fill="none"
                    stroke="#eab308"
                    strokeWidth={22}
                    strokeDasharray="138 553"
                    strokeDashoffset={-473}
                    strokeLinecap="round"
                  />
                  <circle
                    cx={140}
                    cy={140}
                    r={110}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth={22}
                    strokeDasharray="104 587"
                    strokeDashoffset={-619}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="token-ring-center">
                  <span className="ring-val" ref={counterRef}>
                    0M
                  </span>
                  <span className="ring-label">Total Supply</span>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle,rgba(34,197,94,0.08),transparent)",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
