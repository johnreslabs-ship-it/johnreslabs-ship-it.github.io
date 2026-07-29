import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getConsent, setConsent, loadAdsenseIfConsented, adsenseConfigured } from "../lib/consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!adsenseConfigured) return;
    const existing = getConsent();
    if (existing === "accepted") {
      loadAdsenseIfConsented();
    } else if (existing === null) {
      setVisible(true);
    }
  }, []);

  if (!adsenseConfigured || !visible) return null;

  function accept() {
    setConsent("accepted");
    loadAdsenseIfConsented();
    setVisible(false);
  }

  function decline() {
    setConsent("declined");
    setVisible(false);
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-cyan-400/20 bg-navy/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-5 py-4 flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-ink-muted flex-1">
          This site uses cookies to show ads and understand traffic. See our{" "}
          <Link to="/privacy" className="text-cyan hover:text-cyan-bright">Privacy Policy</Link> for details.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 rounded-lg border border-cyan-400/30 text-ink text-sm font-semibold hover:border-cyan-400/70 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 rounded-lg bg-cyan text-abyss text-sm font-semibold hover:bg-cyan-bright transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
