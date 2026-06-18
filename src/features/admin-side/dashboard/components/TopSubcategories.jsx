import React from 'react'

const TopSubcategories = ({data=[]}) => {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Best Selling Subcategories</h3>

      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={item._id} className="flex justify-between">
            <span>
              #{index + 1} {item.name}
            </span>

            <span className="font-semibold">{item.totalSold}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopSubcategories
