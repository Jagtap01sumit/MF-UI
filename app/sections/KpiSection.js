"use client";

import KpiCard from "../components/common/KpiCard";

import { Wallet, IndianRupee, PlusCircle, MinusCircle } from "lucide-react";


import "swiper/css";
// import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import useFundStore from "@/app/store/useFundStore";
export default function KpiSection({theme}) {
  
  const {
  
    total_holding,
    total_schemes,
    new_entries,
    total_market_value,
    total_exits,
  } = useFundStore();
  
 
  const cards = [
    {
      title: "Total Holdings",
      value: total_holding,
      icon: Wallet,
      color: theme.kpi.holdings,
      subtitle: "Current Portfolio",
    },
    {
      title: "Market Value",
      prefix:"≈ ",
      suffix:" Cr.",
      value: total_market_value,
      icon: IndianRupee,
      color: theme.kpi.marketValue,
      subtitle: "Latest Month",
    },
    {
      title: "Total Schemes",
      value: total_schemes,
      icon: IndianRupee,
      color: theme.kpi.marketValue,
      subtitle: "Latest Month",
    },
    {
      title: "New Entries",
      value: new_entries,
      icon: PlusCircle,
      color: theme.kpi.newEntries,
      subtitle: "This Month",
    },
    {
      title: "Exits",
      value: total_exits,
      icon: MinusCircle,
      color: theme.kpi.exits,
      subtitle: "This Month",
    },
  ];

  return (
    <>
      <div className=" grid grid-cols-2 xl:grid-cols-5 gap-5 md:gap-3 ">
        {cards.map((card) => (
          <KpiCard key={card.title} {...card} theme={theme} />
        ))}
      </div>
    </>
  );
}
