import { useEffect, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { Loader2, Lock } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { api, ApiError, type PlanInfo } from "@/lib/api";
import type { SignupDraft } from "./SignupPage";

const PLAN_LABELS: Record<string, string> = { starter: "Starter", professional: "Professional", enterprise: "Enterprise" };

export function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const draft = location.state as SignupDraft | null;

  const [plans, setPlans] = useState<PlanInfo[]>([]);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!draft) navigate("/signup", { replace: true });
  }, [draft, navigate]);

  useEffect(() => {
    api.getPlans().then(setPlans).catch(() => setPlans([]));
  }, []);

  if (!draft) return null;

  const selectedPlan = plans.find((p) => p.plan === draft.plan);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const response = await api.registerOrganization({
        ...draft,
        card: { card_number: cardNumber, expiry, cvv },
      });
      navigate("/success", { state: response });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Nav />
      <main className="py-16">
        <Container className="max-w-lg">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Checkout</p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--ink)]">
              Confirm your subscription
            </h1>
          </div>

          <div className="mb-5 flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <div>
              <p className="text-sm text-[var(--ink-muted)]">{draft.organization.name}</p>
              <p className="font-display text-lg font-semibold text-[var(--ink)]">
                {PLAN_LABELS[draft.plan] ?? draft.plan} plan
              </p>
            </div>
            <div className="text-right">
              <p className="font-display text-2xl font-semibold text-[var(--ink)]">
                {selectedPlan ? (selectedPlan.price === 0 ? "Custom" : `$${selectedPlan.price}`) : "—"}
              </p>
              <p className="text-xs text-[var(--ink-muted)]">/ {draft.billing_cycle === "monthly" ? "month" : "year"}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[var(--ink)]">Card number</label>
              <input
                required
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="4242 4242 4242 4242"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--paper)] px-3.5 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
              />
              <p className="text-xs text-[var(--ink-muted)]">This is a demo checkout — a card number ending in 0000 will decline.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[var(--ink)]">Expiry</label>
                <input
                  required
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--paper)] px-3.5 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[var(--ink)]">CVV</label>
                <input
                  required
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--paper)] px-3.5 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
                />
              </div>
            </div>

            {error && <p className="rounded-lg bg-red-500/10 px-3.5 py-2.5 text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full" size="lg" disabled={submitting}>
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
              {submitting ? "Processing…" : "Confirm and create organization"}
            </Button>
          </form>
        </Container>
      </main>
    </>
  );
}
