import Reveal from "./Reveal";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "#";

export default function CTA() {
  return (
    <section id="cta">
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <Reveal>
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--green)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Start now
          </p>
          <h2 className="cta-title">
            Your collateral.
            <br />
            Your liquidity.
          </h2>
          <p className="cta-sub">
            Join 312 vaults already borrowing on MegaETH.
          </p>
          <div className="cta-actions">
            <a href={APP_URL} className="btn-primary">
              Open App <span style={{ opacity: 0.7 }}>→</span>
            </a>
            <a
              href="https://github.com/visualisaxyz/vlend"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              View on GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
