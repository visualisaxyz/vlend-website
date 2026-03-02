import type { ReactNode } from "react";

type ProtocolStatsData = {
  tvl?: string;
  circulatingVusd?: string;
  vusdInStabilityPool?: string;
  totalVaultsCreated?: number;
  collateralData?: {
    tokenName?: string;
    price?: number;
    mcr?: number;
    mlr?: number;
    borrowRate?: number | null;
  }[];
};

function getApiBaseUrl() {
  return process.env.VLEND_API_URL || "https://api.vlend.visualisa.xyz";
}

async function fetchProtocolStats(): Promise<ProtocolStatsData | null> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/protocolStats`, {
      // Revalidate periodically so stats stay fresh but cacheable
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return null;
    }

    const body = await res.json();

    // Supabase-style response: { data: [ { data: finalData, ... } ], ... }
    if (Array.isArray(body?.data) && body.data.length > 0) {
      const latest = body.data[0];
      return (latest && (latest.data as ProtocolStatsData)) || null;
    }

    // Fallback if API ever returns the finalData directly
    if (body && typeof body === "object") {
      return body as ProtocolStatsData;
    }

    return null;
  } catch {
    return null;
  }
}

function formatCompactUSD(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "--";
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(2)}`;
}

function formatInteger(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "--";
  return value.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function formatPriceUSD(value: number | null | undefined): string {
  if (value == null) return "--";
  const n = Number(value);
  if (!Number.isFinite(n)) return "--";
  return `$${n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

type MarqueeItem = {
  label: string;
  val: ReactNode;
};

export default async function StatsMarquee() {
  const stats = await fetchProtocolStats();

  const tvl = stats?.tvl ? parseFloat(stats.tvl) : null;
  const vusdSupply = stats?.circulatingVusd
    ? parseFloat(stats.circulatingVusd)
    : null;
  const activeVaults = stats?.totalVaultsCreated ?? null;
  const spDeposits = stats?.vusdInStabilityPool
    ? parseFloat(stats.vusdInStabilityPool)
    : null;

  const weth =
    stats?.collateralData?.find(
      (c) => c && c.tokenName && c.tokenName.toUpperCase() === "WETH",
    ) ?? null;

  const wethPrice =
    weth?.price != null && !Number.isNaN(Number(weth.price))
      ? Number(weth.price)
      : null;
  const minCr = weth?.mlr ?? 110;
  // API borrowRate is a fraction (e.g. 0.005 = 0.5%)
  const rawBorrowRate =
    weth?.borrowRate != null && !Number.isNaN(Number(weth.borrowRate))
      ? Number(weth.borrowRate)
      : 0.005;
  const borrowFeePct = rawBorrowRate * 100;

  const marqueeItems: MarqueeItem[] = [
    {
      label: "TVL",
      val: <>{formatCompactUSD(tvl)}</>,
    },
    {
      label: "vUSD Supply",
      val: (
        <span className="marquee-green">
          {vusdSupply != null ? formatInteger(vusdSupply) : "8,140,000"}
        </span>
      ),
    },
    {
      label: "Active Vaults",
      val: activeVaults != null ? formatInteger(activeVaults) : "312",
    },
    {
      label: "WETH / USD",
      val: (
        <>
          {wethPrice != null ? (
            <span className="marquee-green">{formatPriceUSD(wethPrice)}</span>
          ) : (
            <>
              $<span className="marquee-green">3,100</span>
            </>
          )}
        </>
      ),
    },
    {
      label: "Min CR",
      val: `${minCr}%`,
    },
    {
      label: "Borrow Fee",
      val: `${borrowFeePct.toFixed(2)}%`,
    },
    {
      label: "Liquidations (24h)",
      // Not currently exposed by the public API; show placeholder for now
      val: "--",
    },
    {
      label: "SP Deposits",
      val: (
        <span className="marquee-green">
          {spDeposits != null ? formatCompactUSD(spDeposits) : "$4.8M"}
        </span>
      ),
    },
    {
      label: "VLEND Supply",
      // Governance token total supply (static)
      val: "15,000,000",
    },
  ];

  return (
    <div
      className="marquee-wrap"
      style={{ marginTop: 0, position: "relative", zIndex: 2 }}
    >
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
