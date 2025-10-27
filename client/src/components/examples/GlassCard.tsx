import GlassCard from '../GlassCard'

export default function GlassCardExample() {
  return (
    <div className="p-8 space-y-4">
      <GlassCard className="p-6">
        <h3 className="font-bold mb-2">Regular Glass Card</h3>
        <p className="text-muted-foreground">This is a standard glass card with subtle transparency.</p>
      </GlassCard>
      
      <GlassCard className="p-6" gradient>
        <h3 className="font-bold mb-2">Gradient Glass Card</h3>
        <p className="text-muted-foreground">This card has enhanced glassmorphic effects.</p>
      </GlassCard>
    </div>
  )
}
