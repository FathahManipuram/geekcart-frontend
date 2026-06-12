import { useEffect, useState } from "react";


import ReturnFilters from "../components/overview/ReturnFilters";

import ReturnManagementHeader from "../components/overview/ReturnManagementHeader";
import { useAdminReturnStore } from "../store/adminReturn.store";
import ReturnTable from "../components/overview/ReturnTable";
import Pagination from "@/shared/components/Pagination";
import Modal from "@/shared/components/Modal";
import { toast } from "sonner";
import UpdateReturnStatusModal from "../components/edit/UpdateReturnStatusModal";
import useDebounce from "@/shared/hooks/useDebounce";

const ReturnManagementPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [showStatusModal, setShowStatusModal]= useState(false)
  const [selcetedItem, setSelectedItem] = useState(null)
  const [page, setPage]= useState(1)

  const loading= useAdminReturnStore((state)=> state.loading)
  const returns= useAdminReturnStore((state)=> state.returns)
  const pagination= useAdminReturnStore((state)=> state.pagination)
  const fetchAllReturns= useAdminReturnStore((state)=> state.fetchAllReturns)
  const updateReturnRequestStatus = useAdminReturnStore((state) => state.updateReturnRequestStatus);
  const debouncedValue= useDebounce(search, 500)

 useEffect(() => {
   fetchAllReturns({
     page,
     limit: 5,
     status,
     search: debouncedValue,
   });
 }, [page, status, debouncedValue, fetchAllReturns]);

  console.log("return poage: ", returns)

  const handleSelectItem= (item)=>{
    console.log("selectedItem:", item)
    setSelectedItem(item)
    setShowStatusModal(true)
  }


  const handleUpdateStatus = async (payload) => {
    try {
      console.log("check: ", selcetedItem._id, payload);
      await updateReturnRequestStatus(selcetedItem._id, payload);

      await fetchAllReturns({
        page,
        limit: 5,
        status,
        search : debouncedValue,
      });

      setSelectedItem(null)
      setShowStatusModal(false);
      

      toast.success("Return status updated");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <ReturnManagementHeader />
      </div>


      <ReturnFilters
        search={search}
        onSearchChange={(value)=> {
          setSearch(value)
          setPage(1)
        }}
        status={status}
        onStatusChange={(value)=>{
          setStatus(value)
          setPage(1)
        }}
      />

      <ReturnTable returns={returns} loading={loading} onSelect={handleSelectItem}/>

      <Pagination currentPage={Number(pagination?.currentPage) || 1} totalPages={pagination?.totalPages || 1} onPageChange={setPage} />

      <Modal
        open={showStatusModal}
        onOpenChange={setShowStatusModal}
        title="Update Return Status"
      >
        <UpdateReturnStatusModal
          returnRequest={selcetedItem}
          loading={loading}
          onSubmit={handleUpdateStatus}
          onClose={() => {
            setSelectedItem(null);
            setShowStatusModal(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default ReturnManagementPage;
