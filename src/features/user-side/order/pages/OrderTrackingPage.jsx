import { useParams } from "react-router-dom";
import PackageDetailsCard from "../components/tracking-components/PackageDetailsCard";
import ShippingInfoCard from "../components/tracking-components/ShippingInfoCard";
import SupportCard from "../components/tracking-components/SupportCard";
import TrackingHeader from "../components/tracking-components/TrackingHeader";
import TrackingTimeline from "../components/tracking-components/TrackingTimeline";
import { useOrderStore } from "../store/order.store";
import { useEffect } from "react";


const OrderTrackingPage = () => {
	const {orderId}=useParams()
	const order= useOrderStore((state)=> state.order)
	const fetchOrderById= useOrderStore((state)=>state.fetchOrderById)

	useEffect(()=>{
		if(orderId){
			fetchOrderById(orderId);
		}
	},[orderId, fetchOrderById])

	console.log("trackingpage", order)
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <TrackingHeader order={order} />

      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <TrackingTimeline order={order} />
        </div>

        <div className="space-y-6">
          {order?.items?.map((item) => (
            <PackageDetailsCard key={item?._id} item={item}/>
          ))}
          <ShippingInfoCard address={order?.shippingAddress} deliveryMethod={order?.deliveryMethod}/>
          <SupportCard orderNumber={order?.orderNumber}/>
        </div>
      </div>
    </section>
  );
};

export default OrderTrackingPage;
