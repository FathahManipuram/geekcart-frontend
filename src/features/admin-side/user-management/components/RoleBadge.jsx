import React from 'react'

const RoleBadge = ({role}) => {
	const isAdmin= role=== "admin"
   return (
     <span
       className={`
        px-4
        py-1
        rounded-full
        text-xs
        font-bold
        uppercase
        tracking-wide

        ${isAdmin ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}
      `}
     >
       {role}
     </span>
   );
}

export default RoleBadge
