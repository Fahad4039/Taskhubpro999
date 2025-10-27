import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import GlassCard from "./GlassCard";
import GradientButton from "./GradientButton";
import { ArrowDownCircle, ArrowUpCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  method: z.enum(["easypaisa", "jazzcash"]),
  accountNumber: z.string().min(10, "Account number must be at least 10 digits"),
});

interface DepositWithdrawFormProps {
  type: "deposit" | "withdrawal";
  referralCount?: number;
  onSubmit?: (data: z.infer<typeof formSchema>) => void;
}

export default function DepositWithdrawForm({
  type,
  referralCount = 0,
  onSubmit,
}: DepositWithdrawFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const requiresReferral = type === "withdrawal" && referralCount < 1;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      method: "easypaisa",
      accountNumber: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(`${type} submitted:`, data);
    setSubmitted(true);
    onSubmit?.(data);
  };

  return (
    <GlassCard className="p-8 max-w-lg mx-auto" gradient>
      <div className="flex items-center gap-3 mb-6">
        {type === "deposit" ? (
          <ArrowDownCircle className="w-8 h-8 text-green-500" />
        ) : (
          <ArrowUpCircle className="w-8 h-8 text-blue-500" />
        )}
        <h2 className="text-2xl font-bold font-mono capitalize">{type}</h2>
      </div>

      {requiresReferral && (
        <Alert className="mb-6 border-yellow-500/30 bg-yellow-500/10">
          <AlertCircle className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-yellow-500">
            You need at least 1 active referral (who has deposited and bought a plan) to make a withdrawal.
          </AlertDescription>
        </Alert>
      )}

      {submitted ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">✓</div>
          <h3 className="text-xl font-bold mb-2">Request Submitted!</h3>
          <p className="text-muted-foreground">
            Your {type} request is pending admin approval.
          </p>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (USD)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="text-2xl font-bold font-mono"
                      data-testid="input-amount"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div>
                        <RadioGroupItem
                          value="easypaisa"
                          id="easypaisa"
                          className="peer sr-only"
                        />
                        <label
                          htmlFor="easypaisa"
                          className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover-elevate cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                          data-testid="option-easypaisa"
                        >
                          <span className="text-lg font-semibold">Easypaisa</span>
                        </label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="jazzcash"
                          id="jazzcash"
                          className="peer sr-only"
                        />
                        <label
                          htmlFor="jazzcash"
                          className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover-elevate cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                          data-testid="option-jazzcash"
                        >
                          <span className="text-lg font-semibold">JazzCash</span>
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="03XXXXXXXXX"
                      data-testid="input-account-number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <GradientButton
              type="submit"
              variant={type === "deposit" ? "green" : "cyan"}
              className="w-full"
              disabled={requiresReferral}
              testId={`button-submit-${type}`}
            >
              Submit {type}
            </GradientButton>
          </form>
        </Form>
      )}
    </GlassCard>
  );
}
