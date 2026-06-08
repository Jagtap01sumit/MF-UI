"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function CommonLineChart({
  data,
  xKey,
  dataKey,
}) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey={xKey} />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey={dataKey}
          strokeWidth={3}
          dot={{ r: 6 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}