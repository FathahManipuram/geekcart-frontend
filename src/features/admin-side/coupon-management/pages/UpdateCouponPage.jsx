import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useCouponStore } from '../store/coupon.store';
import CouponForm from '../components/form/CouponForm';
import { Button } from '@/shared/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import Loader from '@/shared/components/Loader';
import { updateCouponSchema } from '../validations/coupon.validation';

const UpdateCouponPage = () => {
	const navigate= useNavigate()
	const {couponId} = useParams()

	const getCouponDetails= useCouponStore((state)=> state.getCouponDetails)
	const coupon= useCouponStore((state)=> state.coupon)
	const loading= useCouponStore((state)=> state.loading)
	const updateCoupon= useCouponStore((state)=> state.updateCoupon)
	useEffect(()=>{
		getCouponDetails(couponId)
	}, [])

	const handleUpdateCoupon= async(payload)=>{

		try{
			const res= await updateCoupon(couponId, payload)

			toast.success(res.message || "Coupon updated successfullly")
			navigate("/admin/coupons")
		} catch(err){
			toast.error(err?.response?.data?.message || "Updation failed")
		}
	}
	if(!coupon) return <Loader/>
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 items-start md:flex-row md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Update Coupon</h1>

          <p className="text-muted-foreground">
            Update  your coupon.
          </p>
        </div>

        <Button onClick={() => navigate(-1)} variant="outline">
          <ArrowLeft size={18} />
          Back
        </Button>
      </div>

      <CouponForm onSubmit={handleUpdateCoupon} defaultValues={coupon} loading={loading} validation={updateCouponSchema}/>
    </div>
  );
}

export default UpdateCouponPage
