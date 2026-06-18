const ReferralStatsCard = ({ user }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-white border rounded-2xl p-6">
        <p className="text-muted-foreground">Successful Referrals</p>

        <h3 className="text-4xl font-bold mt-2">{user?.referralCount}</h3>
      </div>

      <div className="bg-white border rounded-2xl p-6">
        <p className="text-muted-foreground">Total Earnings</p>

        <h3 className="text-4xl font-bold mt-2 text-green-600">
          ₹{user?.totalReferralEarnings}
        </h3>
      </div>
    </div>
  );
};

export default ReferralStatsCard;
