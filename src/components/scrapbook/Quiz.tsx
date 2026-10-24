import { useState } from "react";
import { scrapbook } from "@/config/scrapbook";
import { PressedFlower, Tape } from "./decorations";

/** The best-friend quiz: one question at a time on a paper card. */
export function Quiz() {
  const { questions } = scrapbook.quiz;
  const [step, setStep] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const answer = (i: number) => {
    if (chosen !== null) return;
    const question = questions[step];
    if (!question) return;
    setChosen(i);
    window.setTimeout(() => {
      if (i === question.correctIndex) setScore((s) => s + 1);
      setChosen(null);
      if (step + 1 < questions.length) setStep(step + 1);
      else setDone(true);
    }, 950);
  };

  if (done) {
    const r = scrapbook.result;
    const result =
      score === questions.length
        ? r.perfect
        : score >= Math.ceil(questions.length * 0.7)
          ? r.good
          : score >= Math.ceil(questions.length * 0.4)
            ? r.sweet
            : r.tryAgain;

    return (
      <div
        className="anim-fade-rise relative w-full max-w-lg rounded-[1.5rem] border border-blush/25 bg-paper p-8 shadow-photo md:p-10"
        style={{ transform: "rotate(-0.5deg)" }}
      >
        <Tape tone="blush" rotate={-3} className="-top-3 left-10" />
        <Tape tone="kraft" rotate={2.5} className="-top-3 right-10" />
        <div className="text-center">
          <div className="flex items-end justify-center gap-1">
            <PressedFlower className="h-7 w-7" />
            <PressedFlower className="h-10 w-10" />
            <PressedFlower className="h-7 w-7" />
          </div>
          <h2 className="mt-4 font-display text-3xl font-semibold text-burgundy">{result.title}</h2>
          <p className="mt-3 font-hand text-2xl text-ink">{result.note}</p>
          <p className="mt-2 font-body text-sm uppercase tracking-[0.25em] text-muted-foreground">
            {score} / {questions.length}
          </p>
          <button
            type="button"
            onClick={() => {
              setStep(0);
              setScore(0);
              setChosen(null);
              setDone(false);
            }}
            className="mt-8 rounded-full bg-burgundy px-8 py-3 font-display text-sm uppercase tracking-[0.3em] text-primary-foreground shadow-paper transition hover:-translate-y-0.5 hover:bg-burgundy/90"
          >
            Read it again
          </button>
        </div>
      </div>
    );
  }

  const q = questions[step];
  if (!q) return null;

  return (
    <div className="relative w-full max-w-lg rounded-[1.5rem] border border-blush/25 bg-paper p-7 shadow-photo md:p-10">
      <Tape tone="kraft" rotate={2} className="-top-3 left-1/2 -translate-x-1/2" />

      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold text-burgundy">
          {scrapbook.quiz.title}
        </h2>
        <span className="font-hand text-lg text-ink/70">
          {step + 1} / {questions.length}
        </span>
      </div>
      <p className="font-hand text-xl text-ink/60">{scrapbook.quiz.intro}</p>

      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-kraft/40">
        <div
          className="h-full bg-burgundy/70 transition-all duration-500"
          style={{ width: `${(step / questions.length) * 100}%` }}
        />
      </div>

      <p className="mt-7 font-display text-2xl leading-snug text-charcoal md:text-[1.7rem]">
        {q.question}
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {q.answers.map((a, i) => {
          const revealed = chosen !== null;
          const isChosen = chosen === i;
          const isCorrect = i === q.correctIndex;
          return (
            <button
              key={i}
              type="button"
              onClick={() => answer(i)}
              disabled={revealed}
              className={`rounded-xl border px-5 py-3.5 text-left font-body text-[15px] transition ${
                revealed && isCorrect
                  ? "border-sage bg-sage/15 text-charcoal"
                  : isChosen
                    ? "border-blush bg-blush/15 text-charcoal"
                    : revealed
                      ? "border-border bg-ivory/50 opacity-50"
                      : "border-border bg-ivory/70 hover:-translate-y-0.5 hover:border-blush/60 hover:bg-blush/10"
              }`}
            >
              {a}
            </button>
          );
        })}
      </div>
    </div>
  );
}
