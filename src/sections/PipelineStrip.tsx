import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserPlus, FileCheck2, Send, Award, Stamp, GraduationCap } from "lucide-react";

const STAGES = [
  { label: "Lead", icon: UserPlus },
  { label: "Documents verified", icon: FileCheck2 },
  { label: "Application submitted", icon: Send },
  { label: "Offer received", icon: Award },
  { label: "Visa approved", icon: Stamp },
  { label: "Enrolled", icon: GraduationCap },
];

/**
 * The signature element — a live-feeling strip of the exact pipeline every
 * consultancy already runs by hand (and that ED360 models as real
 * `WorkflowStage` rows, not an invented metaphor). One stage lights up at a
 * time, cycling continuously.
 */
export function PipelineStrip() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActive((i) => (i + 1) % STAGES.length), 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex min-w-max items-center gap-1.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 sm:min-w-0 sm:gap-2">
        {STAGES.map((stage, index) => {
          const isActive = index === active;
          const isPast = index < active;
          const Icon = stage.icon;
          return (
            <div key={stage.label} className="flex items-center gap-1.5 sm:gap-2">
              <div
                className={`flex items-center gap-2 rounded-full px-3 py-2 transition-colors duration-500 ${
                  isActive
                    ? "bg-[var(--accent)] text-[var(--accent-ink)]"
                    : isPast
                      ? "bg-[var(--surface-raised)] text-[var(--ink-muted)]"
                      : "text-[var(--ink-muted)]"
                }`}
              >
                <div className="relative flex h-4 w-4 items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isActive ? "active" : "idle"}
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Icon className="h-4 w-4" strokeWidth={2.25} />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <span className="whitespace-nowrap text-[13px] font-medium">{stage.label}</span>
              </div>
              {index < STAGES.length - 1 && (
                <div className="h-px w-4 shrink-0 bg-[var(--border)] sm:w-6" aria-hidden />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
