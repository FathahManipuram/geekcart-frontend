const ReferralStatsCard = ({ user }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border bg-white p-6">
        <p className="text-muted-foreground">Successful Referrals</p>

        <h3 className="mt-2 text-4xl font-bold">{user?.referralCount}</h3>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <p className="text-muted-foreground">Total Earnings</p>

        <h3 className="mt-2 text-4xl font-bold text-green-600">
          ₹{user?.totalReferralEarnings}
        </h3>
      </div>
    </div>
  );
};

export default ReferralStatsCard;
