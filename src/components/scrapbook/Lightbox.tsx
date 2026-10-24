import { useEffect } from "react";
import type { ScrapbookPhoto } from "@/config/scrapbook";

type LightboxProps = {
  photos: ScrapbookPhoto[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

/** Full-size photo viewer with previous/next navigation and captions. */
export function Lightbox({ photos, index, onClose, onIndexChange }: LightboxProps) {
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onIndexChange((index + 1) % photos.length);
      if (event.key === "ArrowLeft")
        onIndexChange((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, index, photos.length, onClose, onIndexChange]);

  if (!open) return null;
  const photo = photos[index];
  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-paper font-body text-lg text-ink shadow-paper hover:bg-blush/20"
      >
        ×
      </button>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index - 1 + photos.length) % photos.length);
            }}
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-xl text-ink shadow-paper hover:bg-blush/20 md:left-6"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index + 1) % photos.length);
            }}
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-xl text-ink shadow-paper hover:bg-blush/20 md:right-6"
          >
            ›
          </button>
        </>
      )}

      <figure
        onClick={(e) => e.stopPropagation()}
        className="anim-fade-rise flex max-w-[92vw] flex-col items-center"
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className="max-h-[76vh] max-w-[92vw] bg-paper object-contain p-2 shadow-photo"
        />
        <figcaption className="mt-4 text-center">
          <span className="font-hand text-2xl text-ivory">{photo.caption}</span>
          <span className="mt-1 block font-body text-xs uppercase tracking-[0.25em] text-ivory/60">
            {index + 1} of {photos.length}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
