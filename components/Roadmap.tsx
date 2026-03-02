"use client";

import { useEffect, useRef } from "react";
import Reveal from "./Reveal";

const phases = [
  {
    status: "done",
    badge: "✓ Completed",
    title: "Protocol Launch",
    desc: "Core lending infrastructure live on MegaETH mainnet with full vault mechanics, stability pool, Dutch auctions, and the stabilizer.",
    items: [
      { text: "Vault-based borrowing (WETH → vUSD)", done: true },
      { text: "Stability Pool with VLEND rewards", done: true },
      { text: "Two-path liquidations + Dutch auctions", done: true },
      { text: "vUSD Stabilizer (USDm peg maintenance)", done: true },
      { text: "VaultFactoryZapper (1-tx onboarding)", done: true },
      { text: "Full dApp UI — all 6 pages", done: true },
    ],
    side: "left",
  },
  {
    status: "active",
    badge: "⬤ In Progress — Q2 2026",
    title: "Liquidity & Token Launch",
    desc: "Bootstrap vUSD liquidity and officially distribute VLEND to the community through a public launch.",
    items: [
      { text: "Launch vUSD/USDC Uniswap v3 pool", done: false },
      { text: "Seed $100K initial liquidity via treasury", done: false },
      {
        text: "VLEND public launch via launchpad (2,250,000 VLEND)",
        done: false,
      },
      { text: "VLEND/ETH pool & initial price discovery", done: false },
      { text: "Liquidity mining incentives for vUSD LPs", done: false },
    ],
    side: "right",
  },
  {
    status: "upcoming",
    badge: "Q3 2026",
    title: "Governance & Collateral Expansion",
    desc: "Decentralise protocol control. Add new collateral types to attract a broader user base and grow TVL.",
    items: [
      { text: "On-chain governance via VLEND token", done: false },
      { text: "Add wstETH as collateral", done: false },
      {
        text: "Add BTC.b / LBTC (Lombard Bitcoin) as collateral",
        done: false,
      },
      { text: "Add USDm as collateral", done: false },
      {
        text: "Collateral-specific risk parameters via governance",
        done: false,
      },
      { text: "Borrow rate governance module", done: false },
    ],
    side: "left",
  },
  {
    status: "upcoming",
    badge: "Q4 2026",
    title: "Advanced Strategies",
    desc: "Power-user primitives that unlock sophisticated DeFi strategies on top of the vLend base layer.",
    items: [
      { text: "Leverage loops — auto-compound borrow positions", done: false },
      { text: "Zap from any token into vault collateral", done: false },
      { text: "vUSD yield strategies (deploy idle vUSD)", done: false },
      { text: "Vault migration tooling (move between chains)", done: false },
      { text: "Automated health factor alerts & guardian bots", done: false },
    ],
    side: "right",
  },
  {
    status: "upcoming",
    badge: "Q1 2027",
    title: "Ethereum Mainnet",
    desc: "Bring vLend to the biggest DeFi market. Full protocol deployment on Ethereum L1 with native integrations.",
    items: [
      { text: "Protocol deployment on Ethereum mainnet", done: false },
      { text: "Curve vUSD/3pool integration", done: false },
      { text: "Cross-chain VLEND governance bridge", done: false },
      { text: "Protocol security audit (Tier 1 firm)", done: false },
      { text: "Bug bounty program — up to $500K", done: false },
    ],
    side: "left",
  },
  {
    status: "upcoming",
    badge: "2027 +",
    title: "Multichain. Unstoppable.",
    desc: "Expand beyond Ethereum. Make vUSD a cross-chain stablecoin. Position VLEND as the governance backbone of a multichain lending network.",
    items: [
      { text: "Deploy on Arbitrum, Base, Optimism", done: false },
      { text: "LayerZero cross-chain vUSD bridge", done: false },
      { text: "Real-world asset (RWA) collateral support", done: false },
      { text: "DAO full decentralization milestone", done: false },
      { text: "vLend v2 — unified multichain liquidity", done: false },
    ],
    side: "right",
  },
];

