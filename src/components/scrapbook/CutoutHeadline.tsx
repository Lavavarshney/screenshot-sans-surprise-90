/**
 * Cutout-lettering headline: each letter sits on its own little paper tile,
 * like letters clipped from a magazine — understated tilts, muted papers.
 */
const TILES = [
  "bg-paper text-burgundy",
  "bg-kraft/50 text-ink",
  "bg-blush/25 text-burgundy",
  "bg-paper text-ink",
  "bg-kraft/35 text-burgundy",
  "bg-blush/20 text-ink",
] as const;

const TILTS = [-2, 1.5, -1, 2, -1.5, 1, -2.5, 2.5];

export function CutoutHeadline({ text }: { text: string }) {
  const words = text.split(" ");
  let letterIndex = 0;

  return (
    <h1
      aria-label={text}
      className="flex w-full flex-wrap items-center justify-center gap-x-1.5 gap-y-2 px-1 font-display text-[clamp(1.65rem,9vw,3rem)] font-black uppercase leading-[0.92] tracking-tight sm:gap-x-3 sm:gap-y-3 sm:text-4xl md:text-6xl [&>span>span]:[-webkit-text-stroke:1.25px_currentColor]"
    >
      {words.map((word, wi) => (
        <span key={wi} aria-hidden="true" className="flex gap-1">
          {word.split("").map((ch, ci) => {
            const i = letterIndex++;
            return (
              <span
                key={ci}
                className={`inline-block rounded-[3px] px-1.5 py-1 shadow-paper ${TILES[i % TILES.length]}`}
                style={{ transform: `rotate(${TILTS[i % TILTS.length]}deg)` }}
              >
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
