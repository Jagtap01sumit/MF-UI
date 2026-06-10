"use client";

import React from "react";
import DataTableCard from "@/app/components/common/Table";
import useFundStore from "@/app/store/useFundStore";
import { FIELDS } from "@/app/CONSTANTS/Fields";

export default function TablesSection() {
  const {
    topHoldings,
    topIncreases,
    topReductions,
  } = useFundStore();

  const holdingsData = topHoldings.map((item) => ({
    stock_name: item[FIELDS.STOCK_NAME],
    quantity: Number(item.quantity).toLocaleString(),
    market_value: `${Math.round(
      Number(item[FIELDS.MARKET_VALUE]) / 100
    )} Cr`,
  }));

  const increasesData = topIncreases.map((item) => ({
    stock_name: item[FIELDS.STOCK_NAME],
    change_quantity: `+${Number(
      item.quantity_change
    ).toLocaleString()}`,
  }));

  const reductionsData = topReductions.map((item) => ({
    stock_name: item[FIELDS.STOCK_NAME],
    change_quantity: Number(
      item.quantity_change
    ).toLocaleString(),
  }));

  const TOP_HOLDINGS_COLUMNS = [
    {
      key: "stock_name",
      label: "Stock",
    },
    {
      key: "quantity",
      label: "Qty",
    },
    {
      key: "market_value",
      label: "Value",
    },
  ];

  const TOP_INCREASE_COLUMNS = [
    {
      key: "stock_name",
      label: "Stock",
    },
    {
      key: "change_quantity",
      label: "Added",
    },
  ];

  const TOP_REDUCTION_COLUMNS = [
    {
      key: "stock_name",
      label: "Stock",
    },
    {
      key: "change_quantity",
      label: "Reduced",
    },
  ];

  const cards = [
    {
      title: "Top Holdings",
      data: holdingsData,
      columns: TOP_HOLDINGS_COLUMNS,
    },
    {
      title: "Top Increases",
      data: increasesData,
      columns: TOP_INCREASE_COLUMNS,
    },
    {
      title: "Top Reductions",
      data: reductionsData,
      columns: TOP_REDUCTION_COLUMNS,
    },
  ].filter((card) => card.data.length > 0);

  if (cards.length === 0) {
    return null;
  }

  return (
    <div
      className={`grid gap-5 mt-6 ${
        cards.length === 1
          ? "grid-cols-1"
          : cards.length === 2
          ? "grid-cols-1 lg:grid-cols-2"
          : "grid-cols-1 lg:grid-cols-3"
      } items-stretch`}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          className="h-full"
        >
          <DataTableCard
            title={card.title}
            columns={card.columns}
            data={card.data}
            onViewMore={() =>
              console.log(card.title)
            }
          />
        </div>
      ))}
    </div>
  );
}