import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/Container";

const FAQS = [
  {
    question: "Do student accounts count against my staff seats?",
    answer:
      "No. Staff seats (counsellors, admins, finance, marketing, and so on) and student accounts are tracked separately. Enrolling more students never costs you a seat.",
  },
  {
    question: "Can I change plans later?",
    answer: "Yes — upgrade or downgrade at any time from your organization's subscription dashboard. Changes apply immediately.",
  },
  {
    question: "What happens if I hit my seat limit?",
    answer: "You can purchase extra seats instantly from your dashboard, or upgrade to a plan with a higher included seat count.",
  },
  {
    question: "Is my organization's data isolated from other consultancies?",
    answer: "Completely. Every organization's data — leads, students, applications, documents — is fully separated at the database level.",
  },
  {
    question: "Do you support multiple destination countries?",
    answer: "Yes — Ignition ships with application workflow templates for Australia, Canada, the UK, and the US, and you can customize your own.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[var(--border)] py-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-medium text-[var(--ink)]">{question}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-[var(--ink-muted)] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-sm leading-relaxed text-[var(--ink-muted)]">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="border-t border-[var(--border)] bg-[var(--surface)] py-24">
      <Container className="max-w-2xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
            Questions, answered
          </h2>
        </div>
        <div className="mt-10">
          {FAQS.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>
      </Container>
    </section>
  );
}
