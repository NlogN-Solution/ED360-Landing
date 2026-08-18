import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { api, type PlanInfo } from "@/lib/api";
import type { RegisterOrganizationPayload } from "@/lib/api";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type SignupDraft = Omit<RegisterOrganizationPayload, "card">;

export function SignupPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialPlan = (searchParams.get("plan") as PlanInfo["plan"] | null) ?? "starter";

  const [plans, setPlans] = useState<PlanInfo[]>([]);
  const [orgName, setOrgName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [country, setCountry] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState<PlanInfo["plan"]>(initialPlan);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  useEffect(() => {
    api.getPlans().then(setPlans).catch(() => setPlans([]));
  }, []);

  useEffect(() => {
    if (!slugEdited) setSlug(slugify(orgName));
  }, [orgName, slugEdited]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const draft: SignupDraft = {
      organization: { name: orgName, slug, country: country || undefined },
      owner: { first_name: firstName, last_name: lastName, email },
      plan,
      billing_cycle: billingCycle,
    };
    navigate("/checkout", { state: draft });
  }

  return (
    <>
      <Nav />
      <main className="py-16">
        <Container className="max-w-lg">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Get started</p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--ink)]">
              Create your organization
            </h1>
            <p className="mt-2 text-sm text-[var(--ink-muted)]">Takes about a minute. No credit card charged until checkout.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[var(--ink)]">Consultancy name</label>
              <input
                required
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="Horizon Education Consultants"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--paper)] px-3.5 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[var(--ink)]">Workspace URL</label>
              <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--paper)] px-3.5 py-2.5 text-sm">
                <span className="text-[var(--ink-muted)]">app.ed360.dev/</span>
                <input
                  required
                  value={slug}
                  onChange={(e) => {
                    setSlugEdited(true);
                    setSlug(slugify(e.target.value));
                  }}
                  className="flex-1 bg-transparent text-[var(--ink)] outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[var(--ink)]">Country</label>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Nepal"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--paper)] px-3.5 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[var(--ink)]">Your first name</label>
                <input
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--paper)] px-3.5 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[var(--ink)]">Last name</label>
                <input
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--paper)] px-3.5 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[var(--ink)]">Your email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@consultancy.com"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--paper)] px-3.5 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[var(--ink)]">Plan</label>
              <div className="grid grid-cols-3 gap-2">
                {(plans.length ? plans : []).map((p) => (
                  <button
                    key={p.plan}
                    type="button"
                    onClick={() => setPlan(p.plan)}
                    className={`rounded-lg border px-3 py-2.5 text-center text-sm font-medium transition-colors ${
                      plan === p.plan
                        ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                        : "border-[var(--border)] text-[var(--ink-muted)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-[var(--border)] px-3.5 py-2.5">
              <span className="text-sm text-[var(--ink)]">Billing cycle</span>
              <div className="flex gap-1 rounded-full bg-[var(--surface-raised)] p-0.5">
                {(["monthly", "yearly"] as const).map((cycle) => (
                  <button
                    key={cycle}
                    type="button"
                    onClick={() => setBillingCycle(cycle)}
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
                      billingCycle === cycle ? "bg-[var(--accent)] text-[var(--accent-ink)]" : "text-[var(--ink-muted)]"
                    }`}
                  >
                    {cycle}
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Continue to checkout <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </Container>
      </main>
    </>
  );
}
