import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import GradientButton from "./GradientButton";
import { Save } from "lucide-react";

const planSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Price is required"),
  duration: z.string().min(1, "Duration is required"),
  features: z.string().min(1, "Features are required"),
});

interface EditPlanModalProps {
  open: boolean;
  onClose: () => void;
  plan?: {
    name: string;
    price: string;
    duration: string;
    features: string[];
  };
}

export default function EditPlanModal({ open, onClose, plan }: EditPlanModalProps) {
  const form = useForm<z.infer<typeof planSchema>>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: plan?.name || "",
      price: plan?.price || "",
      duration: plan?.duration || "month",
      features: plan?.features.join("\n") || "",
    },
  });

  const handleSubmit = (data: z.infer<typeof planSchema>) => {
    console.log("Plan saved:", data);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-mono">
            {plan ? "Edit Plan" : "Create Plan"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Basic" data-testid="input-plan-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="$9.99" data-testid="input-plan-price" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="month" data-testid="input-plan-duration" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features (one per line)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Watch 50 ads per day&#10;$0.10 per ad&#10;Basic support"
                      rows={5}
                      data-testid="input-plan-features"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <GradientButton
              type="submit"
              variant="purple"
              icon={Save}
              className="w-full"
              testId="button-save-plan"
            >
              Save Plan
            </GradientButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
