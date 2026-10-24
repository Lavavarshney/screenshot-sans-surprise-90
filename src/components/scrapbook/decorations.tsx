import type { CSSProperties } from "react";

/* ---------------- Washi tape strip ---------------- */

type TapeProps = {
  className?: string;
  rotate?: number;
  tone?: "kraft" | "blush" | "sage";
  style?: CSSProperties;
};

export function Tape({ className = "", rotate = 0, tone = "kraft", style }: TapeProps) {
  const tones = {
    kraft: "bg-kraft/70",
    blush: "bg-blush/45",
    sage: "bg-sage/45",
  } as const;

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute block h-6 w-16 ${tones[tone]} ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        clipPath: "polygon(2% 8%, 98% 0%, 100% 92%, 1% 100%)",
        boxShadow: "0 1px 2px rgb(85 71 64 / 0.12)",
        ...style,
      }}
    />
  );
}

/* ---------------- Pressed flower ---------------- */

export function PressedFlower({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx="20"
          cy="11"
          rx="5"
          ry="9.5"
          fill="var(--blush)"
          opacity="0.72"
          transform={`rotate(${a} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="3.4" fill="var(--burgundy)" opacity="0.8" />
    </svg>
  );
}

/* ---------------- Leafy sprig ---------------- */

export function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 90" className={className} aria-hidden="true" fill="none">
      <path
        d="M30 88 C 30 60, 28 40, 32 6"
        stroke="var(--sage)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <ellipse cx="22" cy="46" rx="9" ry="4" fill="var(--sage)" opacity="0.8" transform="rotate(-32 22 46)" />
      <ellipse cx="40" cy="30" rx="9" ry="4" fill="var(--sage)" opacity="0.65" transform="rotate(30 40 30)" />
      <ellipse cx="24" cy="66" rx="8" ry="3.5" fill="var(--sage)" opacity="0.7" transform="rotate(-28 24 66)" />
    </svg>
  );
}

/* ---------------- Fine-line doodles ---------------- */

export function DoodleHeart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <path
        d="M16 27 C 6 20, 3 13, 6 8.5 C 8.5 5, 13.5 5.5, 16 9.5 C 18.5 5.5, 23.5 5, 26 8.5 C 29 13, 26 20, 16 27 Z"
        stroke="var(--blush)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleStar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-8 -8 16 16" className={className} aria-hidden="true">
      <path d="M0 -7 L1.6 -1.6 L7 0 L1.6 1.6 L0 7 L-1.6 1.6 L-7 0 L-1.6 -1.6 Z" fill="currentColor" />
    </svg>
  );
}

export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 20" className={className} aria-hidden="true" fill="none">
      <path
        d="M2 12 C 12 2, 22 2, 32 12 S 52 22, 62 12 S 82 2, 92 12 S 112 22, 118 10"
        stroke="var(--ink)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
