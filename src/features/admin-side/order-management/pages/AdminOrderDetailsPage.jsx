import React, { useEffect } from 'react'
import { useAdminOrderStore } from '../store/adminOrder.store';
import { useParams } from 'react-router-dom';
import OrderHeader from '../components/details-page/OrderHeader';
import OrderItemsTable from '../components/details-page/OrderItemsTable';
import PaymentInfoCard from '../components/details-page/PaymentInfoCard';
import CustomerInfoCard from '../components/details-page/CustomerInfoCard';
import ShippingAddressCard from '../components/details-page/ShippingAddressCard';
import OrderSummaryCard from '../components/details-page/OrderSummaryCard';

const AdminOrderDetailsPage = () => {
	const {orderId}= useParams()

	const order= useAdminOrderStore((state)=> state.order)
	const fetchOrderDetails= useAdminOrderStore((state)=> state.fetchOrderDetails)

console.log("orderDetails: ", order)
	useEffect(()=>{
		fetchOrderDetails(orderId)
	},[orderId])


  return (
    <section className="max-w-7xl mx-auto p-6">
      <OrderHeader order={order} />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <OrderItemsTable items={order?.items} />

          <PaymentInfoCard order={order} />
        </div>

        <div className="space-y-6">
          <CustomerInfoCard customer={order?.user} />

          <ShippingAddressCard address={order?.shippingAddress} />

          <OrderSummaryCard order={order} />
        </div>
      </div>
    </section>
  );
}

export default AdminOrderDetailsPage;
