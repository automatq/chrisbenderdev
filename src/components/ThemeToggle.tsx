"use client";

import React, { useSyncExternalStore } from "react";
import { ToggleButton, useTheme } from "@once-ui-system/core";

// The resolved theme lives on <html data-theme>, set by the inline script in
// layout.tsx and updated by Once UI's ThemeProvider. Subscribing to that
// attribute keeps the icon in sync without copying it into component state.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.getAttribute("data-theme") || "light";
}

function getServerSnapshot() {
  return "light";
}

export const ThemeToggle: React.FC = () => {
  const { setTheme } = useTheme();
  const currentTheme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const icon = currentTheme === "dark" ? "light" : "dark";
  const nextTheme = currentTheme === "light" ? "dark" : "light";

  return (
    <ToggleButton
      prefixIcon={icon}
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
    />
  );
};
