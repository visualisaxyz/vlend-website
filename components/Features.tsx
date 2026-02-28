import Reveal from "./Reveal";

const features = [
  {
    icon: "🏦",
    title: "Vault-Based Isolation",
    desc: "Each vault is a standalone smart contract. Your position never mingles with other users' collateral.",
  },
  {
    icon: "⚖️",
    title: "Two-Path Liquidations",
    desc: "Stability Pool absorbs debt first. If insufficient, a Dutch auction gives bidders a fair shot at discounted collateral.",
  },
  {
    icon: "📉",
    title: "Dutch Auctions",
    desc: "Price decays linearly over 2 hours. Wait longer for a better discount — or bid early to guarantee the win.",
  },
  {
    icon: "🔄",
    title: "Redemption Mechanism",
    desc: "When vUSD trades below peg, anyone can redeem against at-risk vaults at MCR — enforcing the $1 floor.",
  },
  {
    icon: "🔗",
    title: "Peg Stabilizer",
    desc: "Mint or burn vUSD 1:1 against USDm. Keeps the peg tight from both sides. Zero slippage, instant execution.",
  },
  {
    icon: "⚡",
    title: "VaultFactoryZapper",
    desc: "Create a vault, deposit collateral, and borrow vUSD — all in a single transaction. No multi-step UX friction.",
  },
];

export default function Features() {
  return (
    <section id="features">
      <div className="container">
        <div className="features-header">
          <Reveal>
            <div className="section-label">What sets us apart</div>
            <h2 className="section-title">Every edge case. Covered.</h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="section-sub">
              vLend was engineered for MegaETH&apos;s high-throughput environment.
              Every mechanism — from liquidations to the stabilizer — is designed
              for speed, fairness, and capital efficiency.
            </p>
          </Reveal>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <Reveal key={i} delay={([0, 1, 2, 3, 0, 1] as const)[i]}>
              <div className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
