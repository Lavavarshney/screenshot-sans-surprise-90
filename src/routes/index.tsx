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
      className={`paper-grain relative min-h-screen overflow-x-clip bg-ivory ${leaving ? "anim-page-out" : ""}`}
    >
      {/* faint graph-paper band behind the collage */}
      <div
        aria-hidden="true"
        className="graph-lines absolute inset-x-0 top-0 h-64 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />

      <main className="relative mx-auto max-w-6xl px-5 pb-24 pt-12 md:px-10 md:pt-16">
        {/* ------- headline ------- */}
        <header className="relative px-2 text-center">
          <Tape tone="blush" rotate={-6} className="left-[6%] top-[-8px] hidden md:block" />
          <Tape tone="sage" rotate={5} className="right-[7%] top-[-6px] hidden md:block" />
          <CutoutHeadline text={`HAPPY BIRTHDAY, ${scrapbook.name.toUpperCase()}`} />
          <DoodleStar className="absolute left-[12%] top-2 h-3 w-3 text-ink/50 max-md:hidden" />
          <DoodleStar className="absolute bottom-0 right-[14%] h-2 w-2 text-blush max-md:hidden" />
        </header>

        {/* ------- collage ------- */}
        <section className="relative mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-x-8 md:gap-y-0">
          {/* large portrait */}
          <div className="relative md:col-span-7">
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
          <div className="relative flex flex-col items-center gap-10 md:col-span-5 md:pt-10">
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
              <Tape tone="kraft" rotate={-5} className="-top-3 left-1/2 -translate-x-1/2" />
              <p className="font-hand text-xl leading-8 text-ink md:text-[1.35rem]">
                {scrapbook.marginNote}
              </p>
              <DoodleStar className="absolute -right-2 bottom-2 h-3 w-3 text-blush" />
            </div>
          </div>

          {/* taped-in polaroid pair */}
          <div className="relative flex flex-wrap items-start justify-center gap-8 md:col-span-12 md:mt-4 md:justify-start md:pl-16">
            <PhotoFrame
              photo={scrapbook.snapshots[0]}
              variant="polaroid"
              rotate={-3}
              onOpen={() => setLightboxIndex(2)}
              className="w-44 md:w-52"
            />
            <PhotoFrame
              photo={scrapbook.snapshots[1]}
              variant="polaroid"
              rotate={2.5}
              onOpen={() => setLightboxIndex(3)}
              className="w-44 md:mt-6 md:w-52"
            />
            <Squiggle className="hidden w-28 self-center opacity-70 md:block" />
            <PressedFlower className="hidden h-8 w-8 self-end opacity-75 md:ml-2 md:block" />
          </div>
        </section>

        {/* ------- the present ------- */}
        <div className="mt-20 text-center md:mt-24">
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
