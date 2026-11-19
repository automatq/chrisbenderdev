"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUp, Check, CornerDownLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";

import { submitInquiry } from "@/app/start/actions";
import { Button } from "@/components/ui/button";
import {
  EMPTY_ANSWERS,
  INQUIRY_STEPS,
  validateStep,
  type InquiryAnswers,
  type InquiryStep,
} from "@/lib/inquiry";
import { cn } from "@/lib/utils";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const steps: readonly InquiryStep[] = INQUIRY_STEPS;

type Status = "asking" | "sent" | "failed";

function mailtoFallback(contactEmail: string, answers: InquiryAnswers) {
  const body = INQUIRY_STEPS.map(
    (step) => `${step.label}:\n${answers[step.id] || "(not given)"}`
  ).join("\n\n");

  return `mailto:${contactEmail}?subject=${encodeURIComponent(
    "Project inquiry"
  )}&body=${encodeURIComponent(body)}`;
}

export default function InquiryForm({ contactEmail }: { contactEmail: string }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<InquiryAnswers>(EMPTY_ANSWERS);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("asking");
  const [trap, setTrap] = useState("");
  const [pending, startTransition] = useTransition();
  const reduceMotion = useReducedMotion();
  const fieldRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  /* A stable callback ref, so each question's field takes focus the moment it
     mounts rather than when its transition ends: typing straight away after
     Enter must not lose the first few keystrokes. */
  const attachField = useCallback(
    (element: HTMLInputElement | HTMLTextAreaElement | null) => {
      fieldRef.current = element;
      element?.focus({ preventScroll: true });
    },
    []
  );
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const step = steps[index];
  const value = answers[step.id as keyof InquiryAnswers];
  const isLast = index === steps.length - 1;
  const firstName = answers.name.trim().split(/\s+/)[0];

  const goTo = useCallback((next: number, dir: number) => {
    // The outgoing field stays mounted while it fades; without this, keys
    // typed in that moment would land in the previous answer.
    fieldRef.current?.blur();
    setError(null);
    setDirection(dir);
    setIndex(next);
  }, []);

  const submit = useCallback(
    (finalAnswers: InquiryAnswers) => {
      startTransition(async () => {
        try {
          const result = await submitInquiry(finalAnswers, trap);

          if (result.ok) {
            setStatus("sent");
          } else if (result.reason === "invalid") {
            // The server disagreed with an answer: take them back to it.
            const at = steps.findIndex((item) => item.id === result.field);
            setDirection(-1);
            setIndex(at === -1 ? 0 : at);
            setError(result.message);
          } else {
            setStatus("failed");
          }
        } catch {
          setStatus("failed");
        }
      });
    },
    [trap]
  );

  /* Takes the answers explicitly because a choice advances in the same tick
     it is picked, before the state update has landed. */
  const advance = useCallback(
    (current: InquiryAnswers) => {
      if (pending) return;

      const message = validateStep(step, current[step.id as keyof InquiryAnswers]);

      if (message) {
        setError(message);
        fieldRef.current?.focus();
        return;
      }

      if (isLast) {
        submit(current);
      } else {
        goTo(index + 1, 1);
      }
    },
    [goTo, index, isLast, pending, step, submit]
  );

  const back = useCallback(() => {
    if (index > 0 && !pending) goTo(index - 1, -1);
  }, [goTo, index, pending]);

  const choose = useCallback(
    (option: string) => {
      if (pending) return;

      const next = { ...answers, [step.id]: option };
      setAnswers(next);
      setError(null);

      // The last answer waits for an explicit send: one stray click or letter
      // should not be what submits the form.
      if (isLast) return;

      // A beat to let the selection register before the question changes.
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      advanceTimer.current = setTimeout(
        () => advance(next),
        reduceMotion ? 0 : 280
      );
    },
    [advance, answers, isLast, pending, reduceMotion, step.id]
  );

  useEffect(
    () => () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    },
    []
  );

  // Letter shortcuts for the choice questions, plus Enter to confirm one.
  useEffect(() => {
    if (status !== "asking" || step.kind !== "choice") return;

    const options = step.options;

    function onKeyDown(event: KeyboardEvent) {
      /* defaultPrevented matters: Enter in the textarea advances to a choice
         question, React commits and this listener attaches while that same
         keydown is still bubbling to the window. It must not count twice. */
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      if (event.key === "Enter") {
        // Leave Enter alone on a focused button or link: it has its own job.
        if ((event.target as HTMLElement).closest("button, a")) return;
        event.preventDefault();
        advance(answers);
        return;
      }

      const at = LETTERS.indexOf(event.key.toUpperCase());

      if (event.key.length === 1 && at !== -1 && at < options.length) {
        event.preventDefault();
        choose(options[at]);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [advance, answers, choose, status, step]);

  const slide = reduceMotion ? 0 : 28;

  if (status === "sent") {
    return (
      <div className="flex min-h-[calc(100dvh-16rem)] flex-col items-start justify-center gap-4">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-5" aria-hidden />
        </div>
        <h1
          className="text-3xl font-semibold tracking-tighter sm:text-4xl"
          role="status"
        >
          Thanks{firstName ? `, ${firstName}` : ""}. I&apos;ve got it.
        </h1>
        <p className="max-w-md text-muted-foreground">
          I read every inquiry myself and will reply to {answers.email} with
          next steps.
        </p>
        <Button asChild variant="outline">
          <Link href="/">Back to the site</Link>
        </Button>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex min-h-[calc(100dvh-16rem)] flex-col items-start justify-center gap-4">
        <h1
          className="text-3xl font-semibold tracking-tighter sm:text-4xl"
          role="alert"
        >
          That didn&apos;t send.
        </h1>
        <p className="max-w-md text-muted-foreground">
          Something went wrong on my end, and your answers are still here. Try
          again, or send them straight to {contactEmail} as an email.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => {
              setStatus("asking");
              submit(answers);
            }}
            disabled={pending}
          >
            Try again
          </Button>
          <Button asChild variant="outline">
            <a href={mailtoFallback(contactEmail, answers)}>Send as an email</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        advance(answers);
      }}
      className="flex min-h-[calc(100dvh-16rem)] flex-col"
    >
      <div className="flex items-center gap-3">
        <div
          className="h-1 flex-1 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-label="Form progress"
          aria-valuemin={0}
          aria-valuemax={steps.length}
          aria-valuenow={index}
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out motion-reduce:transition-none"
            style={{ width: `${(index / steps.length) * 100}%` }}
          />
        </div>
        <span className="text-xs tabular-nums text-muted-foreground">
          {index + 1} / {steps.length}
        </span>
      </div>

      {/* Hidden from people and assistive tech; only a bot fills this in. */}
      <div className="hidden" aria-hidden>
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={trap}
            onChange={(event) => setTrap(event.target.value)}
          />
        </label>
      </div>

      <div className="flex flex-1 flex-col justify-center py-10">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={step.id}
            custom={direction}
            initial={{ opacity: 0, y: slide * direction }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -slide * direction }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor={step.kind === "choice" ? undefined : `inquiry-${step.id}`}
                id={`inquiry-${step.id}-label`}
                className="text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                {step.id === "email" && firstName
                  ? `Good to meet you, ${firstName}. ${step.question}`
                  : step.question}
                {!step.required && (
                  <span className="sr-only"> (optional)</span>
                )}
              </label>
              {step.hint && (
                <p
                  id={`inquiry-${step.id}-hint`}
                  className="text-muted-foreground"
                >
                  {step.hint}
                </p>
              )}
            </div>

            {step.kind === "choice" ? (
              <div
                role="radiogroup"
                aria-labelledby={`inquiry-${step.id}-label`}
                className="flex flex-col items-start gap-2"
              >
                {step.options.map((option, at) => {
                  const selected = value === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => choose(option)}
                      className={cn(
                        "flex min-h-11 w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm font-medium transition-colors sm:w-auto sm:min-w-80",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card hover:bg-muted"
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "flex size-6 flex-none items-center justify-center rounded border text-xs font-semibold",
                          selected
                            ? "border-primary-foreground/40"
                            : "border-border text-muted-foreground"
                        )}
                      >
                        {LETTERS[at]}
                      </span>
                      <span className="flex-1">{option}</span>
                      {selected && <Check className="size-4" aria-hidden />}
                    </button>
                  );
                })}
              </div>
            ) : step.kind === "textarea" ? (
              <textarea
                ref={attachField}
                id={`inquiry-${step.id}`}
                name={step.id}
                rows={4}
                value={value}
                maxLength={step.maxLength}
                placeholder={step.placeholder}
                aria-describedby={step.hint ? `inquiry-${step.id}-hint` : undefined}
                aria-invalid={error ? true : undefined}
                onChange={(event) => {
                  setAnswers({ ...answers, [step.id]: event.target.value });
                  setError(null);
                }}
                onKeyDown={(event) => {
                  // Enter moves on, as it does everywhere else; Shift+Enter
                  // is the line break. Skip while an IME is composing.
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey &&
                    !event.nativeEvent.isComposing
                  ) {
                    event.preventDefault();
                    advance(answers);
                  }
                }}
                className="w-full resize-none border-0 border-b-2 border-border bg-transparent pb-2 text-lg outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary sm:text-xl"
              />
            ) : (
              <input
                ref={attachField}
                id={`inquiry-${step.id}`}
                name={step.id}
                type={step.kind}
                inputMode={step.kind === "email" ? "email" : undefined}
                autoCapitalize={step.kind === "email" ? "none" : undefined}
                autoComplete={step.autoComplete}
                value={value}
                maxLength={step.maxLength}
                placeholder={step.placeholder}
                aria-describedby={step.hint ? `inquiry-${step.id}-hint` : undefined}
                aria-invalid={error ? true : undefined}
                onChange={(event) => {
                  setAnswers({ ...answers, [step.id]: event.target.value });
                  setError(null);
                }}
                className="w-full border-0 border-b-2 border-border bg-transparent pb-2 text-lg outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary sm:text-xl"
              />
            )}

            <p
              role="alert"
              className={cn(
                "min-h-5 text-sm font-medium text-destructive",
                !error && "invisible"
              )}
            >
              {error}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" disabled={pending} className="gap-2">
                {pending && (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                )}
                {isLast ? (pending ? "Sending" : "Send inquiry") : "OK"}
              </Button>
              <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
                {step.kind === "choice" ? (
                  <>
                    Press a letter to choose
                    {isLast && (
                      <span className="flex items-center gap-1">
                        , then Enter
                        <CornerDownLeft className="size-3" aria-hidden />
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    press Enter
                    <CornerDownLeft className="size-3" aria-hidden />
                    {step.kind === "textarea" && (
                      <span>, Shift + Enter for a new line</span>
                    )}
                  </>
                )}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={back}
          disabled={index === 0 || pending}
          aria-label="Previous question"
        >
          <ArrowUp className="size-4" aria-hidden />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => advance(answers)}
          disabled={isLast || pending}
          aria-label="Next question"
        >
          <ArrowDown className="size-4" aria-hidden />
        </Button>
      </div>
    </form>
  );
}
