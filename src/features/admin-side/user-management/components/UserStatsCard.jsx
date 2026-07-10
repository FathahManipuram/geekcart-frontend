import StatsCard from "@/shared/components/StatsCard";
import React from "react";
import { TrendingUp, ShieldCheck, Activity, ShieldAlert } from "lucide-react";

const UserStatsCard = ({
  totalUsers = 0,
  activeUsers = 0,
  totalAdmins = 0,
  blockedUsers = 0,
}) => {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      <StatsCard title="Users" value={totalUsers} icon={TrendingUp} />

      <StatsCard title="Active Users" value={activeUsers} icon={Activity} />

      <StatsCard
        title="Blocked Users"
        value={blockedUsers}
        icon={ShieldAlert}
      />

      <StatsCard title="Admins" value={totalAdmins} icon={ShieldCheck} />
    </div>
  );
};

export default UserStatsCard;
