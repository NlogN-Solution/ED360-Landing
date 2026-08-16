import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";

export function CTA() {
  return (
    <section className="border-t border-[var(--border)] py-24">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-3xl bg-[var(--ink)] px-8 py-14 text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--paper)] sm:text-4xl">
            Bring your whole pipeline into one place
          </h2>
          <p className="max-w-md text-[var(--paper)]/70">
            Set up your organization in minutes. No credit card required to start.
          </p>
          <ButtonLink to="/signup" size="lg">
            Start free trial <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
