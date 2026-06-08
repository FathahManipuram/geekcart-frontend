import { ORDER_STATUSES } from "./orderStatus";

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUSES.PENDING]: "Pending",

  [ORDER_STATUSES.PLACED]: "Placed",

  [ORDER_STATUSES.PROCESSING]: "Processing",

  [ORDER_STATUSES.SHIPPED]: "Shipped",

  [ORDER_STATUSES.OUT_FOR_DELIVERY]: "Out For Delivery",

  [ORDER_STATUSES.DELIVERED]: "Delivered",

  [ORDER_STATUSES.CANCELLED]: "Cancelled",

  [ORDER_STATUSES.RETURN_REQUESTED]: "Return Requested",

  [ORDER_STATUSES.RETURNED]: "Returned",
};
