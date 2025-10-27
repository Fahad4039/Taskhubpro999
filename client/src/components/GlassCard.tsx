import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

export default function GlassCard({ children, className, gradient }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border backdrop-blur-sm overflow-visible",
        gradient
          ? "bg-card/50 border-white/10"
          : "bg-card border-card-border",
        className
      )}
    >
      {children}
    </div>
  );
}
