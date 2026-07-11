// components/analytics-beacon.tsx
"use client";

import { useEffect } from "react";

export default function AnalyticsBeacon() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const payload = {
      p: window.location.pathname + window.location.search,
      r: document.referrer,
      t: document.title,
    };

    const body = JSON.stringify(payload);
    const url = "/api/a";

    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(url, body);
      return;
    }

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    }).catch(() => {
      /* swallow errors to avoid noisy client logs */
    });
  }, []);

  return null;
}
