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
      className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 font-display text-2xl font-semibold uppercase leading-none md:text-5xl"
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
