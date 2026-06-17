export const STATUS_STYLES = {
  RETURN_PENDING: "bg-yellow-100 text-yellow-700",

  RETURN_APPROVED: "bg-blue-100 text-blue-900",

  RETURN_REJECTED: "bg-red-100 text-red-700",
  ITEM_RECEIVED: "bg-yellow-100 text-primary-700",

  RETURN_COMPLETED: "bg-green-100 text-green-700",
};

export const RETURN_FILTERS = [
  {
    label: "All Requests",
    value: "ALL",
  },
  {
    label: "Pending",
    value: "RETURN_PENDING",
  },
  {
    label: "Approved",
    value: "RETURN_APPROVED",
  },
  {
    label: "Rejected",
    value: "RETURN_REJECTED",
  },
  {
    label: "Completed",
    value: "RETURN_COMPLETED",
  },
];

export const RETURN_PROGRESS_STEPS = [
  {
    key: "RETURN_PENDING",
    label: "Requested",
  },
  {
    key: "RETURN_APPROVED",
    label: "Approved",
  },
  {
    key: "ITEM_RECEIVED",
    label: "Received",
  },
  {
    key: "RETURN_COMPLETED",
    label: "Refunded",
  },
];

export const RETURN_REQUEST_STATUSES = {
  RETURN_PENDING: "RETURN_PENDING",
  RETURN_APPROVED: "RETURN_APPROVED",
  RETURN_REJECTED: "RETURN_REJECTED",
  ITEM_RECEIVED: "ITEM_RECEIVED",
  RETURN_COMPLETED: "RETURN_COMPLETED",
};