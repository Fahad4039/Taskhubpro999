import StatCard from '../StatCard'
import { DollarSign, Users, TrendingUp, Award } from 'lucide-react'

export default function StatCardExample() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Earnings"
        value="$1,234.56"
        icon={DollarSign}
        trend="+12.5% this month"
        trendUp={true}
        gradient="purple"
      />
      <StatCard
        title="Referrals"
        value={5}
        icon={Users}
        trend="+2 this week"
        trendUp={true}
        gradient="cyan"
      />
      <StatCard
        title="Ads Watched"
        value={328}
        icon={TrendingUp}
        trend="+23 today"
        trendUp={true}
        gradient="green"
      />
      <StatCard
        title="Current Plan"
        value="Premium"
        icon={Award}
        gradient="orange"
      />
    </div>
  )
}
