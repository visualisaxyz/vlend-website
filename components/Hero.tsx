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

type VaultOverview = {
  tvl?: string;
  debtHuman?: string;
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

async function fetchVaultsAndTvl(): Promise<{
  vaults: VaultOverview[];
  totalTvl: number;
  totalDebt: number;
}> {
  try {
    const base = getApiBaseUrl();
    const [vaultsRes, tvlRes] = await Promise.all([
      fetch(`${base}/vaults/overview`, { next: { revalidate: 60 } }),
      fetch(`${base}/tvl`, { next: { revalidate: 60 } }),
    ]);

    const vaultsBody = vaultsRes.ok ? await vaultsRes.json() : [];
    const tvlBody = tvlRes.ok ? await tvlRes.json() : null;

    const vaults: VaultOverview[] = Array.isArray(vaultsBody)
      ? vaultsBody
      : [];

    const vaultTvl = vaults.reduce(
      (sum, v) => sum + (parseFloat(v.tvl ?? "0") || 0),
      0,
    );

    const totalTvl =
      typeof tvlBody === "number"
        ? tvlBody
        : tvlBody?.tvl ?? tvlBody?.totalTvl ?? vaultTvl;

    const totalDebt = vaults.reduce(
      (sum, v) => sum + (parseFloat(v.debtHuman ?? "0") || 0),
      0,
    );

    return { vaults, totalTvl, totalDebt };
  } catch {
    return { vaults: [], totalTvl: 0, totalDebt: 0 };
  }
}

export default async function Hero() {
  const [stats, aggregates] = await Promise.all([
    fetchProtocolStats(),
    fetchVaultsAndTvl(),
  ]);

  const statsTvl = stats?.tvl ? parseFloat(stats.tvl) : 0;
  const protocolTvlRaw =
    statsTvl > 0 ? statsTvl : aggregates.totalTvl ?? 0;
  // API/vaults TVL is scaled by 10; display in actual units
  const tvlRaw =
    protocolTvlRaw > 0 ? protocolTvlRaw / 10 : 14_200_000;

  const vusdFromVaults =
    aggregates.totalDebt > 0 ? aggregates.totalDebt : null;
  const vusdRaw =
    vusdFromVaults ??
    (stats?.circulatingVusd
      ? parseFloat(stats.circulatingVusd)
      : 8_100_000);

  const activeVaults =
    aggregates.vaults.length > 0
      ? aggregates.vaults.length
      : stats?.totalVaultsCreated ?? 312;

  const weth =
    stats?.collateralData?.find(
      (c) => c && c.tokenName && c.tokenName.toUpperCase() === "WETH",
    ) ?? null;
  const minCr = weth?.mlr ?? 110;

  const tvlStat =
    tvlRaw >= 1_000_000
      ? {
          value: tvlRaw / 1_000_000,
          prefix: "$",
          suffix: "M",
          label: "Total Value Locked",
          decimals: 1,
        }
      : {
          value: tvlRaw,
          prefix: "$",
          suffix: "",
          label: "Total Value Locked",
          decimals: 2,
        };

  const vusdStat =
    vusdRaw >= 1_000_000
      ? {
          value: vusdRaw / 1_000_000,
          prefix: "",
          suffix: "M",
          label: "vUSD in Circulation",
          decimals: 1,
        }
      : {
          value: vusdRaw,
          prefix: "",
          suffix: "",
          label: "vUSD in Circulation",
          decimals: 0,
        };

  const heroStats: HeroStat[] = [
    tvlStat,
    vusdStat,
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

