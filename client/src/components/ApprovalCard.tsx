import { useState } from "react";
import GlassCard from "./GlassCard";
import GradientButton from "./GradientButton";
import { CheckCircle, XCircle, User, Wallet } from "lucide-react";

interface ApprovalCardProps {
  id: string;
  username: string;
  type: "deposit" | "withdrawal";
  amount: string;
  method: string;
  accountNumber: string;
  date: string;
}

export default function ApprovalCard({
  id,
  username,
  type,
  amount,
  method,
  accountNumber,
  date,
}: ApprovalCardProps) {
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">("pending");

  const handleApprove = () => {
    console.log("Approved:", id);
    setStatus("approved");
  };

  const handleReject = () => {
    console.log("Rejected:", id);
    setStatus("rejected");
  };

  return (
    <GlassCard className="p-6" gradient>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold" data-testid={`text-username-${id}`}>{username}</p>
            <p className="text-sm text-muted-foreground">{date}</p>
          </div>
        </div>
        <Wallet className={type === "deposit" ? "w-5 h-5 text-green-500" : "w-5 h-5 text-blue-500"} />
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Type</span>
          <span className="font-semibold capitalize">{type}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Amount</span>
          <span className="font-bold font-mono">{amount}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Method</span>
          <span className="font-semibold">{method}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Account</span>
          <span className="font-mono text-xs">{accountNumber}</span>
        </div>
      </div>

      {status === "pending" ? (
        <div className="grid grid-cols-2 gap-3">
          <GradientButton
            variant="green"
            icon={CheckCircle}
            onClick={handleApprove}
            className="w-full"
            testId={`button-approve-${id}`}
          >
            Approve
          </GradientButton>
          <GradientButton
            variant="orange"
            icon={XCircle}
            onClick={handleReject}
            className="w-full"
            testId={`button-reject-${id}`}
          >
            Reject
          </GradientButton>
        </div>
      ) : (
        <div className={`p-3 rounded-lg text-center font-semibold ${
          status === "approved" 
            ? "bg-green-500/20 text-green-500" 
            : "bg-red-500/20 text-red-500"
        }`}>
          {status === "approved" ? "✓ Approved" : "✗ Rejected"}
        </div>
      )}
    </GlassCard>
  );
}
