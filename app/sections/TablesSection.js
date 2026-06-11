"use client";

import React from "react";
import DataTableCard from "@/app/components/common/Table";
import useFundStore from "@/app/store/useFundStore";
import { FIELDS } from "@/app/CONSTANTS/Fields";

export default function TablesSection() {
  const { topHoldings, topIncreases, topReductions, newEntries, exits } =
    useFundStore();
  console.log(topIncreases);
  const holdingsData = topHoldings.map((item) => ({
    stock_name: item[FIELDS.STOCK_NAME],
    quantity: Number(item[FIELDS.QUANTITY]).toLocaleString(),
    market_value: `${Math.round(Number(item[FIELDS.MARKET_VALUE]) / 100)} Cr`,
  }));
  const exitsData = exits.map((item) => ({
    stock_name: item[FIELDS.STOCK_NAME],
    quantity: Number(item[FIELDS.QUANTITY_EXITED]).toLocaleString(),
    market_value: `${Math.round(Number(item[FIELDS.MARKET_VALUE]) / 100)} Cr`,
  }));

  const increasesData = topIncreases.map((item) => ({
    stock_name: item[FIELDS.STOCK_NAME],
    change_quantity: `+${Number(item.quantity_change).toLocaleString()}`,
  }));
  const newEntriesData = newEntries.map((item) => ({
    stock_name: item[FIELDS.STOCK_NAME],
    quantity: Number(item[FIELDS.QUANTITY]).toLocaleString(),
    market_value: `${Math.round(Number(item[FIELDS.MARKET_VALUE]) / 100)} Cr`,
  }));
  const reductionsData = topReductions.map((item) => ({
    stock_name: item[FIELDS.STOCK_NAME],
    change_quantity: Number(item.quantity_change).toLocaleString(),
  }));
  const TOP_INCREASE_COLUMNS = [
    {
      key: "stock_name",
      label: "Stock",
    },
    {
      key: "change_quantity",
      label: "Added (Qty)",
      color: "#22c55e",
    },
  ];

  const TOP_REDUCTION_COLUMNS = [
    {
      key: "stock_name",
      label: "Stock",
    },
    {
      key: "change_quantity",
      label: "Reduced (Qty)",
      color: "#ef4444",
    },
  ];

  const EXITS_COLUMNS = [
    {
      key: "stock_name",
      label: "Stock",
    },
    {
      key: "quantity",
      label: "Qty",
      color: "#ef4444",
    },
    {
      key: "market_value",
      label: "Value",
      color: "#ef4444",
    },
  ];
  const TOP_HOLDINGS_COLUMNS = [
    { key: "stock_name", label: "Stock" },
    { key: "quantity", label: "Qty" },
    { key: "market_value", label: "Value (in Cr.)" },
  ];
  const NEW_ENTRIES_COLUMNS = [
    { key: "stock_name", label: "Stock" },
    { key: "quantity", label: "Qty" },
    { key: "market_value", label: "Value (in Cr.)" },
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
    {
      title: "New Entries",
      data: newEntriesData,
      columns: NEW_ENTRIES_COLUMNS,
    },
    {
      title: "EXITS",
      data: exitsData,
      columns: EXITS_COLUMNS,
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
        <div key={card.title} className="h-full">
          <DataTableCard
            title={card.title}
            columns={card.columns}
            data={card.data}
            onViewMore={() => console.log(card.title)}
          />
        </div>
      ))}
    </div>
  );
}
