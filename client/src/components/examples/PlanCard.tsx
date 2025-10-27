import PlanCard from '../PlanCard'

export default function PlanCardExample() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <PlanCard
        name="Basic"
        price="$9.99"
        duration="month"
        features={["Watch 50 ads per day", "$0.10 per ad", "Basic support", "1 referral link"]}
        userCount={142}
        onSelect={() => console.log('Basic selected')}
      />
      <PlanCard
        name="Premium"
        price="$19.99"
        duration="month"
        features={["Watch 150 ads per day", "$0.15 per ad", "Priority support", "3 referral links", "Bonus rewards"]}
        popular={true}
        userCount={387}
        onSelect={() => console.log('Premium selected')}
      />
      <PlanCard
        name="Enterprise"
        price="$49.99"
        duration="month"
        features={["Unlimited ads per day", "$0.20 per ad", "24/7 support", "Unlimited referrals", "Premium rewards", "Custom dashboard"]}
        userCount={56}
        onSelect={() => console.log('Enterprise selected')}
      />
    </div>
  )
}
