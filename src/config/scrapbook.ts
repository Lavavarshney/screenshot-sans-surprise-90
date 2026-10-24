// =====================================================================
//  SCRAPBOOK CONFIG — edit everything personal here, in one place.
//
//  To swap in your real pictures: drop your image files into
//  src/assets/, then change the imports at the top of this file and
//  update captions below. Nothing else needs to change.
// =====================================================================

import photoHero from "@/assets/photo-hero.jpg";
import photoSupport from "@/assets/photo-support.jpg";
import photoPolaroidA from "@/assets/photo-polaroid-a.jpg";
import photoPolaroidB from "@/assets/photo-polaroid-b.jpg";

export type ScrapbookPhoto = {
  src: string;
  alt: string;
  caption: string;
  /** Native pixel size — keeps lightbox + layout proportions correct. */
  width: number;
  height: number;
};

export type QuizQuestion = {
  question: string;
  answers: string[];
  /** Index of the answer YOU consider right. Used for the playful score. */
  correctIndex: number;
};

export const scrapbook = {
  /** The birthday girl's name — shown in the cutout headline. */
  name: "Aanya",

  /** Handwritten note in the landing page margin. */
  marginNote:
    "to my favourite person — I made you this little book of us. turn the page, there's more.",

  /** Message revealed after the flowers bloom on page two. */
  giftMessage:
    "Before anything else: thank you for every year of being you. Now — a tiny quiz about us.",

  /** Landing page photographs. First is the large portrait; second the landscape. */
  heroPhoto: {
    src: photoHero,
    alt: "Us laughing at our usual café table",
    caption: "our table, every saturday",
    width: 1024,
    height: 1376,
  } as ScrapbookPhoto,

  supportPhoto: {
    src: photoSupport,
    alt: "Walking along the promenade at dusk",
    caption: "that walk we didn't want to end",
    width: 1376,
    height: 1024,
  } as ScrapbookPhoto,

  /** Two smaller snapshots arranged like taped-in polaroids. */
  snapshots: [
    {
      src: photoPolaroidA,
      alt: "Birthday cake with sparkler candles",
      caption: "candles, take 47",
      width: 1024,
      height: 1024,
    },
    {
      src: photoPolaroidB,
      alt: "Picnic blanket with a book, dried flowers and a camera",
      caption: "the picnic era",
      width: 1024,
      height: 1024,
    },
  ] as [ScrapbookPhoto, ScrapbookPhoto],

  /** Best-friend quiz — six to eight questions. */
  quiz: {
    title: "The Best-Friend Quiz",
    intro: "No pressure. Except a little.",
    questions: [
      {
        question: "What is my go-to comfort order?",
        answers: ["Chai with too much sugar", "Black coffee, no thanks", "Hot chocolate always"],
        correctIndex: 0,
      },
      {
        question: "Which song do I inevitably play at 1 a.m.?",
        answers: ["The sad acoustic one", "The one we scream in the car", "Whatever is trending"],
        correctIndex: 1,
      },
      {
        question: "What's the one thing I always overpack?",
        answers: ["Books I won't read", "Skins for every weather", "Snacks for the group"],
        correctIndex: 0,
      },
      {
        question: "Our most-used inside joke started when…",
        answers: ["The autocorrect incident", "That wedding we crashed", "The group-chat typo"],
        correctIndex: 1,
      },
      {
        question: "If I could move anywhere tomorrow, it would be…",
        answers: ["A quiet hill town", "Right next to your street", "Somewhere by the sea"],
        correctIndex: 2,
      },
      {
        question: "What's my infamous irrational fear?",
        answers: ["Lizards with ambitions", "Calls from unknown numbers", "Both, equally"],
        correctIndex: 2,
      },
      {
        question: "Finish this: on my worst day, I want you to…",
        answers: ["Fix it quietly", "Just sit with me", "Make me laugh about it"],
        correctIndex: 1,
      },
    ] as QuizQuestion[],
  },

  /** Result screen copy, tiered by score. */
  result: {
    perfect: {
      title: "Soulmate-level. Obviously.",
      note: "You know me better than I know myself. Rude, honestly.",
    },
    good: {
      title: "You know me far too well.",
      note: "Only a couple of slips. I'll allow it — this time.",
    },
    sweet: {
      title: "A very respectable effort.",
      note: "Half right. Which, for our chaotic friendship, tracks.",
    },
    tryAgain: {
      title: "Excuse me??",
      note: "We're redoing this. Right now. Replay button's right there.",
    },
  },
};
