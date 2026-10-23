import React from "react";
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

const UserGrowthChart = ({ data = [] }) => {
  const chartData = {
    labels: data?.map((item) => item?.month || ""),
    datasets: [
      {
        label: "Registered Users",
        data: data?.map((item) => item?.users || 0),
        borderColor: "#948b89",
        backgroundColor: "rgba(254, 253, 251, 0.5)",
        fill: true,
        tension: 0.4,
        pointHoverBackgroundColor: "#4F46E5",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        pointRadius: 3, // Smaller points for mobile tap targets
        pointHitRadius: 10, // Easier touch accessibility
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        padding: 10,
        cornerRadius: 8,
        titleFontSize: 12,
        bodyFontSize: 12,
        callbacks: {
          label: (context) => ` Users: ${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#737373",
          font: { size: 10 }, // Slightly smaller font for mobile axis ticks
          maxRotation: 45, // Rotates labels on tight screens if necessary
          minRotation: 0,
        },
      },
      y: {
        border: { dash: [4, 4] },
        grid: { color: "#f5f5f5" },
        ticks: {
          color: "#737373",
          font: { size: 10 },
          callback: (value) => Number(value).toLocaleString(),
        },
      },
    },
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
      <div>
        <h3 className="text-base font-semibold tracking-tight text-neutral-900 sm:text-lg">
          User Growth
        </h3>
        <p className="mt-0.5 text-xs text-neutral-500 sm:text-sm">
          Monthly registration tracking
        </p>
      </div>

      {/* Dynamic responsive height adjusting across breakpoints */}
      <div className="mt-4 h-64 w-full sm:mt-6 sm:h-80 md:h-[350px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default UserGrowthChart;
