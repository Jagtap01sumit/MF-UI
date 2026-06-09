"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function MonthlyTrendChart({ data, theme }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.chartGrid} />

        <XAxis dataKey="month" stroke={theme.chartAxis} />
        <YAxis stroke={theme.chartAxis} />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="value"
          stroke={theme.primary}
          strokeWidth={3}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}