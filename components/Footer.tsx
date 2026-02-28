export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div className="footer-logo">
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 7,
                background: "linear-gradient(135deg,#22c55e,#15803d)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              v
            </div>
            vLend Protocol
          </div>
          <div className="footer-links">
            <a href="#how">Protocol</a>
            <a
              href="https://github.com/visualisaxyz/vlend"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a href="#roadmap">Roadmap</a>
            <a href="https://github.com/visualisaxyz/vlend" target="_blank" rel="noopener noreferrer">
              Docs
            </a>
            <a href="#">Audit</a>
          </div>
          <div className="footer-right">
            Built by VISUALISA · MegaETH · MIT License
          </div>
        </div>
      </div>
    </footer>
  );
}
