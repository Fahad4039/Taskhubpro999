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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatCard from "@/components/StatCard";
import ApprovalCard from "@/components/ApprovalCard";
import PlanCard from "@/components/PlanCard";
import GlassCard from "@/components/GlassCard";
import EditPlanModal from "@/components/EditPlanModal";
import WalletSettingsForm from "@/components/WalletSettingsForm";
import GradientButton from "@/components/GradientButton";
import { useTheme } from "@/components/ThemeProvider";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Package,
  LogOut,
  Moon,
  Sun,
  DollarSign,
  Clock,
  CheckCircle,
  UserPlus,
  Settings,
  Wallet,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState("dashboard");
  const [editPlanModalOpen, setEditPlanModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const { theme, toggleTheme } = useTheme();

  const handleEditPlan = (plan: any) => {
    setSelectedPlan(plan);
    setEditPlanModalOpen(true);
  };

  const handleCreatePlan = () => {
    setSelectedPlan(null);
    setEditPlanModalOpen(true);
  };

  const handleDeletePlan = (planName: string) => {
    console.log("Delete plan:", planName);
  };

  const stats = {
    pendingApprovals: 12,
    totalUsers: 1543,
    totalEarnings: 45678.90,
    withdrawalRequests: 8,
  };

  const pendingApprovals = [
    {
      id: "1",
      username: "john_doe",
      type: "deposit" as const,
      amount: "$50.00",
      method: "Easypaisa",
      accountNumber: "03001234567",
      date: "2 hours ago",
    },
    {
      id: "2",
      username: "jane_smith",
      type: "withdrawal" as const,
      amount: "$100.00",
      method: "JazzCash",
      accountNumber: "03129876543",
      date: "5 hours ago",
    },
    {
      id: "3",
      username: "bob_wilson",
      type: "deposit" as const,
      amount: "$25.00",
      method: "Easypaisa",
      accountNumber: "03451112222",
      date: "1 day ago",
    },
  ];

  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      duration: "month",
      features: ["Watch 50 ads per day", "$0.10 per ad", "Basic support", "1 referral link"],
      userCount: 142,
    },
    {
      name: "Premium",
      price: "$19.99",
      duration: "month",
      features: ["Watch 150 ads per day", "$0.15 per ad", "Priority support", "3 referral links", "Bonus rewards"],
      userCount: 387,
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$49.99",
      duration: "month",
      features: ["Unlimited ads per day", "$0.20 per ad", "24/7 support", "Unlimited referrals", "Premium rewards", "Custom dashboard"],
      userCount: 56,
    },
  ];

  const users = [
    { id: 1, username: "john_doe", email: "john@example.com", plan: "Premium", earnings: 234.56, status: "active" },
    { id: 2, username: "jane_smith", email: "jane@example.com", plan: "Basic", earnings: 89.12, status: "active" },
    { id: 3, username: "bob_wilson", email: "bob@example.com", plan: "Enterprise", earnings: 567.89, status: "active" },
  ];

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
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">A</span>
              </div>
              <div className="text-center">
                <p className="font-semibold">Admin</p>
              </div>
            </div>

            <SidebarGroup>
              <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
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
                      onClick={() => setActiveView("approvals")}
                      isActive={activeView === "approvals"}
                      data-testid="link-approvals"
                    >
                      <ClipboardCheck className="w-4 h-4" />
                      <span>Approvals</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveView("users")}
                      isActive={activeView === "users"}
                      data-testid="link-users"
                    >
                      <Users className="w-4 h-4" />
                      <span>Users</span>
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
                      onClick={() => setActiveView("wallet")}
                      isActive={activeView === "wallet"}
                      data-testid="link-wallet"
                    >
                      <Wallet className="w-4 h-4" />
                      <span>Wallet Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveView("settings")}
                      isActive={activeView === "settings"}
                      data-testid="link-settings"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
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
            <h1 className="text-2xl font-bold font-mono flex-1">TaskHub Admin</h1>
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
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-sky-500/5 to-cyan-500/5 pointer-events-none" />
            {activeView === "dashboard" && (
              <div className="max-w-7xl mx-auto space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    title="Pending Approvals"
                    value={stats.pendingApprovals}
                    icon={Clock}
                    gradient="orange"
                  />
                  <StatCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={Users}
                    trend="+45 this week"
                    trendUp={true}
                    gradient="cyan"
                  />
                  <StatCard
                    title="Total Earnings"
                    value={`$${stats.totalEarnings.toFixed(2)}`}
                    icon={DollarSign}
                    trend="+8.2% this month"
                    trendUp={true}
                    gradient="purple"
                  />
                  <StatCard
                    title="Withdrawal Requests"
                    value={stats.withdrawalRequests}
                    icon={CheckCircle}
                    gradient="green"
                  />
                </div>

                <GlassCard className="p-6" gradient>
                  <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                      <UserPlus className="w-5 h-5 text-green-500" />
                      <span className="text-sm">New user registered: <strong>alice_jones</strong></span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                      <span className="text-sm">Approved withdrawal for <strong>john_doe</strong></span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                      <DollarSign className="w-5 h-5 text-purple-500" />
                      <span className="text-sm">New deposit from <strong>jane_smith</strong></span>
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}

            {activeView === "approvals" && (
              <div className="max-w-7xl mx-auto">
                <Tabs defaultValue="all" className="space-y-6">
                  <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
                    <TabsTrigger value="deposits" data-testid="tab-deposits">Deposits</TabsTrigger>
                    <TabsTrigger value="withdrawals" data-testid="tab-withdrawals">Withdrawals</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {pendingApprovals.map((approval) => (
                        <ApprovalCard key={approval.id} {...approval} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="deposits" className="space-y-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {pendingApprovals
                        .filter((a) => a.type === "deposit")
                        .map((approval) => (
                          <ApprovalCard key={approval.id} {...approval} />
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="withdrawals" className="space-y-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {pendingApprovals
                        .filter((a) => a.type === "withdrawal")
                        .map((approval) => (
                          <ApprovalCard key={approval.id} {...approval} />
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {activeView === "users" && (
              <div className="max-w-7xl mx-auto">
                <GlassCard className="p-6" gradient>
                  <h2 className="text-xl font-semibold mb-4">User Management</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-white/10">
                        <tr>
                          <th className="text-left p-3 text-sm font-semibold">Username</th>
                          <th className="text-left p-3 text-sm font-semibold">Email</th>
                          <th className="text-left p-3 text-sm font-semibold">Plan</th>
                          <th className="text-left p-3 text-sm font-semibold">Earnings</th>
                          <th className="text-left p-3 text-sm font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b border-white/5 hover-elevate">
                            <td className="p-3">{user.username}</td>
                            <td className="p-3 text-muted-foreground">{user.email}</td>
                            <td className="p-3 font-semibold">{user.plan}</td>
                            <td className="p-3 font-mono">${user.earnings.toFixed(2)}</td>
                            <td className="p-3">
                              <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-500">
                                {user.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </GlassCard>
              </div>
            )}

            {activeView === "plans" && (
              <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold font-mono">Manage Plans</h2>
                  <GradientButton
                    variant="purple"
                    icon={Plus}
                    onClick={handleCreatePlan}
                    testId="button-create-plan"
                  >
                    Create New Plan
                  </GradientButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan, i) => (
                    <GlassCard key={i} className="p-6 relative" gradient>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold font-mono">{plan.name}</h3>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditPlan(plan)}
                            className="p-2 rounded-lg hover-elevate"
                            data-testid={`button-edit-${plan.name.toLowerCase()}`}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePlan(plan.name)}
                            className="p-2 rounded-lg hover-elevate text-red-500"
                            data-testid={`button-delete-${plan.name.toLowerCase()}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-3xl font-bold font-mono mb-2">{plan.price}</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {plan.userCount} active users
                      </p>
                      <ul className="space-y-2">
                        {plan.features.map((feature, j) => (
                          <li key={j} className="text-sm text-muted-foreground">• {feature}</li>
                        ))}
                      </ul>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {activeView === "wallet" && (
              <div className="max-w-4xl mx-auto">
                <WalletSettingsForm />
              </div>
            )}

            {activeView === "settings" && (
              <div className="max-w-3xl mx-auto">
                <GlassCard className="p-8" gradient>
                  <h2 className="text-2xl font-bold font-mono mb-6">System Settings</h2>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold mb-2">Platform Settings</h3>
                      <p className="text-sm text-muted-foreground">
                        Configure platform-wide settings and preferences
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold mb-2">Email Configuration</h3>
                      <p className="text-sm text-muted-foreground">
                        Set up email notifications and templates
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}
          </main>
        </div>
      </div>
      <EditPlanModal
        open={editPlanModalOpen}
        onClose={() => setEditPlanModalOpen(false)}
        plan={selectedPlan}
      />
    </SidebarProvider>
  );
}
