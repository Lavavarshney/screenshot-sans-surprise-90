import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { ScrapbookPhoto } from "@/config/scrapbook";
import { Tape } from "./decorations";

type PhotoFrameProps = {
  photo: ScrapbookPhoto;
  variant?: "paper" | "polaroid";
  rotate?: number;
  tape?: "top" | "none";
  className?: string;
  eager?: boolean;
  onOpen?: () => void;
};

/**
 * A framed photo sitting on the scrapbook page. The frame and tape stay
 * outside the image area; the photo itself is never cropped (object-contain).
 */
export function EditablePhotoFrame({
  index,
  rotate = 0,
  variant = "polaroid",
}: {
  index: number;
  rotate?: number;
  variant?: "paper" | "polaroid";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [caption, setCaption] = useState("a little memory ♡");
  const polaroid = variant === "polaroid";

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setSrc(typeof reader.result === "string" ? reader.result : null);
    reader.readAsDataURL(file);
  }

  return (
  <figure
      className={`editable-photo-frame relative ${polaroid ? "bg-paper p-3 pb-4" : "bg-ivory p-2.5 pb-4"}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-burgundy/15">
        {src ? (
          <img src={src} alt={`Uploaded scrapbook photo ${index + 1}`} className="block h-full w-full object-cover" />
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="group flex h-full w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-burgundy/35 bg-blush/20 px-4 text-center text-burgundy transition hover:bg-blush/35 focus-visible:outline-2 focus-visible:outline-burgundy"
          >
            <span className="font-display text-3xl font-bold">Add photo</span>
            <span className="font-hand text-xl text-ink/70">tap to choose a memory</span>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="sr-only"
        aria-label={`Choose photo for frame ${index + 1}`}
      />
      <div className="mt-2 flex items-center gap-2">
        <input
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
          aria-label={`Caption for frame ${index + 1}`}
          className="min-w-0 flex-1 bg-transparent px-1 text-center font-hand text-xl text-ink outline-none placeholder:text-ink/60 focus-visible:ring-1 focus-visible:ring-burgundy"
        />
        {src && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="shrink-0 font-body text-[9px] font-bold uppercase tracking-[0.16em] text-burgundy underline underline-offset-2"
          >
            replace
          </button>
        )}
      </div>
      <Tape className="-top-3 left-1/2 -translate-x-1/2" rotate={rotate - 2} />
    </figure>
  );
}

export function PhotoFrame({
  photo,
  variant = "paper",
  rotate = 0,
  tape = "top",
  className = "",
  eager = false,
  onOpen,
}: PhotoFrameProps) {
  const polaroid = variant === "polaroid";

  return (
    <figure
      className={`relative inline-block w-fit ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open photo larger: ${photo.alt}`}
        className="group block w-full cursor-zoom-in text-left focus-visible:outline-2 focus-visible:outline-burgundy"
      >
        <div
          className={`relative bg-paper shadow-photo transition-transform duration-300 group-hover:-translate-y-1 ${
            polaroid ? "p-3 pb-3" : "p-2.5"
          }`}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading={eager ? "eager" : "lazy"}
            className="block h-auto w-full object-contain"
          />
          <figcaption
            className={`font-hand text-ink/85 ${
              polaroid ? "pt-3 text-center text-xl" : "pt-2 text-lg"
            }`}
          >
            {photo.caption}
          </figcaption>
        </div>
      </button>
      {tape === "top" && (
        <Tape className="-top-3 left-1/2 -translate-x-1/2" rotate={-2 + rotate * 0.5} />
      )}
    </figure>
  );
}
