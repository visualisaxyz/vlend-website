const marqueeItems = [
  { label: "TVL", val: <>$<span className="marquee-green">14.2M</span></> },
  { label: "vUSD Supply", val: <span className="marquee-green">8,140,000</span> },
  { label: "Active Vaults", val: "312" },
  { label: "WETH / USD", val: <>$<span className="marquee-green">3,100</span></> },
  { label: "Min CR", val: "110%" },
  { label: "Borrow Fee", val: "0.5%" },
  { label: "Liquidations (24h)", val: "6" },
  { label: "SP Deposits", val: <span className="marquee-green">$4.8M</span> },
  { label: "VLEND Supply", val: "100,000,000" },
];

export default function StatsMarquee() {
  return (
    <div className="marquee-wrap" style={{ marginTop: 0, position: "relative", zIndex: 2 }}>
      <div className="marquee-track" id="marquee">
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <div key={i} className="marquee-item">
            <span className="marquee-label">{item.label}</span>
            <span className="marquee-val">{item.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
