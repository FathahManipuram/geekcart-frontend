import DataTable from '@/shared/components/DataTable';
import React from 'react'
import { variantDetailsColumns } from './VariantDetailsColumns';

const VariantDetailsTable = ({
	variants=[]
}) => {
console.log(variants)
  return (
    <div className="space-y-4">
      <h3
        className="
          text-xs
          font-bold
          tracking-[0.3em]
          text-muted-foreground
		  mt-8
        "
      >
        INVENTORY MATRIX
      </h3>

      <DataTable
        columns={variantDetailsColumns}
        data={variants}
        emptyMessage= "No inventory available"
      />
    </div>
  );
}

export default VariantDetailsTable
