import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

const UserGrowthChart = ({data=[]}) => {
   const chartData = {
     labels: data.map((item) => item.month),

     datasets: [
       {
         label: "Registered Users",

         data: data.map((item) => item.users),

         borderColor: "#8B5E34",

         backgroundColor: "rgba(139,94,52,0.12)",

         fill: true,

         tension: 0.4,
       },
     ],
   };

   const options = {
     responsive: true,

     maintainAspectRatio: false,

     plugins: {
       legend: {
         display: false,
       },
     },
   };

   return (
     <div className="rounded-3xl border bg-white p-6 shadow-sm">
       <h3 className="text-lg font-semibold">User Growth</h3>

       <p className="mt-1 text-sm text-neutral-500">Monthly registrations</p>

       <div className="mt-6 h-87.5">
         <Line data={chartData} options={options} />
       </div>
     </div>
   );
}

export default UserGrowthChart
