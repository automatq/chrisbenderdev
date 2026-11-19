/* The project inquiry form at /start. The step list drives the client UI and
   the server-side validation from one place, so a question added here shows
   up in the form, is validated on submit and lands in the notification email. */

export type InquiryStep =
  | {
      id: string;
      kind: "text" | "email" | "textarea";
      label: string;
      question: string;
      hint?: string;
      placeholder?: string;
      autoComplete?: string;
      required: boolean;
      maxLength: number;
    }
  | {
      id: string;
      kind: "choice";
      label: string;
      question: string;
      hint?: string;
      options: readonly string[];
      required: boolean;
    };

export const INQUIRY_STEPS = [
  {
    id: "name",
    kind: "text",
    label: "Name",
    question: "First, what's your name?",
    placeholder: "Jane Doe",
    autoComplete: "name",
    required: true,
    maxLength: 120,
  },
  {
    id: "email",
    kind: "email",
    label: "Email",
    question: "What's the best email to reach you at?",
    placeholder: "jane@company.com",
    autoComplete: "email",
    required: true,
    maxLength: 200,
  },
  {
    id: "company",
    kind: "text",
    label: "Company",
    question: "What's your company or business called?",
    hint: "Optional. Skip it if this is a personal project.",
    placeholder: "Company name",
    autoComplete: "organization",
    required: false,
    maxLength: 160,
  },
  {
    id: "service",
    kind: "choice",
    label: "Project type",
    question: "What do you need built?",
    options: [
      "Website",
      "Web app or SaaS product",
      "Mobile app",
      "Internal tool or business software",
      "AI automation",
      "SEO and answer engine optimization",
      "Something else",
    ],
    required: true,
  },
  {
    id: "details",
    kind: "textarea",
    label: "Project details",
    question: "Tell me about the project.",
    hint: "What it should do, who it's for, and anything that already exists.",
    placeholder: "Type your answer here…",
    required: true,
    maxLength: 4000,
  },
  {
    id: "budget",
    kind: "choice",
    label: "Budget",
    question: "What budget are you working with?",
    hint: "In Canadian dollars. A rough range is fine.",
    options: [
      "Under $5,000",
      "$5,000 to $15,000",
      "$15,000 to $50,000",
      "$50,000 or more",
      "Not sure yet",
    ],
    required: true,
  },
  {
    id: "timeline",
    kind: "choice",
    label: "Timeline",
    question: "When do you need it?",
    options: [
      "As soon as possible",
      "Within 1 to 3 months",
      "More than 3 months out",
      "Just exploring",
    ],
    required: true,
  },
] as const satisfies readonly InquiryStep[];

export type InquiryField = (typeof INQUIRY_STEPS)[number]["id"];
export type InquiryAnswers = Record<InquiryField, string>;

export const EMPTY_ANSWERS = Object.fromEntries(
  INQUIRY_STEPS.map((step) => [step.id, ""])
) as InquiryAnswers;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns the message to show for one step, or null when the answer is fine. */
export function validateStep(step: InquiryStep, raw: string): string | null {
  const value = raw.trim();

  if (!value) {
    return step.required ? "Please fill this in." : null;
  }

  if (step.kind === "choice") {
    return step.options.includes(value) ? null : "Please pick one of the options.";
  }

  if (value.length > step.maxLength) {
    return `Please keep this under ${step.maxLength} characters.`;
  }

  if (step.kind === "email" && !EMAIL_PATTERN.test(value)) {
    return "That email doesn't look right.";
  }

  return null;
}

/** Trims and validates a whole submission. Never trusts the client's shape. */
export function parseInquiry(
  input: unknown
):
  | { ok: true; answers: InquiryAnswers }
  | { ok: false; field: InquiryField; message: string } {
  const source =
    typeof input === "object" && input !== null
      ? (input as Record<string, unknown>)
      : {};
  const answers = { ...EMPTY_ANSWERS };

  for (const step of INQUIRY_STEPS) {
    const raw = source[step.id];
    const value = typeof raw === "string" ? raw.trim() : "";
    const message = validateStep(step, value);

    if (message) {
      return { ok: false, field: step.id, message };
    }

    answers[step.id] = value;
  }

  return { ok: true, answers };
}
