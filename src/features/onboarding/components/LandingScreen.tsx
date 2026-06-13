"use client";

import { useEffect, useState } from "react";

import DesktopLanding from "./landing/DesktopLanding";
import DesktopInstallModal from "./landing/DesktopInstallModal";
import InstalledMobileOnboarding from "./landing/InstalledMobileOnboarding";
import { DESKTOP_NAV_ITEMS, type DesktopNavId } from "./landing/landingData";

export default function LandingScreen() {
  const [activeDesktopNavId, setActiveDesktopNavId] = useState<DesktopNavId>("fitur");
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  useEffect(() => {
    if (!isInstallModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsInstallModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isInstallModalOpen]);

  useEffect(() => {
    const desktopSections = DESKTOP_NAV_ITEMS.map((item) =>
      document.getElementById(item.id),
    ).filter((section): section is HTMLElement => section !== null);

    if (desktopSections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length === 0) {
          return;
        }

        setActiveDesktopNavId(
          visibleEntries[0].target.id as DesktopNavId,
        );
      },
      {
        rootMargin: "-18% 0px -58% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    );

    desktopSections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <DesktopLanding
        activeDesktopNavId={activeDesktopNavId}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />
      <InstalledMobileOnboarding />

      <DesktopInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />
    </>
  );
}
