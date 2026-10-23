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
        pointRadius: 3,
        pointHitRadius: 12,
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
        titleFont: { size: 12 },
        bodyFont: { size: 13, weight: "bold" },
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (context) => ` ₹${context.parsed.y.toLocaleString("en-IN")}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#737373",
          font: { size: 11 },
          maxRotation: 45,
          minRotation: 0,
        },
      },
      y: {
        border: { dash: [4, 4] },
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
    <div className="w-full overflow-hidden rounded-2xl border bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-neutral-900 sm:text-lg md:text-xl">
            Sales Trend
          </h3>
          <p className="mt-0.5 text-xs text-neutral-500 sm:text-sm">
            {TIMELINE_FILTERS.find((f) => f.value === activeFilter)?.label ||
              "Monthly"}{" "}
            sales revenue
          </p>
        </div>

        {/* Filter Toolbar: 2x2 grid on Mobile & Tablet (`grid-cols-2`), Horizontal flex on Desktop (`lg:flex`) */}
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-neutral-100 p-1 lg:flex lg:w-auto">
          {TIMELINE_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => onFilterChange?.(filter.value)}
              className={`cursor-pointer rounded-lg px-3 py-2 text-center text-xs font-semibold transition-all duration-200 lg:px-4 lg:py-2 lg:text-sm ${
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

      {/* Responsive Canvas Container */}
      <div className="mt-4 h-64 w-full sm:mt-6 sm:h-80 md:mt-8 md:h-[350px] lg:h-[400px]">
        <Line key={activeFilter} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SalesChart;
