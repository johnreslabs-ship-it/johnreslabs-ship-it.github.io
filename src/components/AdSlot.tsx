import { useEffect } from "react";
import { adsenseConfigured, getConsent } from "../lib/consent";

type AdSlotProps = {
  slot: string;
  className?: string;
};

export default function AdSlot({ slot, className = "" }: AdSlotProps) {
  const enabled = adsenseConfigured && getConsent() === "accepted";

  useEffect(() => {
    if (!enabled) return;
    try {
      // @ts-expect-error adsbygoogle is injected globally by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense script may not have finished loading yet — safe to ignore.
    }
  }, [enabled]);

  if (!enabled) return null;

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      style={{ display: "block" }}
      data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
