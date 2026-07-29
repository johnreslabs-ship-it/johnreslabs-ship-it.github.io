const CONSENT_KEY = "johnreslab-cookie-consent";

export type ConsentStatus = "accepted" | "declined" | null;

export function getConsent(): ConsentStatus {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  if (value === "accepted" || value === "declined") return value;
  return null;
}

export function setConsent(status: "accepted" | "declined") {
  window.localStorage.setItem(CONSENT_KEY, status);
}

const ADSENSE_CLIENT_ID = import.meta.env.VITE_ADSENSE_CLIENT_ID as string | undefined;

export const adsenseConfigured = Boolean(ADSENSE_CLIENT_ID);

let scriptLoaded = false;

export function loadAdsenseIfConsented() {
  if (!adsenseConfigured || scriptLoaded) return;
  if (getConsent() !== "accepted") return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);
  scriptLoaded = true;
}
