import Header from "@/shared/components/Header";
import React from "react";

const DashboardHeader = () => {
  return (
    <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <Header title="Admin Dashboard" />
    </div>
  );
};

export default DashboardHeader;
