import { motion } from "motion/react";
import { Container } from "@/components/Container";

const STEPS = [
  {
    number: "01",
    title: "Capture the lead",
    description: "A call, a walk-in, or a form fill — every inquiry lands in one queue, assigned to a counsellor within minutes.",
  },
  {
    number: "02",
    title: "Move them through the pipeline",
    description: "Documents get collected and verified, the right application workflow kicks in, and nothing waits on a spreadsheet.",
  },
  {
    number: "03",
    title: "Get them to enrollment",
    description: "Offers, visas, and payments stay linked to the student, so your team always knows exactly where they stand.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-[var(--border)] bg-[var(--surface)] py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">How it works</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
            From first call to enrollment, in three moves
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <span className="font-display text-4xl font-semibold text-[var(--accent)]/30">{step.number}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-[var(--ink)]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
