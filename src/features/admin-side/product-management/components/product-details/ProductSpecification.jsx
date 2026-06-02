import React from 'react'

const ProductSpecification = ({product}) => {

   const specifications = [
     {
       label: "PRIMARY CATEGORY",

       value: product?.category?.name,
     },

     {
       label: "SUBCATEGORY",

       value: product?.subcategory?.name,
     },

     {
       label: "FABRIC COMPOSITION",

       value: product?.fabric,
     },

     {
       label: "SLEEVE TYPE",

       value: product?.sleeve,
     },
   ];
   return (
     <div
       className="
        rounded-xl
        border
        bg-white
        p-8
      "
     >
       {/* Title */}
       <h3
         className="
          text-xs
          font-bold
          tracking-[0.3em]
          text-muted-foreground
        "
       >
         SPECIFICATIONS
       </h3>

       {/* Specification List */}
       <div className="mt-8 space-y-5">
         {specifications.map((item) => (
           <div key={item.label}>
             <p
               className="
                  text-xs
                  font-bold
                  tracking-[0.2em]
                  text-muted-foreground
                "
             >
               {item.label}
             </p>

             <h4
               className="
                  mt-3
                  text-xl
                  font-bold
                  tracking-tight
                "
             >
               {item.value}
             </h4>
           </div>
         ))}
       </div>
     </div>
   );
}

export default ProductSpecification
