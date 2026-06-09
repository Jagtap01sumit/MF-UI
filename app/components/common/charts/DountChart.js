"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SectorDonutChart({ data, theme }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 h-full w-full">
      {/* Donut Chart */}
      <div className="w-full md:w-1/2 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                background: theme.card,
                border: `1px solid ${theme.border}`,
                borderRadius: "12px",
                color: theme.text.primary,
              }}
              formatter={(value, name, props) => [
                `${props.payload.percentage}%`,
                name,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="w-full md:w-1/2 flex flex-col gap-3">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: item.color,
                }}
              />

              <span
                className="truncate font-medium"
                style={{
                  color: theme.text.primary,
                }}
              >
                {item.name}
              </span>
            </div>

            <span
              className="font-semibold"
              style={{
                color: theme.text.secondary,
              }}
            >
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}