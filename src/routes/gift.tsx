import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { scrapbook } from "@/config/scrapbook";
import { FlowerBloom } from "@/components/scrapbook/FlowerBloom";
import { EditablePhotoFrame } from "@/components/scrapbook/PhotoFrame";
import { PressedFlower, Tape } from "@/components/scrapbook/decorations";

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
          <div className="relative w-full max-w-2xl">
            <div className="css-bow bow-note-left" aria-hidden="true" />
            <div className="torn-paper relative bg-paper p-8 text-center shadow-photo md:p-12" style={{ transform: "rotate(-1deg)" }}>
              <Tape tone="blush" rotate={-4} className="-top-4 left-12" />
              <Tape tone="kraft" rotate={3} className="-top-4 right-12" />
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.4em] text-cherry">a page made just for you</p>
              <h1 className="mt-4 font-display text-5xl font-bold text-burgundy md:text-6xl">Akanxi&apos;s Scrapbook</h1>
              <p className="mx-auto mt-6 max-w-xl font-hand text-3xl leading-10 text-ink md:text-4xl">
                To my favourite person — I made you this little book of us. Every page is a tiny reminder of how loved you are.
              </p>
              <div className="mt-8 flex justify-center gap-4" aria-hidden="true">
                <span className="paper-flower static text-4xl">✿</span>
                <span className="text-4xl text-cherry">♥</span>
                <span className="paper-flower static text-4xl">✿</span>
              </div>
            </div>
            <section className="mt-10 w-full" aria-labelledby="photo-collage-title">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-cherry">your little gallery</p>
              <h2 id="photo-collage-title" className="mt-2 font-display text-3xl font-bold text-burgundy md:text-4xl">Five pages of memories</h2>
              <p className="mx-auto mt-2 max-w-lg font-hand text-2xl text-ink/80">Add your own photos and make this page yours.</p>
              <div className="akanxi-photo-collage mt-7 text-left">
                <div className="akanxi-photo-frame-1"><EditablePhotoFrame index={0} rotate={-2} variant="polaroid" /></div>
                <div className="akanxi-photo-frame-2"><EditablePhotoFrame index={1} rotate={2.5} variant="paper" /></div>
                <div className="akanxi-photo-frame-3"><EditablePhotoFrame index={2} rotate={1.5} variant="polaroid" /></div>
                <div className="akanxi-photo-frame-4"><EditablePhotoFrame index={3} rotate={-1.5} variant="paper" /></div>
                <div className="akanxi-photo-frame-5"><EditablePhotoFrame index={4} rotate={1} variant="polaroid" /></div>
              </div>
            </section>
            <div className="mt-8 grid w-full gap-5 sm:grid-cols-2">
              <div className="torn-paper relative bg-blush/20 p-7 shadow-paper md:p-9 sm:rotate-[-1.2deg]">
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-cherry">one more little frame</p>
                <p className="mt-3 font-hand text-3xl leading-9 text-ink">Thank you for making ordinary days feel like celebrations. I hope this scrapbook makes you smile as much as you make me smile.</p>
              </div>
              <div className="torn-paper relative bg-paper p-7 shadow-paper md:p-9 sm:rotate-[1.4deg]">
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-cherry">a favourite memory</p>
                <p className="mt-3 font-hand text-3xl leading-9 text-ink">The best moments are the little ones we keep replaying and laughing about together.</p>
              </div>
              <div className="torn-paper relative bg-kraft/35 p-7 shadow-paper md:p-9 sm:rotate-[1deg]">
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-cherry">for your keepsake box</p>
                <p className="mt-3 font-hand text-3xl leading-9 text-ink">You make every ordinary day feel a little more magical.</p>
              </div>
              <div className="torn-paper relative bg-blush/15 p-7 shadow-paper md:p-9 sm:rotate-[-1.5deg]">
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-cherry">a tiny promise</p>
                <p className="mt-3 font-hand text-3xl leading-9 text-ink">There will always be more memories, more pages, and more reasons to celebrate you.</p>
              </div>
              <div className="torn-paper relative col-span-full mx-auto w-full max-w-xl bg-paper p-7 shadow-paper md:p-9" style={{ transform: "rotate(0.8deg)" }}>
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-cherry">made with love</p>
                <p className="mt-3 font-hand text-3xl leading-9 text-burgundy">For Akanxi, with all my love — today, tomorrow, and every page after this one.</p>
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
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-cherry">a tiny keepsake</p>
              <p className="mt-2 font-hand text-3xl text-burgundy">made with love, just for you</p>
              <p className="mt-1 font-hand text-xl text-ink/80">with every page holding a little piece of us</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
