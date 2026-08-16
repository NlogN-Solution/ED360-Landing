import { Link } from "react-router";
import { Zap } from "lucide-react";
import { Container } from "@/components/Container";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Features", to: "/#features" },
      { label: "Pricing", to: "/pricing" },
      { label: "How it works", to: "/#how-it-works" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "FAQ", to: "/#faq" },
      { label: "Sign up", to: "/signup" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--accent-ink)]">
              <Zap className="h-3.5 w-3.5" strokeWidth={2.5} />
            </div>
            <span className="font-display text-[15px] font-semibold tracking-tight">Ignition</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-[var(--ink-muted)]">
            The operating system for international education consultancies — from first call to visa stamp.
          </p>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.heading}>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">{column.heading}</p>
            <ul className="mt-3 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.to}>
                  <a href={link.to} className="text-sm text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="flex flex-col gap-2 border-t border-[var(--border)] py-6 text-xs text-[var(--ink-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Ignition. A demo product built for illustration.</p>
      </Container>
    </footer>
  );
}
