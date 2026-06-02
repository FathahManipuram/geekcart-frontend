import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
const SubcategoryBreakdown = ({data}) => {
  const COLORS = ["#8B5E34", "#A8793E", "#B9B2AC", "#D8D3CE"];

  const total = data.reduce((sum, item) => sum + item.count, 0);


  return (
    <div className="mt-6 h-64">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="count" innerRadius={70} outerRadius={95}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SubcategoryBreakdown
