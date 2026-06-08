"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function CommonBarChart({
  data,
  dataKey,
  xKey,
}) {
  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey={xKey} />

        <YAxis />

        <Tooltip />

        <Bar dataKey={dataKey} />
      </BarChart>
    </ResponsiveContainer>
  );
}