import GradientButton from '../GradientButton'
import { Play, Save, Download, Upload } from 'lucide-react'

export default function GradientButtonExample() {
  return (
    <div className="p-8 space-y-4">
      <div className="flex flex-wrap gap-4">
        <GradientButton variant="purple" icon={Play}>
          Purple Button
        </GradientButton>
        <GradientButton variant="cyan" icon={Save}>
          Cyan Button
        </GradientButton>
        <GradientButton variant="green" icon={Download}>
          Green Button
        </GradientButton>
        <GradientButton variant="orange" icon={Upload}>
          Orange Button
        </GradientButton>
      </div>
    </div>
  )
}
