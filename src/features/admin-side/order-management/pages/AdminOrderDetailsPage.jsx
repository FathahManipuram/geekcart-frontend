import React, { useEffect, useState } from 'react'
import { useAdminOrderStore } from '../store/adminOrder.store';
import { useParams } from 'react-router-dom';
import OrderHeader from '../components/details-page/OrderHeader';
import OrderItemsTable from '../components/details-page/OrderItemsTable';
import PaymentInfoCard from '../components/details-page/PaymentInfoCard';
import CustomerInfoCard from '../components/details-page/CustomerInfoCard';
import ShippingAddressCard from '../components/details-page/ShippingAddressCard';
import OrderSummaryCard from '../components/details-page/OrderSummaryCard';
import { toast } from 'sonner';
import Modal from '@/shared/components/Modal';
import UpdateItemStatusModal from '../components/edit-item-page/UpdateItemStatusModal';

const AdminOrderDetailsPage = () => {
	const {orderId}= useParams()
  const[showUpdateOrderItemModal, setShowupdateOrderItemModal]= useState(false)
  const [selectedItem, setSelectedItem]= useState(null)

	const order= useAdminOrderStore((state)=> state.order)
	const fetchOrderDetails= useAdminOrderStore((state)=> state.fetchOrderDetails)
  const updateOrderItemStatus = useAdminOrderStore((state) => state.updateOrderItemStatus);
  const loading= useAdminOrderStore((state)=> state.loading)

console.log("orderDetails: ", order)
	useEffect(()=>{
		fetchOrderDetails(orderId)
	},[orderId])

const handleEdit=(item)=>{
  console.log(" item check: ",item )
setSelectedItem(item)
setShowupdateOrderItemModal(true)
}


const handleOrderItemUpdate= async(payload)=>{
  console.log("payload: ", payload, orderId, selectedItem._id);
  try{
    const res= await updateOrderItemStatus(orderId, selectedItem._id, payload)
    await fetchOrderDetails(orderId)
    setShowupdateOrderItemModal(false)
    setSelectedItem(null)
    toast.success(res.message || "Order item status updated")
  }catch(err){
    toast.error(err.response?.data?.message || "Order item status updation failed")
  }
}

  return (
    <section className="max-w-7xl mx-auto p-6">
      <OrderHeader order={order} />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <OrderItemsTable items={order?.items} onEdit={handleEdit} />

          <PaymentInfoCard order={order} />
        </div>

        <div className="space-y-6">
          <CustomerInfoCard customer={order?.user} />

          <ShippingAddressCard address={order?.shippingAddress} />

          <OrderSummaryCard order={order} />
        </div>
      </div>
      <Modal
        open={showUpdateOrderItemModal}
        onOpenChange={(open) => {
          setShowupdateOrderItemModal(open);

          if (!open) {
            setSelectedItem(null);
          }
        }}
        title="Update Order Item Status"
      >
        <UpdateItemStatusModal
          item={selectedItem}
          loading={loading}
          onSubmit={handleOrderItemUpdate}
          onClose={() => {
            setShowupdateOrderItemModal(false);
            setSelectedItem(null);
          }}
        />
      </Modal>
    </section>
  );
}

export default AdminOrderDetailsPage;
