import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface GradientButtonProps {
  children: React.ReactNode;
  variant?: "purple" | "cyan" | "green" | "orange";
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  testId?: string;
}

const gradients = {
  purple: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
  cyan: "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700",
  green: "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
  orange: "bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700",
};

export default function GradientButton({
  children,
  variant = "cyan",
  icon: Icon,
  onClick,
  className,
  type = "button",
  disabled,
  testId,
}: GradientButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
      className={cn(
        "relative overflow-hidden text-white border-0 no-default-hover-elevate no-default-active-elevate",
        gradients[variant],
        "transition-all duration-200",
        className
      )}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </Button>
  );
}
