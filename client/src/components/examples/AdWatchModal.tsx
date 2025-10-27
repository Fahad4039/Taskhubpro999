import { useState } from 'react'
import AdWatchModal from '../AdWatchModal'
import GradientButton from '../GradientButton'
import { Play } from 'lucide-react'

export default function AdWatchModalExample() {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-8">
      <GradientButton
        variant="purple"
        icon={Play}
        onClick={() => setOpen(true)}
      >
        Open Ad Modal
      </GradientButton>
      <AdWatchModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
