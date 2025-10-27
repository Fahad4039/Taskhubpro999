import GlassCard from "./GlassCard";
import GradientButton from "./GradientButton";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PlanCardProps {
  name: string;
  price: string;
  duration: string;
  features: string[];
  popular?: boolean;
  onSelect?: () => void;
  userCount?: number;
}

export default function PlanCard({
  name,
  price,
  duration,
  features,
  popular,
  onSelect,
  userCount,
}: PlanCardProps) {
  return (
    <GlassCard className="p-8 relative" gradient>
      {popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">
          Most Popular
        </Badge>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold font-mono mb-2">{name}</h3>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-5xl font-bold font-mono">{price}</span>
          <span className="text-muted-foreground">/{duration}</span>
        </div>
        {userCount !== undefined && (
          <p className="text-sm text-muted-foreground mt-2">
            {userCount} active users
          </p>
        )}
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="w-3 h-3 text-green-500" />
            </div>
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <GradientButton
        variant={popular ? "purple" : "cyan"}
        onClick={onSelect}
        className="w-full"
        testId={`button-select-${name.toLowerCase()}`}
      >
        Select Plan
      </GradientButton>
    </GlassCard>
  );
}
