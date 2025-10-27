import GlassCard from "./GlassCard";
import GradientButton from "./GradientButton";
import { Badge } from "@/components/ui/badge";
import { Play, DollarSign, Clock } from "lucide-react";

interface TaskCardProps {
  title: string;
  description: string;
  earnings: string;
  duration: string;
  category: string;
  available: boolean;
  onWatch?: () => void;
}

export default function TaskCard({
  title,
  description,
  earnings,
  duration,
  category,
  available,
  onWatch,
}: TaskCardProps) {
  return (
    <GlassCard className="p-6 hover-elevate group" gradient>
      <div className="flex items-start justify-between mb-4">
        <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">
          {category}
        </Badge>
        <div className="flex items-center gap-1 text-green-400 font-bold font-mono">
          <DollarSign className="w-4 h-4" />
          {earnings}
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>

        <GradientButton
          variant="purple"
          icon={Play}
          onClick={onWatch}
          disabled={!available}
          className="px-4 py-2"
          testId={`button-watch-${title.toLowerCase().replace(/\s/g, '-')}`}
        >
          {available ? "Watch Now" : "Unavailable"}
        </GradientButton>
      </div>
    </GlassCard>
  );
}
