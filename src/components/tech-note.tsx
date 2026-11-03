"use client";

import { useCallback, useRef, useState } from "react";
import { Braces } from "lucide-react";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/* A tooltip would have been the obvious choice, but Radix closes one on the
   pointerleave that follows a tap, so it never opens on touch. A popover opens
   from a real click — tap, Enter and Space all land — and hover is layered on
   top for pointer devices. Pressing pins it open so leaving the trigger doesn't
   snatch the text away mid-sentence; Escape and an outside click close it. */
export default function TechNote({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pinned = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openOnHover = useCallback(
    (event: React.PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      cancelClose();
      setOpen(true);
    },
    [cancelClose]
  );

  // A short grace period so the pointer can cross the gap into the panel.
  const closeOnLeave = useCallback(
    (event: React.PointerEvent) => {
      if (event.pointerType !== "mouse" || pinned.current) return;
      cancelClose();
      closeTimer.current = setTimeout(() => setOpen(false), 140);
    },
    [cancelClose]
  );

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        cancelClose();
        setOpen(next);
        if (!next) pinned.current = false;
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          onPointerDown={() => {
            pinned.current = true;
          }}
          onPointerEnter={openOnHover}
          onPointerLeave={closeOnLeave}
          aria-label={`Technical notes on ${label}`}
          className="group/tech flex w-fit items-center gap-1.5 rounded-md text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=open]:text-foreground"
        >
          <Braces className="size-3" aria-hidden="true" />
          <span className="underline decoration-dotted decoration-muted-foreground/50 underline-offset-4 group-hover/tech:decoration-foreground/60">
            Technical notes
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        collisionPadding={16}
        onOpenAutoFocus={(event) => event.preventDefault()}
        onPointerEnter={cancelClose}
        onPointerLeave={closeOnLeave}
        className="max-w-[min(24rem,calc(100vw-2rem))] text-pretty px-3.5 py-2.5 text-xs leading-relaxed"
      >
        {children}
        <PopoverArrow />
      </PopoverContent>
    </Popover>
  );
}
