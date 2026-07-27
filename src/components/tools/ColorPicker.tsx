import { useState } from "react";

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function ColorPicker() {
  const [hex, setHex] = useState("#4fc3ff");
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="color"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          className="w-16 h-16 rounded-lg border border-cyan-400/20 bg-transparent cursor-pointer"
        />
        <input
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          className="px-3 py-2 rounded-md bg-navy border border-cyan-400/20 text-ink font-mono focus:outline-none focus:border-cyan-400/60"
        />
      </div>
      <div className="grid sm:grid-cols-3 gap-3 font-mono text-sm">
        <Row label="HEX" value={hex.toUpperCase()} />
        <Row label="RGB" value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
        <Row label="HSL" value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
      </div>
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
