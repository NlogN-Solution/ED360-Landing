import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { PipelineStrip } from "./PipelineStrip";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 60% 45% at 50% 0%, black 30%, transparent 100%)",
        }}
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1.5 text-xs font-medium text-[var(--ink-muted)]"
          >
            Built for international education consultancies
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-4xl font-semibold tracking-tight text-[var(--ink)] sm:text-5xl md:text-6xl"
          >
            Run your consultancy like a{" "}
            <span className="text-[var(--accent)]">control tower.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-5 max-w-xl text-lg text-[var(--ink-muted)]"
          >
            ED360 tracks every student from first call to visa stamp — leads, documents, applications, and offers,
            all in one pipeline your whole team can see.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <ButtonLink to="/signup" size="lg">
              Start free trial <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink to="/pricing" variant="outline" size="lg">
              See pricing
            </ButtonLink>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <PipelineStrip />
        </motion.div>
      </Container>
    </section>
  );
}
