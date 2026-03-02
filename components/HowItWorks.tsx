import Reveal from "./Reveal";

const cards = [
  {
    num: "01",
    icon: "🔒",
    title: "Deposit Collateral",
    desc: "Lock WETH into your vault. Your collateral stays in your vault — no pooling, no counterparty exposure.",
    tag: "WETH · Chainlink Oracle",
  },
  {
    num: "02",
    icon: "⚡",
    title: "Mint vUSD",
    desc: "Borrow vUSD against your collateral at a minimum 110% CR. Deposit & Mint in one transaction.",
    tag: "0.5% borrow fee",
  },
  {
    num: "03",
    icon: "📊",
    title: "Manage Your Vault",
    desc: "Monitor your health factor in real time. Deposit more, repay debt, or redeem — all from one dashboard.",
    tag: "HF · Health Factor",
  },
  {
    num: "04",
    icon: "💎",
    title: "Earn with VLEND",
    desc: "Stake vUSD in the Stability Pool to backstop liquidations and earn VLEND rewards passively.",
    tag: "Stability Pool",
  },
];

export default function HowItWorks() {
  return (
    <section id="how">
      <div className="container">
        <Reveal>
          <div className="section-label">Protocol mechanics</div>
          <h2 className="section-title">
            Simple by design.
            <br />
            Powerful by nature.
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <div className="how-grid">
            {cards.map((card) => (
              <div key={card.num} className="how-card" data-num={card.num}>
                <div className="how-icon">{card.icon}</div>
                <div className="how-title">{card.title}</div>
                <div className="how-desc">{card.desc}</div>
                <span className="how-tag">{card.tag}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
