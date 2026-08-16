import { motion } from "motion/react";
import { UserPlus, GraduationCap, FileText, Workflow, CalendarClock, Wallet } from "lucide-react";
import { Container } from "@/components/Container";

const FEATURES = [
  {
    icon: UserPlus,
    title: "Leads that never go cold",
    description: "Every inquiry is logged, assigned, and followed up on a schedule — with an automatic flag before a lead goes stale.",
  },
  {
    icon: GraduationCap,
    title: "One profile per student",
    description: "Education history, English test scores, documents, and preferences — everything a counsellor needs, in one place.",
  },
  {
    icon: FileText,
    title: "Document tracking that catches gaps",
    description: "See exactly which documents are missing, pending review, or approved for every application — before a deadline slips.",
  },
  {
    icon: Workflow,
    title: "Application workflows per destination",
    description: "Australia, Canada, the UK, and the US each have their own stage templates, so nothing gets submitted out of order.",
  },
  {
    icon: CalendarClock,
    title: "Appointments and tasks in sync",
    description: "Counsellor calendars, follow-up tasks, and student appointments stay linked to the application they belong to.",
  },
  {
    icon: Wallet,
    title: "Payments without spreadsheets",
    description: "Track consultation fees, application charges, and visa payments against the student and application they're for.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Features</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
            Everything a consultancy runs on, in one system
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                <feature.icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-[var(--ink)]">{feature.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-muted)]">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
