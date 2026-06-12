import { ORDER_STATUSES } from "./orderStatus";

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUSES.PENDING]: "Pending",

  [ORDER_STATUSES.PLACED]: "Placed",

  [ORDER_STATUSES.PROCESSING]: "Processing",

  [ORDER_STATUSES.SHIPPED]: "Shipped",

  [ORDER_STATUSES.OUT_FOR_DELIVERY]: "Out For Delivery",

  [ORDER_STATUSES.DELIVERED]: "Delivered",

  [ORDER_STATUSES.CANCELLED]: "Cancelled",
};

export const ITEM_STATUS_LABELS = {
  PLACED: "Placed",

  PROCESSING: "Processing",

  SHIPPED: "Shipped",

  OUT_FOR_DELIVERY: "Out For Delivery",

  DELIVERED: "Delivered",

  CANCELLED: "Cancelled",
};