"use client";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Jan",
    attendance: 92,
    tests: 15,
    performance: 78,
  },
  {
    name: "Feb",
    attendance: 88,
    tests: 12,
    performance: 82,
  },
  {
    name: "Mar",
    attendance: 95,
    tests: 18,
    performance: 85,
  },
  {
    name: "Apr",
    attendance: 91,
    tests: 14,
    performance: 88,
  },
  {
    name: "May",
    attendance: 89,
    tests: 16,
    performance: 90,
  },
  {
    name: "Jun",
    attendance: 94,
    tests: 20,
    performance: 85,
  },
  {
    name: "Jul",
    attendance: 92,
    tests: 15,
    performance: 87,
  },
  {
    name: "Aug",
    attendance: 93,
    tests: 17,
    performance: 86,
  },
  {
    name: "Sep",
    attendance: 90,
    tests: 19,
    performance: 84,
  },
  {
    name: "Oct",
    attendance: 91,
    tests: 16,
    performance: 88,
  },
  {
    name: "Nov",
    attendance: 94,
    tests: 18,
    performance: 89,
  },
  {
    name: "Dec",
    attendance: 93,
    tests: 22,
    performance: 90,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}${value > 30 ? "%" : ""}`}
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="attendance"
          fill="#22c55e"
          radius={[4, 4, 0, 0]}
          name="Attendance %"
        />
        <Bar
          dataKey="tests"
          fill="#3b82f6"
          radius={[4, 4, 0, 0]}
          name="Tests Conducted"
        />
        <Bar
          dataKey="performance"
          fill="#f97316"
          radius={[4, 4, 0, 0]}
          name="Performance %"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
