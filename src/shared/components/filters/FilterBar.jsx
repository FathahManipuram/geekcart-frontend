import React from 'react'

const FilterBar = ({
	children
}) => {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        rounded-xl
        border
        bg-white
        p-4
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
		{children}
	</div>
  );
}

export default FilterBar
