"use client";

import { useEffect } from "react";

function canRegisterServiceWorker() {
  if (typeof window === "undefined") {
    return false;
  }

  if (!("serviceWorker" in navigator)) {
    return false;
  }

  const { hostname, protocol } = window.location;
  return (
    protocol === "https:" ||
    hostname === "localhost" ||
    hostname === "127.0.0.1"
  );
}

export default function PwaRegistration() {
  useEffect(() => {
    if (!canRegisterServiceWorker()) {
      return;
    }

    const register = async () => {
      try {
        await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      } catch {
        // Ignore registration failures in unsupported or non-secure environments.
      }
    };

    void register();
  }, []);

  return null;
}
