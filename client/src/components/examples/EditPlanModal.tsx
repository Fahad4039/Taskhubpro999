import { useState } from 'react'
import EditPlanModal from '../EditPlanModal'
import GradientButton from '../GradientButton'
import { Plus } from 'lucide-react'

export default function EditPlanModalExample() {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-8">
      <GradientButton
        variant="purple"
        icon={Plus}
        onClick={() => setOpen(true)}
      >
        Create New Plan
      </GradientButton>
      <EditPlanModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  )
}
