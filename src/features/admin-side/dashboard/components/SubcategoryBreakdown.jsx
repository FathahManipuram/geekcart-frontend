import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ["#8B5E34", "#A8793E", "#C9B39A", "#E5DDD5", "#D4AF37"];

const SubcategoryBreakdown = ({ data = [] }) => {
  const totalProducts = data.reduce((sum, item) => sum + item.count, 0);

  const chartData = {
    labels: data.map((item) => item.name),

    datasets: [
      {
        data: data.map((item) => item.count),

        backgroundColor: COLORS,

        borderWidth: 0,

        hoverOffset: 12,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    cutout: "72%",

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;

            const percentage = ((value / totalProducts) * 100).toFixed(1);

            return `${context.label}: ${value} Products (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold">Subcategory Breakdown</h3>

        <p className="mt-1 text-sm text-neutral-500">Products by subcategory</p>
      </div>

      {/* CHART */}
      <div className="relative mx-auto mt-6 h-80 w-full max-w-[320px]">
        <Doughnut data={chartData} options={options} />

        {/* CENTER */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <h2 className="text-4xl font-bold">{totalProducts}</h2>

          <p className="text-xs uppercase tracking-wider text-neutral-500">
            Products
          </p>
        </div>
      </div>

      {/* LEGEND */}
      <div className="mt-8 space-y-3">
        {data.map((item, index) => {

          return (
            <div key={item._id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />

                <span className="text-sm font-medium">{item.name}</span>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold">{String(item.count).padStart(2, "0")}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubcategoryBreakdown;
