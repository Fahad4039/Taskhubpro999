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
import { LogIn } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const [, setLocation] = useLocation();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = (data: z.infer<typeof loginSchema>) => {
    console.log("Login attempt:", data);
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600 via-blue-600 to-cyan-600" style={{ backgroundSize: "200% 200%", animation: "gradient-shift 15s ease infinite" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <h1 className="text-5xl font-bold font-mono mb-6">Welcome Back</h1>
          <p className="text-2xl mb-8">Continue Earning with TaskHub</p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>Watch ads and earn instantly</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Track your earnings in real-time</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-pink-400" />
              <span>Withdraw anytime you want</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <GlassCard className="w-full max-w-md p-8" gradient>
          <div className="mb-8">
            <h2 className="text-3xl font-bold font-mono mb-2">Login</h2>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your username"
                        data-testid="input-username"
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
                        placeholder="Enter your password"
                        data-testid="input-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <GradientButton
                type="submit"
                variant="cyan"
                icon={LogIn}
                className="w-full mt-6"
                testId="button-login"
              >
                Login
              </GradientButton>
            </form>
          </Form>

          <p className="text-center mt-6 text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-semibold" data-testid="link-signup">
              Sign up
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
