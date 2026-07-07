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

const TIMELINE_FILTERS = [
  { label: "Today", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

const SalesChart = ({
  data = [],
  activeFilter = "monthly",
  onFilterChange,
}) => {
  const chartData = {
    // Maps seamlessly with standard layout label keys
    labels: data?.map((item) => item?.label || item?.month || ""),
    datasets: [
      {
        label: "Sales",
        data: data?.map((item) => item?.sales || item?.totalSales || 0),
        borderColor: "#8B5E34",
        backgroundColor: "rgba(139,94,52,0.12)",
        fill: true,
        tension: 0.4,
        pointHoverBackgroundColor: "#8B5E34",
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
        backgroundColor: "rgba(17, 24, 39, 0.9)", // Dark slate layout for clean readability
        titleFont: { size: 12 },
        bodyFont: { size: 13, weight: "bold" },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => ` ₹${context.parsed.y.toLocaleString("en-IN")}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false }, // Removes vertical grid line clutter
        ticks: { color: "#737373", font: { size: 11 } },
      },
      y: {
        border: { dash: [4, 4] }, // Clean dashed horizontal tracking guides
        grid: { color: "#f5f5f5" },
        ticks: {
          color: "#737373",
          font: { size: 11 },
          callback: (value) => `₹${Number(value).toLocaleString("en-IN")}`,
        },
      },
    },
  };

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      {/* Header with Integrated Filter controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
            Sales Trend
          </h3>
          <p className="mt-0.5 text-sm text-neutral-500">
            {TIMELINE_FILTERS.find((f) => f.value === activeFilter)?.label ||
              "Monthly"}{" "}
            sales revenue
          </p>
        </div>


        <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl self-start sm:self-center">
          {TIMELINE_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => onFilterChange?.(filter.value)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                activeFilter === filter.value
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* FIX: Passing activeFilter as a key explicitly forces canvas re-instantiation */}
      <div className="mt-6 h-[350px] w-full">
        <Line key={activeFilter} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SalesChart;
