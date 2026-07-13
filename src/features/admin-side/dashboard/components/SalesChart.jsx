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
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => ` ₹${context.parsed.y.toLocaleString("en-IN")}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#737373", font: { size: 11 } },
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
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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

        <div className="flex items-center gap-1 self-start rounded-xl bg-neutral-100 p-1 sm:self-center">
          {TIMELINE_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => onFilterChange?.(filter.value)}
              className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
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

      <div className="mt-6 h-87.5 w-full">
        <Line key={activeFilter} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SalesChart;
