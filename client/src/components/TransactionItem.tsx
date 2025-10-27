import { ArrowDownCircle, ArrowUpCircle, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TransactionItemProps {
  type: "deposit" | "withdrawal" | "earning";
  amount: string;
  status: "pending" | "approved" | "rejected";
  date: string;
  method?: string;
}

const typeIcons = {
  deposit: ArrowDownCircle,
  withdrawal: ArrowUpCircle,
  earning: Play,
};

const statusColors = {
  pending: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
  approved: "bg-green-500/20 text-green-500 border-green-500/30",
  rejected: "bg-red-500/20 text-red-500 border-red-500/30",
};

export default function TransactionItem({
  type,
  amount,
  status,
  date,
  method,
}: TransactionItemProps) {
  const Icon = typeIcons[type];

  return (
    <div className="flex items-center justify-between p-4 rounded-lg hover-elevate border border-white/10">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "p-2 rounded-lg",
            type === "deposit" && "bg-green-500/20",
            type === "withdrawal" && "bg-blue-500/20",
            type === "earning" && "bg-purple-500/20"
          )}
        >
          <Icon
            className={cn(
              "w-5 h-5",
              type === "deposit" && "text-green-500",
              type === "withdrawal" && "text-blue-500",
              type === "earning" && "text-purple-500"
            )}
          />
        </div>
        <div>
          <p className="font-semibold text-foreground capitalize">{type}</p>
          <p className="text-sm text-muted-foreground">
            {date}
            {method && ` • ${method}`}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p className="font-bold font-mono text-foreground">{amount}</p>
        <Badge className={cn("capitalize", statusColors[status])}>
          {status}
        </Badge>
      </div>
    </div>
  );
}
