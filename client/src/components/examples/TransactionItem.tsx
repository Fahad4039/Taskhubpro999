import TransactionItem from '../TransactionItem'

export default function TransactionItemExample() {
  return (
    <div className="p-8 space-y-3 max-w-2xl">
      <TransactionItem
        type="deposit"
        amount="$50.00"
        status="approved"
        date="2 hours ago"
        method="Easypaisa"
      />
      <TransactionItem
        type="withdrawal"
        amount="$100.00"
        status="pending"
        date="1 day ago"
        method="JazzCash"
      />
      <TransactionItem
        type="earning"
        amount="$5.50"
        status="approved"
        date="3 hours ago"
      />
      <TransactionItem
        type="deposit"
        amount="$25.00"
        status="rejected"
        date="5 days ago"
        method="Easypaisa"
      />
    </div>
  )
}
