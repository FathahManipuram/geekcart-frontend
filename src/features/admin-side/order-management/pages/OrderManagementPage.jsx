import { useEffect, useState } from "react";
import { useAdminOrderStore } from "../store/adminOrder.store";
import OrderTable from "../components/overview-page/OrderTable";
import { useNavigate } from "react-router-dom";
import OrderFilters from "../components/overview-page/OrderFilters";
import useDebounce from "@/shared/hooks/useDebounce";
import Pagination from "@/shared/components/Pagination";
import Loader from "@/shared/components/Loader";
import OrderStatsCard from "../components/overview-page/OrderStatsCard";
import Modal from "@/shared/components/Modal";
import UpdateOrderStatusModal from "../components/edit-page/UpdateOrderStatusModal";
import { toast } from "sonner";


const OrderManagementPage = () => {
const navigate= useNavigate()
const [search, setSearch] = useState("");
const [status, setStatus] = useState("ALL");
const [page, setPage]= useState(1)

const [showUpdateStatusModal, setShowUpdateStatusModal]= useState(false)
const [selectedOrder, setSelectedOrder] = useState(null);

const orders = useAdminOrderStore((state) => state.orders);

  const loading = useAdminOrderStore((state) => state.loading);
  const pagination = useAdminOrderStore((state)=> state.pagination)
  const orderStats= useAdminOrderStore((state)=> state.orderStats)
  const updateOrderStatus= useAdminOrderStore((state)=> state.updateOrderStatus)

  const fetchOrders = useAdminOrderStore((state) => state.fetchOrders);
console.log("orderpage: orders", orders)

const debouncedSearch= useDebounce(search, 500)

  useEffect(() => {
    fetchOrders({
      page,
      limit:5,
      status,
      search: debouncedSearch,
    });
  }, [status, debouncedSearch, page, fetchOrders]);

  
  const handleSearchChange=(value)=>{
setSearch(value)
setPage(1)
  }

  const handleStatusChange=(value)=>{
    setStatus(value)
    setPage(1)
  }

  const handleEdit= (order)=>{
    setSelectedOrder(order)
    setShowUpdateStatusModal(true)
  }

  const handleSubmitStatus= async(payload)=>{
    try{
      const res= await updateOrderStatus(selectedOrder._id, payload)
      console.log("updated: ", res)
      setShowUpdateStatusModal(false)
      toast.success(res.message || "Status updated")
    }catch(err){
      toast.error(err.response?.data?.message || "failed")
    }
  }

  if (loading) {
    return <Loader/>
  }

  return (
    <div className="space-y-5">
      <div>
        <OrderStatsCard orderStats={orderStats} />
      </div>

      <div>
        <OrderFilters
          search={search}
          setSearch={handleSearchChange}
          status={status}
          setStatus={handleStatusChange}
        />
      </div>
      <div>
        <OrderTable
          orders={orders}
          loading={loading}
          onView={(order) => navigate(`/admin/orders/${order._id}`)}
          onEdit={handleEdit}
        />
      </div>

      <Pagination
        currentPage={pagination?.currentPage || 1}
        totalPages={pagination?.totalPages || 1}
        onPageChange={setPage}
      />

      <Modal
        open={showUpdateStatusModal}
        onOpenChange={setShowUpdateStatusModal}
        title={`Order Actions - #${selectedOrder?.orderNumber}`}
        description="Update order status."
      >
        <UpdateOrderStatusModal
          order={selectedOrder}
          onSubmit={handleSubmitStatus}
          onClose={() => setShowUpdateStatusModal(false)}
        />
      </Modal>
    </div>
  );
};

export default OrderManagementPage;
