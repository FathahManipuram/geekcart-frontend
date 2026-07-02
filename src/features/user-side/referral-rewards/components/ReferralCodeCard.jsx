import { Button } from "@/shared/components/ui/button";
import { Copy, Share2 } from "lucide-react";
import { toast } from "sonner";

const ReferralCodeCard = ({ user }) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(user?.referralCode);

    toast.success("Referral code copied");
  };

  const handleShare = async () => {
    const text = `Join GeekCart using my referral code: ${user?.referralCode} Get rewards after your first order.`;

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
    <div className="bg-white border rounded-2xl p-6">
      <p className="text-sm text-muted-foreground">Your Referral Code</p>

      <div className="flex items-center justify-between mt-3">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight sm:tracking-wider">
          {user?.referralCode}
        </h2>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handleCopy}>
            <Copy size={18} />
          </Button>

          <Button variant="outline" size="icon" onClick={handleShare}>
            <Share2 size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReferralCodeCard;
