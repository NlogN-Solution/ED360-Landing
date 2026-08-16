import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { api, type PlanInfo } from "@/lib/api";

function formatLimit(value: number | null, unit: string): string {
  if (value === null) return `Unlimited ${unit}`;
  return `${value.toLocaleString()} ${unit}`;
}

function planFeatures(plan: PlanInfo): string[] {
  return [
    formatLimit(plan.included_staff_seats, "staff seats"),
    formatLimit(plan.student_limit, "student accounts"),
    plan.storage_limit_mb === null ? "Unlimited storage" : `${(plan.storage_limit_mb / 1024).toFixed(0)} GB storage`,
  ];
}

export function Pricing() {
  const [plans, setPlans] = useState<PlanInfo[] | null>(null);

  useEffect(() => {
    api.getPlans().then(setPlans).catch(() => setPlans([]));
  }, []);

  return (
    <section id="pricing" className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Pricing</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
            One plan for every stage of your team
          </h2>
          <p className="mt-3 text-[var(--ink-muted)]">
            Staff seats and student accounts are counted separately — growing your student base never costs a seat.
          </p>
        </div>

        {!plans ? (
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)]" />
            ))}
          </div>
        ) : (
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {plans.map((plan, index) => {
              const isFeatured = plan.plan === "professional";
              return (
                <motion.div
                  key={plan.plan}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className={`flex flex-col rounded-2xl border p-7 ${
                    isFeatured ? "border-[var(--accent)] bg-[var(--surface)] shadow-lg" : "border-[var(--border)] bg-[var(--surface)]"
                  }`}
                >
                  {isFeatured && (
                    <span className="mb-3 w-fit rounded-full bg-[var(--accent)]/10 px-2.5 py-1 text-xs font-semibold text-[var(--accent)]">
                      Most popular
                    </span>
                  )}
                  <h3 className="font-display text-xl font-semibold text-[var(--ink)]">{plan.label}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-semibold text-[var(--ink)]">
                      {plan.price === 0 ? "Custom" : `$${plan.price}`}
                    </span>
                    {plan.price > 0 && <span className="text-sm text-[var(--ink-muted)]">/ month</span>}
                  </div>

                  <ul className="mt-6 flex-1 space-y-2.5">
                    {planFeatures(plan).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-[var(--ink-muted)]">
                        <Check className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <ButtonLink
                    to={`/signup?plan=${plan.plan}`}
                    variant={isFeatured ? "primary" : "outline"}
                    className="mt-7 w-full"
                  >
                    {plan.price === 0 ? "Talk to us" : "Start free trial"}
                  </ButtonLink>
                </motion.div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
