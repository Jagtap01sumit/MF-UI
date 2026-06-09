"use client";

import KpiCard from "../components/common/KpiCard";

import { Wallet, IndianRupee, PlusCircle, MinusCircle } from "lucide-react";

import { getTheme } from "@/app/CONSTANTS/Theme";

import "swiper/css";
// import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import useFundStore from "@/app/store/useFundStore";
export default function KpiSection() {
  const theme = getTheme(true);

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
      value: "≈ " + total_market_value + " Cr.",
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
      {/* <div className="md:hidden w-screen overflow-x-hidden"> */}
      {/* <div className="w-full p-3 ">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={2}
            slidesPerView={1}
            // navigation
            // scrollbar={{ draggable: true }}
            className="w-full"
          >
            {" "}
            {cards.map((card) => (
              <SwiperSlide key={card.title} {...card}>
                <KpiCard key={card.title} {...card} theme={theme} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div> */}
      {/* </div> */}
      {/* DESKTOP GRID */}
      <div className=" grid grid-cols-2  xl:grid-cols-5 gap-5 md:gap-3 ">
        {cards.map((card) => (
          <KpiCard key={card.title} {...card} theme={theme} />
        ))}
      </div>
    </>
  );
}
