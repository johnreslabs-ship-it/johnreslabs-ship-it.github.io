import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

export default function QrGenerator() {
  const [text, setText] = useState("https://www.youtube.com/@JohnresLab");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, text || " ", {
      width: 220,
      margin: 1,
      color: { dark: "#eaf3ff", light: "#0b1220" },
    }).catch(() => {});
  }, [text]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="space-y-4">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full px-3 py-2 rounded-md bg-navy border border-cyan-400/20 text-ink font-mono text-sm focus:outline-none focus:border-cyan-400/60"
        placeholder="Text or URL to encode…"
      />
      <div className="flex justify-center p-4 rounded-lg bg-navy border border-cyan-400/10">
        <canvas ref={canvasRef} />
      </div>
      <button
        onClick={download}
        className="px-4 py-2 rounded-lg bg-cyan text-abyss font-semibold text-sm hover:bg-cyan-bright transition-colors"
      >
        Download PNG
      </button>
    </div>
  );
}