export default function Roadmap() {
  const sectionRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const fill = fillRef.current;
    if (!section || !fill) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || doneRef.current) return;
        doneRef.current = true;
        setTimeout(() => {
          fill.style.height = "30%";
        }, 400);
      },
      { threshold: 0.05 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="roadmap" ref={sectionRef}>
      <div className="container">
        <div className="roadmap-header">
          <Reveal>
            <div className="section-label">What&apos;s next</div>
            <h2 className="section-title">
              Built to last.
              <br />
              Expanding to lead.
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "var(--muted)",
                marginTop: 16,
                maxWidth: 500,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              From MegaETH to Ethereum mainnet — a protocol built for the long
              game.
            </p>
          </Reveal>
        </div>

        <div className="roadmap-track">
          <div className="roadmap-line">
            <div
              className="roadmap-line-fill"
              id="roadmap-fill"
              ref={fillRef}
              style={{ height: 0 }}
            />
          </div>

          {phases.map((phase, i) => (
            <div key={i} className="roadmap-phase">
              {phase.side === "left" ? (
                <>
                  <div
                    className="phase-content"
                    style={{
                      gridColumn: 1,
                      textAlign: "right",
                      paddingRight: 40,
                    }}
                  >
                    <Reveal>
                      <div
                        className={`phase-card ${
                          phase.status === "done"
                            ? "done-card"
                            : phase.status === "active"
                              ? "active-card"
                              : ""
                        }`}
                      >
                        <span
                          className={`phase-badge ${
                            phase.status === "done"
                              ? "done"
                              : phase.status === "active"
                                ? "active"
                                : "upcoming"
                          }`}
                        >
                          {phase.badge}
                        </span>
                        <div className="phase-title">{phase.title}</div>
                        <div className="phase-desc">{phase.desc}</div>
                        <div className="phase-items">
                          {phase.items.map((item, j) => (
                            <div
                              key={j}
                              className={`phase-item ${
                                item.done ? "done-item" : ""
                              }`}
                            >
                              <span
                                className="phase-item-icon"
                                style={
                                  !item.done && phase.status === "active"
                                    ? { color: "var(--green)" }
                                    : {}
                                }
                              >
                                {item.done
                                  ? "✓"
                                  : phase.status === "active"
                                    ? "→"
                                    : "◦"}
                              </span>
                              {item.text}
                            </div>
                          ))}
                        </div>
                      </div>
                    </Reveal>
                  </div>
                  <div className="phase-node">
                    <div
                      className={`phase-dot ${
                        phase.status === "done"
                          ? "done"
                          : phase.status === "active"
                            ? "active"
                            : ""
                      }`}
                      style={
                        phase.status === "active"
                          ? { position: "relative" }
                          : {}
                      }
                    />
                  </div>
                  <div style={{ gridColumn: 3 }} />
                </>
              ) : (
                <>
                  <div style={{ gridColumn: 1 }} />
                  <div className="phase-node">
                    <div
                      className={`phase-dot ${
                        phase.status === "done"
                          ? "done"
                          : phase.status === "active"
                            ? "active"
                            : ""
                      }`}
                      style={
                        phase.status === "active"
                          ? { position: "relative" }
                          : {}
                      }
                    />
                  </div>
                  <div
                    className="phase-content"
                    style={{ gridColumn: 3, paddingLeft: 40 }}
                  >
                    <Reveal>
                      <div
                        className={`phase-card ${
                          phase.status === "done"
                            ? "done-card"
                            : phase.status === "active"
                              ? "active-card"
                              : ""
                        }`}
                      >
                        <span
                          className={`phase-badge ${
                            phase.status === "done"
                              ? "done"
                              : phase.status === "active"
                                ? "active"
                                : "upcoming"
                          }`}
                        >
                          {phase.badge}
                        </span>
                        <div className="phase-title">{phase.title}</div>
                        <div className="phase-desc">{phase.desc}</div>
                        <div className="phase-items">
                          {phase.items.map((item, j) => (
                            <div
                              key={j}
                              className={`phase-item ${
                                item.done ? "done-item" : ""
                              }`}
                            >
                              <span
                                className="phase-item-icon"
                                style={
                                  !item.done && phase.status === "active"
                                    ? { color: "var(--green)" }
                                    : {}
                                }
                              >
                                {item.done
                                  ? "✓"
                                  : phase.status === "active"
                                    ? "→"
                                    : "◦"}
                              </span>
                              {item.text}
                            </div>
                          ))}
                        </div>
                      </div>
                    </Reveal>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
