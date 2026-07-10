import DataTable from "@/shared/components/DataTable";
import React from "react";
import { ProductTableColumns } from "./ProductTableColumns";

const ProductTable = ({ products, loading }) => {
  return (
    <DataTable
      columns={ProductTableColumns}
      data={products}
      loading={loading}
      emptyMessage="No products found"
    />
  );
};

export default ProductTable;
