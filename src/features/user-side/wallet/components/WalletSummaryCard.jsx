const WalletSummaryCard = ({ wallet, transactions = [] }) => {
  const totalCredits = transactions
    .filter((item) => item.type === "CREDIT")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalDebits = transactions
    .filter((item) => item.type === "DEBIT")
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="rounded-2xl border bg-white p-6">
      <h3 className="mb-6 text-lg font-semibold">Wallet Summary</h3>

      <div className="space-y-5">
        <div>
          <p className="text-muted-foreground text-sm">Total Credits</p>

          <p className="text-xl font-bold text-green-600">
            ₹{totalCredits.toFixed(2)}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground text-sm">Total Debits</p>

          <p className="text-xl font-bold text-red-500">
            ₹{totalDebits.toFixed(2)}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground text-sm">Current Balance</p>

          <p className="text-2xl font-bold">
            ₹{wallet?.balance?.toFixed(2) || "0.00"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletSummaryCard;
