import ApprovalCard from '../ApprovalCard'

export default function ApprovalCardExample() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ApprovalCard
        id="1"
        username="john_doe"
        type="deposit"
        amount="$50.00"
        method="Easypaisa"
        accountNumber="03001234567"
        date="2 hours ago"
      />
      <ApprovalCard
        id="2"
        username="jane_smith"
        type="withdrawal"
        amount="$100.00"
        method="JazzCash"
        accountNumber="03129876543"
        date="5 hours ago"
      />
    </div>
  )
}
