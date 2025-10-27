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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import GlassCard from "./GlassCard";
import GradientButton from "./GradientButton";
import { Save } from "lucide-react";

const walletSchema = z.object({
  easypaisaEnabled: z.boolean(),
  easypaisaMinDeposit: z.string(),
  easypaisaMinWithdraw: z.string(),
  easypaisaFee: z.string(),
  jazzcashEnabled: z.boolean(),
  jazzcashMinDeposit: z.string(),
  jazzcashMinWithdraw: z.string(),
  jazzcashFee: z.string(),
});

export default function WalletSettingsForm() {
  const [saved, setSaved] = useState(false);

  const form = useForm<z.infer<typeof walletSchema>>({
    resolver: zodResolver(walletSchema),
    defaultValues: {
      easypaisaEnabled: true,
      easypaisaMinDeposit: "10",
      easypaisaMinWithdraw: "50",
      easypaisaFee: "2",
      jazzcashEnabled: true,
      jazzcashMinDeposit: "10",
      jazzcashMinWithdraw: "50",
      jazzcashFee: "2",
    },
  });

  const handleSubmit = (data: z.infer<typeof walletSchema>) => {
    console.log("Wallet settings saved:", data);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <GlassCard className="p-8" gradient>
      <h2 className="text-2xl font-bold font-mono mb-6">Wallet Settings</h2>

      {saved && (
        <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-500">
          ✓ Settings saved successfully!
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-3">
              Easypaisa Settings
            </h3>
            
            <FormField
              control={form.control}
              name="easypaisaEnabled"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border border-white/10 p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Enable Easypaisa</FormLabel>
                    <FormDescription>
                      Allow users to deposit/withdraw via Easypaisa
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      data-testid="switch-easypaisa-enabled"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="easypaisaMinDeposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Deposit ($)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        data-testid="input-easypaisa-min-deposit"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="easypaisaMinWithdraw"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Withdraw ($)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        data-testid="input-easypaisa-min-withdraw"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="easypaisaFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Fee (%)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        data-testid="input-easypaisa-fee"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-3">
              JazzCash Settings
            </h3>
            
            <FormField
              control={form.control}
              name="jazzcashEnabled"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border border-white/10 p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Enable JazzCash</FormLabel>
                    <FormDescription>
                      Allow users to deposit/withdraw via JazzCash
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      data-testid="switch-jazzcash-enabled"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="jazzcashMinDeposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Deposit ($)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        data-testid="input-jazzcash-min-deposit"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jazzcashMinWithdraw"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Withdraw ($)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        data-testid="input-jazzcash-min-withdraw"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jazzcashFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Fee (%)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        data-testid="input-jazzcash-fee"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <GradientButton
            type="submit"
            variant="purple"
            icon={Save}
            className="w-full"
            testId="button-save-wallet-settings"
          >
            Save Wallet Settings
          </GradientButton>
        </form>
      </Form>
    </GlassCard>
  );
}
