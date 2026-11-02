"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ModeToggle({ className }: { className?: string }) {
  // resolvedTheme is "light" or "dark" even when the setting is "system";
  // comparing the raw theme would make the first click a no-op on a dark OS.
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="link"
      size="icon"
      className={cn(className)}
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {/* Both icons render; CSS picks one from the <html> class, so there is no hydration mismatch. */}
      <SunIcon className="hidden h-full w-full dark:block" />
      <MoonIcon className="h-full w-full dark:hidden" />
    </Button>
  );
}
