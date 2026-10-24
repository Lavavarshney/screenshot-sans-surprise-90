import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { scrapbook } from "@/config/scrapbook";
import { FlowerBloom } from "@/components/scrapbook/FlowerBloom";
import { EditablePhotoFrame } from "@/components/scrapbook/PhotoFrame";
import { PressedFlower, Tape } from "@/components/scrapbook/decorations";
import dancePhoto from "@/assets/dance.jpeg";
import fruitPhoto from "@/assets/fruit-salad.jpeg";
import friendsPhoto from "@/assets/friends-burger.jpeg";
import medalsPhoto from "@/assets/medals.jpeg";
import festivalPhoto from "@/assets/festival.jpeg";

export const Route = createFileRoute("/gift")({
  head: () => ({
    meta: [
      { title: `A Little Present — Akanxi's Scrapbook` },
      {
        name: "description",
        content: "Flowers that bloom just for you, and a personalized scrapbook page for Akanxi.",
      },
      {
        property: "og:title",
        content: `A Little Present — Akanxi's Scrapbook`,
      },
      {
        property: "og:description",
        content: "Flowers that bloom just for you, and a personalized scrapbook page for Akanxi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GiftPage,
});

function GiftPage() {
  const [phase, setPhase] = useState<"blooming" | "message" | "note">("blooming");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setPhase("message"), reduced ? 250 : 1450);
    return () => window.clearTimeout(t);
  }, []);

  if (phase === "note") {
    return (
      <div className="scrapbook-backdrop paper-grain relative min-h-screen overflow-x-clip">
        <Link
          to="/"
          className="absolute left-5 top-6 z-10 font-hand text-lg text-ink/70 transition hover:text-burgundy"
        >
          ← back to the cover
        </Link>
        <section className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-5 py-20">
          <div className="relative w-full max-w-[1440px]">
            <div className="css-bow bow-note-left" aria-hidden="true" />
            <div
              className="torn-paper relative bg-paper p-8 text-center shadow-photo md:p-12"
              style={{ transform: "rotate(-1deg)" }}
            >
              <Tape tone="blush" rotate={-4} className="-top-4 left-12" />
              <Tape tone="kraft" rotate={3} className="-top-4 right-12" />
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.4em] text-cherry">
                a page made just for you
              </p>
              <h1 className="mt-4 font-display text-5xl font-bold text-burgundy md:text-6xl">
                Akanxi&apos;s Scrapbook
              </h1>
              <p className="mx-auto mt-6 max-w-xl font-hand text-3xl leading-10 text-ink md:text-4xl">
                To my favourite person — I made you this little book of us. Every page is a tiny
                reminder of how loved you are.
              </p>
              <div className="mt-8 flex justify-center gap-4" aria-hidden="true">
                <span className="paper-flower static text-4xl">✿</span>
                <span className="text-4xl text-cherry">♥</span>
                <span className="paper-flower static text-4xl">✿</span>
              </div>
            </div>
            <section className="mt-10 w-full" aria-labelledby="photo-collage-title">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-cherry">
                your little gallery
              </p>
              <h2
                id="photo-collage-title"
                className="mt-2 font-display text-3xl font-bold text-burgundy md:text-4xl"
              >
                Five pages of memories
              </h2>
              <p className="mx-auto mt-2 max-w-lg font-hand text-2xl text-ink/80">
                Add your own photos and make this page yours.
              </p>
              <div className="akanxi-scrapbook-stage relative mt-7 text-left">
                <aside className="scrapbook-margin scrapbook-margin-left" aria-label="Scrapbook decorations">
                  <span className="margin-flower margin-flower-one" aria-hidden="true">✿</span>
                  <span className="margin-doodle margin-doodle-one" aria-hidden="true">♡</span>
                  <span className="margin-doodle margin-doodle-two" aria-hidden="true">✦</span>
                  <span className="margin-ribbon margin-ribbon-left" aria-hidden="true" />
                </aside>
                <aside className="scrapbook-margin scrapbook-margin-right" aria-label="Scrapbook decorations">
                  <span className="margin-flower margin-flower-two" aria-hidden="true">❀</span>
                  <span className="margin-doodle margin-doodle-three" aria-hidden="true">♥</span>
                  <span className="margin-doodle margin-doodle-four" aria-hidden="true">☆</span>
                  <span className="margin-ribbon margin-ribbon-right" aria-hidden="true" />
                </aside>
                <div className="akanxi-photo-collage">
                <div className="akanxi-photo-frame-1">
                  <EditablePhotoFrame
                    index={0}
                    rotate={-2}
                    variant="polaroid"
                    initialSrc={dancePhoto}
                  />
                </div>
                <div className="akanxi-photo-frame-2">
                  <EditablePhotoFrame index={1} rotate={2.5} variant="paper" initialSrc={fruitPhoto} />
                </div>
                <div className="akanxi-photo-frame-3">
                  <EditablePhotoFrame index={2} rotate={1.5} variant="polaroid" initialSrc={friendsPhoto} />
                </div>
                <div className="akanxi-photo-frame-4">
                  <EditablePhotoFrame index={3} rotate={-1.5} variant="paper" initialSrc={medalsPhoto} />
                </div>
                <div className="akanxi-photo-frame-5">
                  <EditablePhotoFrame index={4} rotate={1} variant="polaroid" initialSrc={festivalPhoto} />
                </div>
                </div>
              </div>
            </section>
            <div className="mt-8 w-full">
              <div
                className="torn-paper relative mx-auto w-full max-w-2xl bg-paper p-7 shadow-paper md:p-10 sm:rotate-[-0.8deg]"
                style={{ transform: "rotate(-0.8deg)" }}
              >
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-cherry">
                  one more little frame
                </p>
                <label className="mt-4 block text-left">
                  <span className="sr-only">Personalized note for Akanxi</span>
                  <textarea
                    rows={5}
                    defaultValue={`Dear Ak,

From our all-nighter call before Safdarjung to our random Guruvayur Temple plan, makeup-showing calls and yesterday’s hair-colouring updates at EVERY step 😭❤️ I’m so grateful for all these little moments with you. Love you loads, my girl! 🫂❤️`}
                    aria-label="Personalized note for Akanxi"
                    className="min-h-40 w-full resize-y bg-transparent font-hand text-3xl leading-9 text-burgundy outline-none placeholder:text-ink/45 focus-visible:ring-1 focus-visible:ring-burgundy"
                  />
                </label>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="scrapbook-backdrop paper-grain confetti-field anim-page-in relative min-h-screen overflow-x-clip">
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
          <div className="cake-pop" aria-hidden="true">
            <span>♥</span>
          </div>
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
              className="torn-paper relative bg-paper p-7 shadow-paper md:p-9"
              style={{ transform: "rotate(0.5deg)" }}
            >
              <PressedFlower className="absolute -left-3 -top-3 h-8 w-8" />
              <p className="font-hand text-2xl leading-9 text-ink md:text-[1.7rem] md:leading-10">
                {scrapbook.giftMessage}
              </p>
              <button
                type="button"
                onClick={() => setPhase("note")}
                className="mt-7 rounded-full border border-burgundy/30 bg-ivory px-8 py-3 font-display text-sm uppercase tracking-[0.3em] text-burgundy shadow-paper transition hover:-translate-y-0.5 hover:bg-blush/10"
              >
                Turn the page
              </button>
            </div>
            <div className="made-with-love-frame torn-paper relative mx-auto mt-7 max-w-md bg-blush/20 px-7 py-5 shadow-paper">
              <Tape tone="kraft" rotate={-5} className="-top-3 left-10" />
              <Tape tone="blush" rotate={4} className="-top-3 right-10" />
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-cherry">
                a tiny keepsake
              </p>
              <p className="mt-2 font-hand text-3xl text-burgundy">made with love, just for you</p>
              <p className="mt-1 font-hand text-xl text-ink/80">
                with every page holding a little piece of us
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
