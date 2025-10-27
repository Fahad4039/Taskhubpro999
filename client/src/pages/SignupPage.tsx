import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation } from "wouter";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GlassCard from "@/components/GlassCard";
import GradientButton from "@/components/GradientButton";
import { UserPlus, Mail } from "lucide-react";

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function SignupPage() {
  const [, setLocation] = useLocation();
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignup = (data: z.infer<typeof signupSchema>) => {
    console.log("Signup attempt:", data);
    setVerificationSent(true);
  };

  const handleVerify = () => {
    console.log("Verification code:", verificationCode);
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600 via-blue-600 to-cyan-600" style={{ backgroundSize: "200% 200%", animation: "gradient-shift 15s ease infinite" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <h1 className="text-5xl font-bold font-mono mb-6">Join TaskHub</h1>
          <p className="text-2xl mb-8">Start Earning Today</p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>Free to join, no hidden fees</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Instant email verification</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-pink-400" />
              <span>Multiple earning opportunities</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <GlassCard className="w-full max-w-md p-8" gradient>
          <div className="mb-8">
            <h2 className="text-3xl font-bold font-mono mb-2">Create Account</h2>
            <p className="text-muted-foreground">Sign up to start earning</p>
          </div>

          {!verificationSent ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Choose a username"
                          data-testid="input-username"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="your@email.com"
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="03XXXXXXXXX"
                          data-testid="input-phone"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Create a password"
                          data-testid="input-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Confirm your password"
                          data-testid="input-confirm-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <GradientButton
                  type="submit"
                  variant="cyan"
                  icon={UserPlus}
                  className="w-full mt-6"
                  testId="button-signup"
                >
                  Create Account
                </GradientButton>
              </form>
            </Form>
          ) : (
            <div className="space-y-6">
              <div className="text-center p-6 rounded-lg bg-green-500/10 border border-green-500/30">
                <Mail className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Verification Code Sent</h3>
                <p className="text-sm text-muted-foreground">
                  Check your email for the verification code
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Verification Code</label>
                <Input
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="text-center text-2xl font-mono tracking-widest"
                  maxLength={6}
                  data-testid="input-verification-code"
                />
              </div>

              <GradientButton
                variant="green"
                onClick={handleVerify}
                className="w-full"
                disabled={verificationCode.length !== 6}
                testId="button-verify"
              >
                Verify & Continue
              </GradientButton>
            </div>
          )}

          <p className="text-center mt-6 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-semibold" data-testid="link-login">
              Login
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
