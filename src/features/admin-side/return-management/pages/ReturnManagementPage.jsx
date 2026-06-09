import { useEffect, useState } from "react";


import ReturnFilters from "../components/overview/ReturnFilters";

import ReturnManagementHeader from "../components/overview/ReturnManagementHeader";
import { useAdminReturnStore } from "../store/adminReturn.store";
import ReturnTable from "../components/overview/ReturnTable";

const ReturnManagementPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const loading= useAdminReturnStore((state)=> state.loading)
  const returns= useAdminReturnStore((state)=> state.returns)
  const fetchAllReturns= useAdminReturnStore((state)=> state.fetchAllReturns)


  useEffect(()=>{
	fetchAllReturns()
  },[])

  console.log("return poage: ", returns)

  return (
    <div className="space-y-6">
      <div>
       <ReturnManagementHeader/>
      </div>

      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ReturnStatsCard title="Pending" value={0} />

        <ReturnStatsCard title="Approved" value={0} />

        <ReturnStatsCard title="Rejected" value={0} />

        <ReturnStatsCard title="Completed" value={0} />
      </div> */}

      <ReturnFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      <ReturnTable
	  returns={returns}
	  loading={loading}
      />

      {/* <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} /> */}
    </div>
  );
};

export default ReturnManagementPage;
