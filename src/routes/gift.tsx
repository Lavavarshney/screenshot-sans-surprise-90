import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { scrapbook } from "@/config/scrapbook";
import { FlowerBloom } from "@/components/scrapbook/FlowerBloom";
import { Quiz } from "@/components/scrapbook/Quiz";
import { PressedFlower, Tape } from "@/components/scrapbook/decorations";

export const Route = createFileRoute("/gift")({
  head: () => ({
    meta: [
      { title: `A Little Present — Flowers & the ${scrapbook.name} Quiz` },
      {
        name: "description",
        content: "Flowers that bloom just for you, and a little best-friend quiz.",
      },
      {
        property: "og:title",
        content: `A Little Present — Flowers & the ${scrapbook.name} Quiz`,
      },
      {
        property: "og:description",
        content: "Flowers that bloom just for you, and a little best-friend quiz.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GiftPage,
});

function GiftPage() {
  const [phase, setPhase] = useState<"blooming" | "message" | "quiz">("blooming");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setPhase("message"), reduced ? 400 : 3400);
    return () => window.clearTimeout(t);
  }, []);

  if (phase === "quiz") {
    return (
      <div className="paper-grain relative min-h-screen overflow-x-clip bg-ivory">
        <Link
          to="/"
          className="absolute left-5 top-6 z-10 font-hand text-lg text-ink/70 transition hover:text-burgundy"
        >
          ← back to the cover
        </Link>
        <section className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-5 py-16">
          <Quiz />
        </section>
      </div>
    );
  }

  return (
    <div className="paper-grain confetti-field anim-page-in relative min-h-screen overflow-x-clip bg-ivory">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blush/25 to-transparent"
      />
      <Link
        to="/"
        className="absolute left-5 top-6 z-10 font-hand text-lg text-ink/70 transition hover:text-burgundy"
      >
        ← back to the cover
      </Link>

      <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-5 py-14 text-center">
        <div className="relative w-full">
          <FlowerBloom className="h-[42vh] w-full max-w-2xl md:h-[46vh]" />
        </div>

        {phase === "blooming" ? (
          <p className="font-hand text-xl text-ink/60">watch these open for you…</p>
        ) : (
          <div className="anim-fade-rise relative mt-2 max-w-xl">
            <Tape
              tone="blush"
              rotate={-3}
              className="-top-4 left-1/2 hidden -translate-x-1/2 md:block"
            />
            <p className="mb-3 font-body text-[10px] font-bold uppercase tracking-[0.35em] text-cherry">
              a note from your favourite person
            </p>
            <div
              className="relative bg-paper p-7 shadow-paper md:p-9"
              style={{ transform: "rotate(0.5deg)" }}
            >
              <PressedFlower className="absolute -left-3 -top-3 h-8 w-8" />
              <p className="font-hand text-2xl leading-9 text-ink md:text-[1.7rem] md:leading-10">
                {scrapbook.giftMessage}
              </p>
              <button
                type="button"
                onClick={() => setPhase("quiz")}
                className="mt-7 rounded-full border border-burgundy/30 bg-ivory px-8 py-3 font-display text-sm uppercase tracking-[0.3em] text-burgundy shadow-paper transition hover:-translate-y-0.5 hover:bg-blush/10"
              >
                Start the quiz
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
