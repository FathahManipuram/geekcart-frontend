const WalletSummaryCard = ({ wallet, transactions = [] }) => {
  const totalCredits = transactions
    .filter((item) => item.type === "CREDIT")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalDebits = transactions
    .filter((item) => item.type === "DEBIT")
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white border rounded-2xl p-6">
      <h3 className="font-semibold text-lg mb-6">Wallet Summary</h3>

      <div className="space-y-5">
        <div>
          <p className="text-muted-foreground text-sm">Total Credits</p>

          <p className="font-bold text-xl text-green-600">
            ₹{totalCredits.toFixed(2)}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground text-sm">Total Debits</p>

          <p className="font-bold text-xl text-red-500">
            ₹{totalDebits.toFixed(2)}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground text-sm">Current Balance</p>

          <p className="font-bold text-2xl">
            ₹{wallet?.balance?.toFixed(2) || "0.00"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletSummaryCard;
