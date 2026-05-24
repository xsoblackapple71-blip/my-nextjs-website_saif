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

    // Send analytics payload silently; do not log in production
    fetch("/api/a", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {
      /* swallow errors to avoid noisy client logs */
    });
  }, []);

  return null;
}
