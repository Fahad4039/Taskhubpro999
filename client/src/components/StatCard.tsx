import { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import GlassCard from "./GlassCard";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  gradient?: "purple" | "cyan" | "green" | "orange";
}

const iconGradients = {
  purple: "bg-gradient-to-br from-purple-600 to-pink-600",
  cyan: "bg-gradient-to-br from-blue-600 to-cyan-600",
  green: "bg-gradient-to-br from-green-600 to-emerald-600",
  orange: "bg-gradient-to-br from-orange-600 to-yellow-600",
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  gradient = "cyan",
}: StatCardProps) {
  return (
    <GlassCard className="p-6" gradient>
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className={cn("p-2 rounded-lg", iconGradients[gradient])}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <p className="text-3xl font-bold font-mono mb-2">{value}</p>
      {trend && (
        <div className="flex items-center gap-1 text-sm">
          {trendUp ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={trendUp ? "text-green-500" : "text-red-500"}>
            {trend}
          </span>
        </div>
      )}
    </GlassCard>
  );
}
