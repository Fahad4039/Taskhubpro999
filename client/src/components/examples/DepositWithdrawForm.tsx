import DepositWithdrawForm from '../DepositWithdrawForm'

export default function DepositWithdrawFormExample() {
  return (
    <div className="p-8">
      <DepositWithdrawForm
        type="deposit"
        referralCount={3}
        onSubmit={(data) => console.log('Form submitted:', data)}
      />
    </div>
  )
}
