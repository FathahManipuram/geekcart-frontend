import ItemStatusBadge from "@/features/user-side/order/components/order-history/ItemStatusBadge";
import DataTable from "@/shared/components/DataTable";
import { Button } from "@/shared/components/ui/button";
import { Pencil } from "lucide-react";

const OrderItemsTable = ({ items = [], onEdit}) => {

  const columns = [
    {
      header: "Product",
      cell: (item) => (
        <div className="flex gap-3">
          <img src={item.image} alt={item.name} className="w-12 h-12 rounded" />

          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-muted-foreground">
              {item.color} / {item.size}
            </p>
          </div>
        </div>
      ),
    },

    {
      header: "Qty",
      accessor: "quantity",
    },

    {
      header: "Status",
      cell: (item) => <ItemStatusBadge status={item.itemStatus} />,
    },
    {
      header: "Unit Price",
      cell: (item) => (
        <div className="text-center">₹{item.salePrice ?? item.price}</div>
      ),
    },

    {
      header: "Subtotal",
      cell: (item) => (
        <div className="text-center font-medium">
          ₹{(item.salePrice ?? item.price) * item.quantity}
        </div>
      ),
    },

    {
      header: "Actions",
      cell: (item) => {
        const isEditable = !["DELIVERED", "CANCELLED"].includes(
          item.itemStatus,
        );
        return (
          <Button
            disabled={!isEditable}
            onClick={()=> onEdit(item)}
            variant="outline"
            size="sm"
          >
            <Pencil size={16} />
          </Button>
        );
      }
    },
  ];




  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey="_id"
      emptyMessage="No items found"
    />
  );
};

export default OrderItemsTable;
