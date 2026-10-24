import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { scrapbook } from "@/config/scrapbook";
import { CutoutHeadline } from "@/components/scrapbook/CutoutHeadline";
import { Lightbox } from "@/components/scrapbook/Lightbox";
import { PhotoFrame } from "@/components/scrapbook/PhotoFrame";
import {
  DoodleHeart,
  DoodleStar,
  PressedFlower,
  Sprig,
  Squiggle,
  Tape,
} from "@/components/scrapbook/decorations";
import type { ScrapbookPhoto } from "@/config/scrapbook";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: `Happy Birthday, ${scrapbook.name} — A Scrapbook`,
      },
      {
        name: "description",
        content:
          "A handmade digital scrapbook of our favourite memories — open your present to find more.",
      },
      { property: "og:title", content: `Happy Birthday, ${scrapbook.name} — A Scrapbook` },
      {
        property: "og:description",
        content:
          "A handmade digital scrapbook of our favourite memories — open your present to find more.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allPhotos: ScrapbookPhoto[] = [
    scrapbook.heroPhoto,
    scrapbook.supportPhoto,
    ...scrapbook.snapshots,
  ];

  const openPresent = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      navigate({ to: "/gift" });
      return;
    }
    setLeaving(true);
    window.setTimeout(() => navigate({ to: "/gift" }), 430);
  };

  return (
    <div
      className={`scrapbook-backdrop paper-grain relative min-h-screen overflow-x-clip ${leaving ? "anim-page-out" : ""}`}
    >
      {/* faint graph-paper band behind the collage */}
      <div
        aria-hidden="true"
        className="graph-lines absolute inset-x-0 top-0 h-64 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />

      <div
        aria-hidden="true"
        className="confetti-field pointer-events-none absolute inset-0 opacity-60"
      />
      <div
        aria-hidden="true"
        className="scrapbook-edge-decor pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span className="css-bow bow-top-left" />
        <span className="css-bow bow-top-right" />
        <span className="lace-strip lace-left" />
        <span className="lace-strip lace-right" />
        <span className="sticker sticker-corner sticker-one">
          BIRTHDAY
          <br />
          GIRL
        </span>
        <span className="sticker sticker-corner sticker-two">
          LOVE
          <br />
          YOU
        </span>
        <span className="paper-flower flower-one">✦</span>
        <span className="paper-flower flower-two">✿</span>
        <span className="paper-flower flower-three">✦</span>
        <span className="paper-flower flower-four">✿</span>
        <span className="candyfloss candyfloss-left" aria-hidden="true">
          <i />
          <b />
          <em />
        </span>
        <span className="candyfloss candyfloss-right" aria-hidden="true">
          <i />
          <b />
          <em />
        </span>
        <span className="sticker sticker-star sticker-three">
          SPECIAL
          <br />
          DAY
        </span>
        <span className="sticker sticker-heart sticker-four">
          LOVE
          <br />
          YOU
        </span>
        <span className="bottom-flower bottom-flower-one" aria-hidden="true">
          ✿
        </span>
        <span className="bottom-flower bottom-flower-two" aria-hidden="true">
          ✾
        </span>
        <span className="bottom-flower bottom-flower-three" aria-hidden="true">
          ✿
        </span>
      </div>
      <main className="relative mx-auto max-w-7xl px-4 pb-24 pt-5 md:px-8 md:pt-8">
        <div className="mb-8 flex items-center justify-center gap-3 font-body text-[10px] font-bold uppercase tracking-[0.35em] text-burgundy/75">
          <span className="h-px w-10 bg-burgundy/30" />
          a little book of us
          <span className="h-px w-10 bg-burgundy/30" />
        </div>
        {/* ------- headline ------- */}
        <header className="birthday-header torn-paper relative border-2 border-blush/35 bg-paper/90 px-4 py-8 text-center shadow-paper md:px-8 md:py-12">
          <Tape tone="blush" rotate={-6} className="left-[6%] top-[-8px] hidden md:block" />
          <Tape tone="sage" rotate={5} className="right-[7%] top-[-6px] hidden md:block" />
          <CutoutHeadline text={`HAPPY BIRTHDAY, ${scrapbook.name.toUpperCase()}`} />
          <DoodleStar className="absolute left-[12%] top-2 h-3 w-3 text-ink/50 max-md:hidden" />
          <DoodleStar className="absolute bottom-0 right-[14%] h-2 w-2 text-blush max-md:hidden" />
          <p className="mx-auto mt-5 max-w-md font-hand text-2xl text-ink/75 md:text-3xl">
            for the girl who makes ordinary days feel like confetti
          </p>
          <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full bg-cherry/10 px-4 py-1.5 font-body text-[10px] font-bold uppercase tracking-[0.28em] text-cherry">
            <span className="text-gold">✦</span> birthday edition{" "}
            <span className="text-gold">✦</span>
          </div>
        </header>

        {/* ------- collage ------- */}
        <section className="birthday-collage relative mt-4 grid gap-4 md:mt-5 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
          <span className="landing-paper-scrap landing-paper-scrap-one" aria-hidden="true">
            little archive
          </span>
          <span className="landing-paper-scrap landing-paper-scrap-two" aria-hidden="true">
            keep this day
          </span>
          <span className="landing-washi-word" aria-hidden="true">our little world</span>
          {/* large portrait */}
          <div className="relative md:col-span-7 md:pt-2">
            <span className="collage-label label-portrait">best memories</span>
            <span className="ribbon-tail ribbon-tail-one" />
            <PhotoFrame
              photo={scrapbook.heroPhoto}
              variant="paper"
              rotate={-1}
              eager
              onOpen={() => setLightboxIndex(0)}
              className="w-full max-w-xl"
            />
            <PressedFlower className="absolute -left-4 top-10 h-9 w-9 opacity-90" />
            <DoodleHeart className="absolute -bottom-2 right-6 h-7 w-7" />
            <Sprig className="absolute -left-2 bottom-10 h-16 w-11 -rotate-12 opacity-80" />
          </div>

          {/* supporting landscape + margin note */}
          <div className="relative flex flex-col items-center gap-8 md:col-span-5 md:pt-4">
            <span className="collage-label label-note">made with love</span>
            <span className="mini-cake" aria-hidden="true">
              <i />
              <b />
            </span>
            <PhotoFrame
              photo={scrapbook.supportPhoto}
              variant="paper"
              rotate={2}
              onOpen={() => setLightboxIndex(1)}
              className="w-full max-w-sm"
            />
            <div
              className="ruled-lines relative max-w-xs bg-paper p-5 pt-8 shadow-paper"
              style={{ transform: "rotate(-1.5deg)" }}
            >
              <span className="note-pin" aria-hidden="true" />
              <Tape tone="kraft" rotate={-5} className="-top-3 left-1/2 -translate-x-1/2" />
              <p className="font-hand text-xl leading-8 text-ink md:text-[1.35rem]">
                {scrapbook.marginNote}
              </p>
              <DoodleStar className="absolute -right-2 bottom-2 h-3 w-3 text-blush" />
            </div>
          </div>

          {/* taped-in polaroid pair */}
          <div className="relative flex flex-wrap items-start justify-center gap-5 md:col-span-12 md:mt-0 md:justify-center md:gap-10">
            <span className="collage-ribbon-word">HER little world</span>
            <span className="collage-stamp">
              made
              <br />
              with
              <br />
              love
            </span>
            <span className="collage-label label-snapshot">little moments</span>
            <span className="scrap-note scrap-note-left">
              so lucky
              <br />
              to have you
            </span>
            <span className="scrap-note scrap-note-right">
              made for
              <br />
              my favorite girl
            </span>
            <PhotoFrame
              photo={scrapbook.snapshots[0]}
              variant="polaroid"
              rotate={-3}
              onOpen={() => setLightboxIndex(2)}
              className="w-56 md:w-64"
            />
            <PhotoFrame
              photo={scrapbook.snapshots[1]}
              variant="polaroid"
              rotate={2.5}
              onOpen={() => setLightboxIndex(3)}
              className="w-64 md:mt-8 md:w-80"
            />
            <Squiggle className="hidden w-28 self-center opacity-70 md:block" />
            <PressedFlower className="hidden h-8 w-8 self-end opacity-75 md:ml-2 md:block" />
            <span className="landing-collage-caption" aria-hidden="true">the days we keep replaying</span>
          </div>
        </section>

        {/* ------- the present ------- */}
        <div className="relative mt-10 text-center md:mt-12">
          <div
            aria-hidden="true"
            className="mx-auto mb-8 h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent"
          />
          <p className="mb-3 font-hand text-2xl text-burgundy">a surprise is tucked inside</p>
          <button
            type="button"
            onClick={openPresent}
            className="group inline-flex items-center gap-4 rounded-full bg-burgundy px-9 py-4 font-display text-sm uppercase tracking-[0.35em] text-primary-foreground shadow-photo transition hover:-translate-y-0.5 hover:bg-burgundy/90 md:px-12"
          >
            <DoodleStar className="h-3.5 w-3.5 text-primary-foreground/80 transition group-hover:rotate-90" />
            Open your present
            <DoodleStar className="h-3.5 w-3.5 text-primary-foreground/80 transition group-hover:-rotate-90" />
          </button>
          <p className="mt-4 font-hand text-lg text-ink/60">page two is waiting…</p>
        </div>
      </main>

      <Lightbox
        photos={allPhotos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </div>
  );
}
