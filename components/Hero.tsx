import HeroClient from "./HeroClient";

type ProtocolStatsData = {
  tvl?: string;
  circulatingVusd?: string;
  vusdInStabilityPool?: string;
  totalVaultsCreated?: number;
  collateralData?: {
    tokenName?: string;
    mcr?: number;
    mlr?: number;
  }[];
};

type HeroStat = {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  decimals: number;
};

function getApiBaseUrl() {
  return process.env.VLEND_API_URL || "https://api.vlend.visualisa.xyz";
}

async function fetchProtocolStats(): Promise<ProtocolStatsData | null> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/protocolStats`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return null;
    }

    const body = await res.json();

    if (Array.isArray(body?.data) && body.data.length > 0) {
      const latest = body.data[0];
      return (latest && (latest.data as ProtocolStatsData)) || null;
    }

    if (body && typeof body === "object") {
      return body as ProtocolStatsData;
    }

    return null;
  } catch {
    return null;
  }
}

export default async function Hero() {
  const stats = await fetchProtocolStats();

  const tvlRaw = stats?.tvl ? parseFloat(stats.tvl) : 14_200_000;
  const vusdRaw = stats?.circulatingVusd
    ? parseFloat(stats.circulatingVusd)
    : 8_100_000;
  const activeVaults = stats?.totalVaultsCreated ?? 312;

  const weth =
    stats?.collateralData?.find(
      (c) => c && c.tokenName && c.tokenName.toUpperCase() === "WETH",
    ) ?? null;
  const minCr = weth?.mlr ?? 110;

  const heroStats: HeroStat[] = [
    {
      value: tvlRaw / 1_000_000,
      prefix: "$",
      suffix: "M",
      label: "Total Value Locked",
      decimals: 1,
    },
    {
      value: vusdRaw / 1_000_000,
      prefix: "",
      suffix: "M",
      label: "vUSD in Circulation",
      decimals: 1,
    },
    {
      value: activeVaults,
      prefix: "",
      suffix: "",
      label: "Active Vaults",
      decimals: 0,
    },
    {
      value: minCr,
      prefix: "",
      suffix: "%",
      label: "Minimum CR",
      decimals: 0,
    },
  ];

  return <HeroClient stats={heroStats} />;
}

