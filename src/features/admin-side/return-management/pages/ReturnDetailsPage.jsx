import React from 'react'

const ReturnDetailsPage = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <ReturnProductCard returnRequest={returnRequest} />
      </div>

      <ReturnCustomerCard returnRequest={returnRequest} />
      <ReturnActionsCard
        returnRequest={returnRequest}
        onApprove={handleApprove}
        onReject={handleReject}
        onMarkReceived={handleMarkReceived}
        onProcessRefund={handleProcessRefund}
        loading={loading}
      />
    </div>
  );
}

export default ReturnDetailsPage
