"use client";

import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MonthlyTrendChart({ data, theme }) {
  console.log(data);
  const series = [
    {
      name: "Portfolio Value",
      data: data,
    },
  ];

  const options = {
    chart: {
      type: "area",
      toolbar: {
        show: true,
      },
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      background: "transparent",
    },

    stroke: {
      curve: "smooth",
      width: 3,
      colors: [theme.primary],
    },

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },

    grid: {
      borderColor: theme.chartGrid,
      strokeDashArray: 3,
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.chartAxis,
          fontSize: "12px",
        },
        formatter: (val) => `₹${(val/100).toLocaleString()} Cr`,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: theme.chartAxis,
        },
      },
      axisBorder: {
        color: theme.chartAxis,
      },
      axisTicks: {
        color: theme.chartAxis,
      },
    },

    xaxis: {
      type: "datetime",
      labels: {
        format: "MMM yy",
        style: {
          colors: theme.chartAxis,
        },
      },
    },

    tooltip: {
      theme: theme.mode === "dark" ? "dark" : "light",
      y: {
        formatter: (val) => `₹${(val/100).toLocaleString()} Cr.`,
      },
    },

    dataLabels: {
      enabled: false,
    },

    markers: {
      size: 4,
      colors: [theme.primary],
      strokeWidth: 0,
    },

    colors: [theme.primary],

    legend: {
      show: false,
    },
  };

  return (
    <div className="w-full h-full">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height="100%"
      />
    </div>
  );
}
