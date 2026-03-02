import Image from "next/image";
import LogoBlack from "@/app/logo-black2.png";

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-logo">
          <div className="footer-logo-mark">
            <Image
              src={LogoBlack}
              alt="vLend logo"
              width={32}
              height={32}
            />
          </div>
          <span className="footer-logo-text">vLend</span>
          <span className="footer-badge">MEGAETH</span>
        </div>
        <div className="footer-links">
          <a href="#how">Protocol</a>
          <a
            href="https://github.com/orgs/visualisaxyz/repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href="#roadmap">Roadmap</a>
          <a
            href="https://vlend.gitbook.io/vlend-docs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </a>
        </div>
        <div className="footer-right">
          Built by VISUALISA · MegaETH · MIT License
        </div>
      </div>
    </footer>
  );
}
