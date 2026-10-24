import type { CSSProperties } from "react";

type BloomSpec = {
  x: number;
  y: number;
  size: number;
  delay: number;
  petal: string;
  center: string;
};

const FLOWERS: BloomSpec[] = [
  { x: 150, y: 190, size: 46, delay: 1.0, petal: "var(--blush)", center: "var(--burgundy)" },
  { x: 300, y: 112, size: 56, delay: 1.35, petal: "var(--blush)", center: "var(--kraft)" },
  {
    x: 445,
    y: 205,
    size: 40,
    delay: 1.65,
    petal: "color-mix(in oklab, var(--blush) 60%, var(--paper))",
    center: "var(--burgundy)",
  },
  { x: 520, y: 288, size: 25, delay: 1.95, petal: "var(--sage)", center: "var(--kraft)" },
  { x: 78, y: 288, size: 25, delay: 2.15, petal: "var(--blush)", center: "var(--kraft)" },
];

const SPARKLE_PATH = "M0 -6 L1.3 -1.3 L6 0 L1.3 1.3 L0 6 L-1.3 1.3 L-6 0 L-1.3 -1.3 Z";

const SPARKLES = [
  { x: 210, y: 90, s: 0.8, d: 2.3 },
  { x: 370, y: 60, s: 1, d: 2.6 },
  { x: 500, y: 130, s: 0.7, d: 2.9 },
  { x: 110, y: 120, s: 0.7, d: 3.1 },
  { x: 260, y: 250, s: 0.6, d: 3.4 },
  { x: 545, y: 210, s: 0.8, d: 3.6 },
];

function stemPath(x: number, topY: number, lean: number) {
  return `M ${x} 376 C ${x - lean} 320, ${x + lean} 262, ${x + lean * 0.4} ${topY}`;
}

function Bloom({ spec }: { spec: BloomSpec }) {
  const { x, y, size, delay, petal, center } = spec;
  return (
    <g transform={`translate(${x} ${y})`}>
      <g
        className="anim-bloom"
        style={
          {
            animationDelay: `${delay}s`,
            transformBox: "fill-box",
            transformOrigin: "50% 88%",
          } as CSSProperties
        }
      >
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse
            key={a}
            cx="0"
            cy={-size * 0.55}
            rx={size * 0.26}
            ry={size * 0.55}
            fill={petal}
            opacity="0.82"
            transform={`rotate(${a})`}
          />
        ))}
      </g>
      <circle
        r={size * 0.16}
        fill={center}
        opacity="0.9"
        className="anim-bloom"
        style={{ animationDelay: `${delay + 0.35}s` }}
      />
    </g>
  );
}

/** Gentle flower-blooming animation — muted botanicals, tiny sparkles. */
export function FlowerBloom({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 380"
      className={className}
      role="img"
      aria-label="Delicate flowers blooming for you"
    >
      {/* stems grow first */}
      {FLOWERS.map((f, i) => (
        <path
          key={i}
          d={stemPath(f.x, f.y + f.size * 0.7, i % 2 === 0 ? 16 : -14)}
          fill="none"
          stroke="var(--sage)"
          strokeWidth="3.5"
          strokeLinecap="round"
          pathLength={1}
          className="anim-stem"
          style={{ "--stem-length": 1, animationDelay: `${Math.max(0, f.delay - 0.9)}s` } as CSSProperties}
        />
      ))}

      {/* leaves */}
      {[
        { x: 168, y: 300, r: -30 },
        { x: 430, y: 320, r: 28 },
        { x: 285, y: 330, r: -24 },
      ].map((l, i) => (
        <ellipse
          key={i}
          cx={l.x}
          cy={l.y}
          rx="15"
          ry="5.5"
          fill="var(--sage)"
          opacity="0.75"
          transform={`rotate(${l.r} ${l.x} ${l.y})`}
          className="anim-bloom"
          style={{ animationDelay: `${0.9 + i * 0.2}s` }}
        />
      ))}

      {FLOWERS.map((f, i) => (
        <Bloom key={i} spec={f} />
      ))}

      {/* tiny restrained sparkles */}
      {SPARKLES.map((s, i) => (
        <path
          key={i}
          d={SPARKLE_PATH}
          fill="color-mix(in oklab, var(--burgundy) 45%, transparent)"
          transform={`translate(${s.x} ${s.y}) scale(${s.s})`}
          className="anim-twinkle"
          style={{ animationDelay: `${s.d}s` }}
        />
      ))}
    </svg>
  );
}
