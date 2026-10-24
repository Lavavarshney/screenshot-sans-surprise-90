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
