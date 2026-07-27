import { useMemo, useState } from "react";

function ipToInt(ip: string): number | null {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) return null;
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function intToIp(int: number): string {
  return [24, 16, 8, 0].map((shift) => (int >>> shift) & 255).join(".");
}

export default function SubnetCalculator() {
  const [ip, setIp] = useState("192.168.1.10");
  const [cidr, setCidr] = useState(24);

  const result = useMemo(() => {
    const ipInt = ipToInt(ip);
    if (ipInt === null || cidr < 0 || cidr > 32) return null;

    const maskInt = cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;
    const network = (ipInt & maskInt) >>> 0;
    const broadcast = (network | (~maskInt >>> 0)) >>> 0;
    const totalHosts = Math.pow(2, 32 - cidr);
    const usable = cidr >= 31 ? 0 : totalHosts - 2;

    return {
      mask: intToIp(maskInt),
      network: intToIp(network),
      broadcast: intToIp(broadcast),
      firstUsable: cidr >= 31 ? intToIp(network) : intToIp(network + 1),
      lastUsable: cidr >= 31 ? intToIp(broadcast) : intToIp(broadcast - 1),
      totalHosts,
      usable,
    };
  }, [ip, cidr]);

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs text-ink-dim font-mono">IP Address</span>
          <input
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="mt-1 w-full px-3 py-2 rounded-md bg-navy border border-cyan-400/20 text-ink font-mono focus:outline-none focus:border-cyan-400/60"
          />
        </label>
        <label className="block">
          <span className="text-xs text-ink-dim font-mono">CIDR prefix (/{cidr})</span>
          <input
            type="range"
            min={0}
            max={32}
            value={cidr}
            onChange={(e) => setCidr(Number(e.target.value))}
            className="mt-1 w-full accent-cyan-400"
          />
        </label>
      </div>

      {result ? (
        <div className="grid sm:grid-cols-2 gap-3 font-mono text-sm">
          <Row label="Subnet Mask" value={result.mask} />
          <Row label="Network Address" value={result.network} />
          <Row label="Broadcast Address" value={result.broadcast} />
          <Row label="Usable Range" value={`${result.firstUsable} – ${result.lastUsable}`} />
          <Row label="Total Addresses" value={result.totalHosts.toLocaleString()} />
          <Row label="Usable Hosts" value={result.usable.toLocaleString()} />
        </div>
      ) : (
        <p className="text-sm text-ink-muted">Enter a valid IPv4 address to see results.</p>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-md bg-navy border border-cyan-400/10">
      <span className="text-ink-dim text-xs">{label}</span>
      <span className="text-cyan-bright">{value}</span>
    </div>
  );
}
