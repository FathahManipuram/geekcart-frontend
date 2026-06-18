import { useAuthStore } from "@/features/auth/store/auth.store";
import ReferralCodeCard from "../components/ReferralCodeCard";
import ReferralHowItWorks from "../components/ReferralHowItWorks";
import { useEffect } from "react";
import ReferralStatsCard from "../components/ReferralStatsCard";

const ReferralPage = () => {
	const fetchProfile = useAuthStore((state) => state.fetchProfile);
	const user= useAuthStore((state)=> state.user)

	useEffect(()=>{
		fetchProfile();
	},[])
  return (
    <div className="space-y-6 p-12">
      <div>
        <h1 className="text-3xl font-bold">Referral & Rewards</h1>

        <p className="text-muted-foreground">
          Invite friends and earn wallet rewards.
        </p>
      </div>

      <ReferralCodeCard user={user}/>

      <ReferralStatsCard user={user}/>

      <ReferralHowItWorks />
    </div>
  );
};

export default ReferralPage;
