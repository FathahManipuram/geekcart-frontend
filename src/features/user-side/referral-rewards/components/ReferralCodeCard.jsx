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
    <div className="rounded-2xl border bg-white p-6">
      <p className="text-muted-foreground text-sm">Your Referral Code</p>

      <div className="mt-3 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight sm:tracking-wider md:text-2xl">
          {user?.referralCode}
        </h2>

        <div className="flex gap-2">
          <Button
            className="cursor-pointer"
            variant="outline"
            size="icon"
            onClick={handleCopy}
          >
            <Copy size={18} />
          </Button>

          <Button
            className="cursor-pointer"
            variant="outline"
            size="icon"
            onClick={handleShare}
          >
            <Share2 size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReferralCodeCard;
