import {
  Bar,
  BarChart,
  BarShapeProps,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ICategoryData } from "../types";

interface Props {
  data: ICategoryData[];
}
const colors = [
  "#6366f1",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#3b82f6",
  "#8b5cf6",
];

const CustomBar = (props: BarShapeProps) => {
  const { x, y, width, height, index } = props;

  const color = colors[index % colors.length];

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={color}
      rx={4}
      ry={4}
    />
  );
};

const SpendingChart = ({ data }: Props) => {
  if (data.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm mb-6">
      <p className="text-sm font-medium text-gray-700 mb-4">
        Spending by category
      </p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
        >
          <XAxis
            dataKey="_id"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => {
              if (value == null) return ["", ""];
              return [`₱${value.toLocaleString()}`, "Amount"];
            }}
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid #f3f4f6",
            }}
          />
          <Bar dataKey="total" fill="#8884d8" shape={CustomBar} activeBar />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;
