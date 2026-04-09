"use client";

import { useEffect, useState } from "react";
import { getAdelaideTime, getAnyOpenStatus, type AdelaideTime } from "@/lib/locations";

interface Props {
  className?: string;
  size?: "sm" | "md";
}

export default function OpenNowBadge({ className = "", size = "md" }: Props) {
  const [time, setTime] = useState<AdelaideTime | null>(null);

  useEffect(() => {
    setTime(getAdelaideTime());
    const id = setInterval(() => setTime(getAdelaideTime()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!time) {
    // Reserve space to avoid layout shift
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md ${
          size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
        } ${className}`}
        style={{ minHeight: size === "sm" ? 28 : 36 }}
        aria-hidden
      />
    );
  }

  const { loc, status } = getAnyOpenStatus(time);
  const dotColor = status.isOpen ? "#22c55e" : "#ef4444";
  const padding = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full bg-white/95 text-gray-800 shadow-lg backdrop-blur-md ${padding} ${className}`}
      role="status"
      aria-live="polite"
    >
      <style>{`
        @keyframes status-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.7); }
          50%      { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
        }
        .status-dot-open { animation: status-pulse 2s ease-out infinite; }
      `}</style>
      <span
        className={`inline-block w-2.5 h-2.5 rounded-full ${status.isOpen ? "status-dot-open" : ""}`}
        style={{ backgroundColor: dotColor }}
      />
      <span className="font-bold uppercase tracking-wide">
        {status.isOpen ? "Open Now" : "Closed"}
      </span>
      <span className="text-gray-500 hidden xs:inline">·</span>
      <span className="text-gray-600 font-medium">{status.label}</span>
      <span className="text-gray-400 hidden sm:inline">· {loc.shortName}</span>
    </div>
  );
}
