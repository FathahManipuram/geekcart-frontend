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
        backgroundColor: "#fefdfb",
        fill: true,
        tension: 0.4,
        pointHoverBackgroundColor: "#4F46E5",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)", // Dark slate wrapper layout
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => ` Users: ${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false }, // Removes vertical lines to prevent clutter
        ticks: { color: "#737373", font: { size: 11 } },
      },
      y: {
        border: { dash: [4, 4] }, // Clean dashed guideline indicators
        grid: { color: "#f5f5f5" },
        ticks: {
          color: "#737373",
          font: { size: 11 },
          callback: (value) => Number(value).toLocaleString(), // Format numbers with commas
        },
      },
    },
  };

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div>
        <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
          User Growth
        </h3>
        <p className="mt-0.5 text-sm text-neutral-500">
          Monthly registration tracking
        </p>
      </div>

      {/* FIX: Swapped out invalid height layout token for explicit standard sizing */}
      <div className="mt-6 h-[350px] w-full">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default UserGrowthChart;
