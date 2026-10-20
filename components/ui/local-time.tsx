"use client";
import { useEffect, useState } from "react";

/**
 * The practice's local clock, for the hero's foot rail.
 *
 * Renders nothing on the server and nothing on the first client paint: the
 * time is by definition different in the two, and a mismatch here would
 * either be a hydration error or a flash of the server's stale minute. It
 * appears on the tick after mount and refreshes every 30 seconds, which is
 * enough to never show a minute that has passed.
 */
export function LocalTime({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const read = () =>
      setNow(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );
    read();
    const id = setInterval(read, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;
  return (
    <span className={className}>
      {now} IST
    </span>
  );
}
