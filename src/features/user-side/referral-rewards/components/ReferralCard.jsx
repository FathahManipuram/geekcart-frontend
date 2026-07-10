import { Button } from "@/shared/components/ui/button";
import { Copy, Share2 } from "lucide-react";
import { toast } from "sonner";

const ReferralCard = ({ user }) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(user.referralCode);

    toast.success("Referral code copied");
  };

  const handleShare = async () => {
    const text = `
Join GeekCart using my referral code:

${user.referralCode}

and get rewards after your first order.
`;

    if (navigator.share) {
      await navigator.share({
        title: "GeekCart Referral",
        text,
      });
    } else {
      await navigator.clipboard.writeText(text);

      toast.success("Referral message copied");
    }
  };

  return (
    <div className="rounded-2xl border bg-white p-6">
      <h3 className="mb-5 text-lg font-semibold">Referral & Rewards</h3>

      <div className="space-y-5">
        <div>
          <p className="text-muted-foreground text-sm">Your Referral Code</p>

          <div className="mt-2 flex items-center justify-between rounded-lg border px-4 py-3">
            <span className="text-lg font-bold">{user.referralCode}</span>

            <div className="flex gap-2">
              <Button size="icon" variant="outline" onClick={handleCopy}>
                <Copy size={16} />
              </Button>

              <Button size="icon" variant="outline" onClick={handleShare}>
                <Share2 size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-4">
            <p className="text-muted-foreground text-sm">Referrals</p>

            <p className="text-2xl font-bold">{user.referralCount}</p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-muted-foreground text-sm">Earnings</p>

            <p className="text-2xl font-bold text-green-600">
              ₹{user.totalReferralEarnings}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralCard;
