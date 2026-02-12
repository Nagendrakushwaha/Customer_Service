import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
  dark?: boolean;
}

export function Section({ id, className, children, dark = false }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-32 relative overflow-hidden",
        dark ? "bg-slate-950 text-white" : "bg-white text-slate-900",
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export function SectionHeader({ title, subtitle, className }: { title: string; subtitle?: string; className?: string }) {
  return (
    <div className={cn("mb-12 md:mb-16 max-w-3xl", className)}>
      <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display tracking-tight">{title}</h2>
      {subtitle && <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{subtitle}</p>}
    </div>
  );
}
