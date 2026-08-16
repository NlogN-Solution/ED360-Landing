import { Link } from "react-router";
import { Zap } from "lucide-react";
import { ButtonLink } from "./Button";
import { Container } from "./Container";
import { APP_URL } from "@/lib/api";

const LINKS = [
  { label: "Features", to: "/#features" },
  { label: "How it works", to: "/#how-it-works" },
  { label: "Pricing", to: "/pricing" },
  { label: "FAQ", to: "/#faq" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)]/60 bg-[var(--paper)]/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--accent-ink)]">
            <Zap className="h-3.5 w-3.5" strokeWidth={2.5} />
          </div>
          <span className="font-display text-[15px] font-semibold tracking-tight">Ignition</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <a key={link.to} href={link.to} className="text-sm text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`${APP_URL}/login`}
            className="hidden text-sm font-medium text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)] sm:inline"
          >
            Log in
          </a>
          <ButtonLink to="/signup" size="sm">
            Start free trial
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}
