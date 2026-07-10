import React, { useEffect } from "react";
import { useAdminReturnStore } from "../store/adminReturn.store";
import { useParams } from "react-router-dom";
import ReturnProductCard from "../components/details/ReturnProductCard";
import ReturnDetailsHeader from "../components/details/ReturnDetailsHeader";
import ReturnCustomerCard from "../components/details/ReturnCustomerCard";

const ReturnDetailsPage = () => {
  const { returnId } = useParams();

  const getReturnRequestDetails = useAdminReturnStore(
    (state) => state.getReturnRequestDetails,
  );
  const returnDetails = useAdminReturnStore((state) => state.returnDetails);

  useEffect(() => {
    getReturnRequestDetails(returnId);
  }, [returnId]);

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <ReturnDetailsHeader returnRequest={returnDetails} />
        <ReturnProductCard returnRequest={returnDetails} />
      </div>

      <ReturnCustomerCard returnRequest={returnDetails} />
    </div>
  );
};

export default ReturnDetailsPage;
