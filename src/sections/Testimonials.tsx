import { motion } from "motion/react";
import { Container } from "@/components/Container";

const TESTIMONIALS = [
  {
    quote:
      "We used to lose track of which documents were missing until a student called asking why their application hadn't moved. Now the whole team can see it at a glance.",
    name: "Priya Sharma",
    role: "Operations Lead, fictional demo consultancy",
  },
  {
    quote:
      "Every counsellor was keeping their own spreadsheet. ED360 gave us one pipeline everyone actually uses — leads stopped falling through the cracks within a week.",
    name: "Daniel Osei",
    role: "Founder, fictional demo consultancy",
  },
  {
    quote:
      "The per-destination workflows are the part that stuck. Canada and the UK don't move the same way, and now our team doesn't have to remember that by hand.",
    name: "Mei Lin Tan",
    role: "Senior Counsellor, fictional demo consultancy",
  },
];

export function Testimonials() {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">What teams say</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
            Built around how consultancies actually work
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.figure
              key={testimonial.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <blockquote className="flex-1 text-sm leading-relaxed text-[var(--ink)]">"{testimonial.quote}"</blockquote>
              <figcaption className="mt-5 border-t border-[var(--border)] pt-4">
                <p className="text-sm font-medium text-[var(--ink)]">{testimonial.name}</p>
                <p className="text-xs text-[var(--ink-muted)]">{testimonial.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
