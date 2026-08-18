import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Check, Copy } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import type { RegisterOrganizationResponse } from "@/lib/api";

export function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state as RegisterOrganizationResponse | null;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!result) navigate("/signup", { replace: true });
  }, [result, navigate]);

  if (!result) return null;

  function handleCopy() {
    navigator.clipboard.writeText(result!.temporary_password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <Nav />
      <main className="py-20">
        <Container className="max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
            <Check className="h-6 w-6" strokeWidth={2.5} />
          </div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)]">You're all set</h1>
          <p className="mt-2 text-[var(--ink-muted)]">Your organization is live. Here's how to sign in for the first time.</p>

          <div className="mt-8 space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-left">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--ink-muted)]">Login email</p>
              <p className="mt-1 text-sm font-medium text-[var(--ink)]">{result.owner_email}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--ink-muted)]">Temporary password</p>
              <div className="mt-1 flex items-center gap-2">
                <code className="flex-1 rounded-lg bg-[var(--surface-raised)] px-3 py-2 text-sm text-[var(--ink)]">
                  {result.temporary_password}
                </code>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--ink-muted)] hover:text-[var(--ink)]"
                >
                  {copied ? <Check className="h-4 w-4 text-[var(--accent)]" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <p className="mt-1.5 text-xs text-[var(--ink-muted)]">
                You'll be asked to set your own password the first time you log in.
              </p>
            </div>
          </div>

          <ButtonLink to={result.login_url} size="lg" className="mt-8 w-full">
            Log in to ED360
          </ButtonLink>
        </Container>
      </main>
    </>
  );
}
