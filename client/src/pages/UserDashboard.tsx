import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import TransactionItem from "@/components/TransactionItem";
import AdWatchModal from "@/components/AdWatchModal";
import DepositWithdrawForm from "@/components/DepositWithdrawForm";
import GlassCard from "@/components/GlassCard";
import GradientButton from "@/components/GradientButton";
import TaskCard from "@/components/TaskCard";
import PlanCard from "@/components/PlanCard";
import { useTheme } from "@/components/ThemeProvider";
import {
  DollarSign,
  Users,
  TrendingUp,
  Award,
  LayoutDashboard,
  Wallet,
  User,
  LogOut,
  Moon,
  Sun,
  Play,
  ListTodo,
  Package,
  Share2,
  Copy,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UserDashboard() {
  const [activeView, setActiveView] = useState<"dashboard" | "tasks" | "plans" | "deposit" | "withdrawal" | "profile" | "referral">("dashboard");
  const [adModalOpen, setAdModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  const user = {
    username: "john_doe",
    plan: "Premium",
    earnings: 1234.56,
    referrals: 5,
    adsWatched: 328,
    referralLink: `https://taskhub.site/ref/john_doe`,
  };

  const transactions = [
    { type: "deposit" as const, amount: "$50.00", status: "approved" as const, date: "2 hours ago", method: "Easypaisa" },
    { type: "withdrawal" as const, amount: "$100.00", status: "pending" as const, date: "1 day ago", method: "JazzCash" },
    { type: "earning" as const, amount: "$5.50", status: "approved" as const, date: "3 hours ago" },
    { type: "earning" as const, amount: "$3.25", status: "approved" as const, date: "5 hours ago" },
  ];

  const tasks = [
    {
      title: "Watch Product Review",
      description: "Watch a 30-second product review video",
      earnings: "0.50",
      duration: "30 seconds",
      category: "Video Ad",
      available: true,
    },
    {
      title: "Mobile App Advertisement",
      description: "View a mobile app promotional ad",
      earnings: "0.75",
      duration: "45 seconds",
      category: "App Ad",
      available: true,
    },
    {
      title: "Brand Awareness Campaign",
      description: "Watch a brand awareness video",
      earnings: "1.00",
      duration: "60 seconds",
      category: "Brand Ad",
      available: true,
    },
    {
      title: "Survey & Watch",
      description: "Complete a quick survey and watch an ad",
      earnings: "2.00",
      duration: "2 minutes",
      category: "Survey",
      available: false,
    },
  ];

  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      duration: "month",
      features: ["Watch 50 ads per day", "$0.10 per ad", "Basic support", "1 referral link"],
    },
    {
      name: "Premium",
      price: "$19.99",
      duration: "month",
      features: ["Watch 150 ads per day", "$0.15 per ad", "Priority support", "3 referral links", "Bonus rewards"],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$49.99",
      duration: "month",
      features: ["Unlimited ads per day", "$0.20 per ad", "24/7 support", "Unlimited referrals", "Premium rewards", "Custom dashboard"],
    },
  ];

  const copyReferralLink = () => {
    navigator.clipboard.writeText(user.referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarContent className="gap-6 p-4">
            <div className="flex flex-col items-center gap-3 p-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white text-xl font-bold">
                  {user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="font-semibold" data-testid="text-username">{user.username}</p>
                <Badge className="mt-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">
                  {user.plan}
                </Badge>
              </div>
            </div>

            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveView("dashboard")}
                      isActive={activeView === "dashboard"}
                      data-testid="link-dashboard"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveView("tasks")}
                      isActive={activeView === "tasks"}
                      data-testid="link-tasks"
                    >
                      <ListTodo className="w-4 h-4" />
                      <span>Tasks</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveView("plans")}
                      isActive={activeView === "plans"}
                      data-testid="link-plans"
                    >
                      <Package className="w-4 h-4" />
                      <span>Plans</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveView("deposit")}
                      isActive={activeView === "deposit"}
                      data-testid="link-deposit"
                    >
                      <Wallet className="w-4 h-4" />
                      <span>Deposit</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveView("withdrawal")}
                      isActive={activeView === "withdrawal"}
                      data-testid="link-withdrawal"
                    >
                      <DollarSign className="w-4 h-4" />
                      <span>Withdrawal</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveView("referral")}
                      isActive={activeView === "referral"}
                      data-testid="link-referral"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Referral</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveView("profile")}
                      isActive={activeView === "profile"}
                      data-testid="link-profile"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => window.location.href = "/login"}
                      data-testid="button-logout"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b gap-4">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <h1 className="text-2xl font-bold font-mono flex-1">TaskHub</h1>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover-elevate"
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </header>

          <main className="flex-1 overflow-auto p-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
            {activeView === "dashboard" && (
              <div className="max-w-7xl mx-auto space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    title="Total Earnings"
                    value={`$${user.earnings.toFixed(2)}`}
                    icon={DollarSign}
                    trend="+12.5% this month"
                    trendUp={true}
                    gradient="purple"
                  />
                  <StatCard
                    title="Referrals"
                    value={user.referrals}
                    icon={Users}
                    trend="+2 this week"
                    trendUp={true}
                    gradient="cyan"
                  />
                  <StatCard
                    title="Ads Watched"
                    value={user.adsWatched}
                    icon={TrendingUp}
                    trend="+23 today"
                    trendUp={true}
                    gradient="green"
                  />
                  <StatCard
                    title="Current Plan"
                    value={user.plan}
                    icon={Award}
                    gradient="orange"
                  />
                </div>

                <GlassCard className="p-6" gradient>
                  <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <GradientButton
                      variant="purple"
                      icon={Play}
                      onClick={() => setAdModalOpen(true)}
                      className="w-full"
                      testId="button-watch-ads"
                    >
                      Watch Ads
                    </GradientButton>
                    <GradientButton
                      variant="green"
                      onClick={() => setActiveView("deposit")}
                      className="w-full"
                      testId="button-deposit"
                    >
                      Deposit Funds
                    </GradientButton>
                    <GradientButton
                      variant="cyan"
                      onClick={() => setActiveView("withdrawal")}
                      className="w-full"
                      testId="button-withdraw"
                    >
                      Withdraw Earnings
                    </GradientButton>
                  </div>
                </GlassCard>

                <GlassCard className="p-6" gradient>
                  <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
                  <div className="space-y-3">
                    {transactions.map((tx, i) => (
                      <TransactionItem key={i} {...tx} />
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="p-6" gradient>
                  <h2 className="text-xl font-semibold mb-4">Referral Progress</h2>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-muted-foreground">Total Referrals</span>
                    <span className="text-3xl font-bold font-mono">{user.referrals}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You have {user.referrals} active referral{user.referrals !== 1 ? "s" : ""}. Each new referral unlocks 1 withdrawal.
                  </p>
                </GlassCard>
              </div>
            )}

            {activeView === "tasks" && (
              <div className="max-w-7xl mx-auto space-y-6 relative z-10">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold font-mono mb-2">Available Tasks</h2>
                  <p className="text-muted-foreground">Watch ads and earn money instantly</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tasks.map((task, i) => (
                    <TaskCard
                      key={i}
                      {...task}
                      onWatch={() => setAdModalOpen(true)}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeView === "plans" && (
              <div className="max-w-7xl mx-auto space-y-6 relative z-10">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold font-mono mb-2">Choose Your Plan</h2>
                  <p className="text-muted-foreground">Select the plan that fits your goals</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan, i) => (
                    <PlanCard
                      key={i}
                      {...plan}
                      onSelect={() => console.log(`Selected ${plan.name}`)}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeView === "deposit" && (
              <div className="max-w-7xl mx-auto relative z-10">
                <DepositWithdrawForm
                  type="deposit"
                  referralCount={user.referrals}
                />
              </div>
            )}

            {activeView === "withdrawal" && (
              <div className="max-w-7xl mx-auto relative z-10">
                <DepositWithdrawForm
                  type="withdrawal"
                  referralCount={user.referrals}
                />
              </div>
            )}

            {activeView === "referral" && (
              <div className="max-w-3xl mx-auto space-y-6 relative z-10">
                <GlassCard className="p-8" gradient>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600">
                      <Share2 className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold font-mono">TaskHub Referral Program</h2>
                  </div>

                  <p className="text-lg mb-6">
                    Share your unique link and earn{" "}
                    <span className="text-primary font-bold">10% commission</span> on the deposits
                    of every friend you invite!
                  </p>

                  <div className="space-y-4">
                    <label className="text-sm font-medium">Your Referral Link</label>
                    <div className="flex gap-3">
                      <Input
                        value={user.referralLink}
                        readOnly
                        className="font-mono"
                        data-testid="input-referral-link"
                      />
                      <Button
                        onClick={copyReferralLink}
                        className="hover-elevate"
                        data-testid="button-copy-referral"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/10">
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Friends Invited</p>
                      <p className="text-3xl font-bold font-mono">{user.referrals}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Commission Earned</p>
                      <p className="text-3xl font-bold font-mono text-green-500">$350.50</p>
                    </div>
                  </div>

                  <GradientButton
                    variant="purple"
                    icon={Share2}
                    onClick={copyReferralLink}
                    className="w-full mt-6"
                    testId="button-share-invitation"
                  >
                    Share Invitation Link
                  </GradientButton>
                </GlassCard>
              </div>
            )}

            {activeView === "profile" && (
              <div className="max-w-3xl mx-auto space-y-6 relative z-10">
                <GlassCard className="p-8" gradient>
                  <h2 className="text-2xl font-bold font-mono mb-6">Profile Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Username</label>
                      <Input value={user.username} readOnly className="mt-2" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Current Plan</label>
                      <Input value={user.plan} readOnly className="mt-2" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Total Earnings</label>
                      <Input value={`$${user.earnings.toFixed(2)}`} readOnly className="mt-2" />
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}
          </main>
        </div>
      </div>
      <AdWatchModal open={adModalOpen} onClose={() => setAdModalOpen(false)} />
    </SidebarProvider>
  );
}
