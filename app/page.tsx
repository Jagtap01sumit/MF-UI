"use client";
import Sidebar from "@/app/components/common/Sidebar";
import { sidebarItems } from "@/app/config/Sidebar";
import Filter from "@/app/sections/Filter";
import Header from "@/app/sections/Header";
import useTheme from "@/app/hook/useTheme";
import HopHoldingSection from "@/app/sections/screens/HopHoldingSection";
import TopIncreasesSection from "@/app/sections/screens/TopIncreasesSection"
import TopReductionSection from "@/app/sections/screens/TopReductionSection";
import Setting from "@/app/sections/screens/Setting";
import SectorAllocation from "@/app/sections/screens/SectorAllocation";
import Dashboard from "@/app/sections/Dashboard";
import useFundStore from "@/app/store/useFundStore";
export default function Home() {
  const theme = useTheme();
  const { isSidebarOpen, activeMenu } = useFundStore();

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar menuItems={sidebarItems} theme={theme} />

      {/* Right scrollable section */}
      <main
        className="flex-1 p-6 overflow-y-auto"
        style={{
          background: theme.background,
        }}
      >
        {/* {!isSidebarOpen ? <Header /> : null}
        <Filter />

        <Dashboard theme={theme} /> */}
        {!isSidebarOpen && <Header />}
        <Filter />

        {activeMenu === "dashboard" && <Dashboard theme={theme} />}
        {activeMenu === "topHolding" && <HopHoldingSection theme={theme} />}
        {activeMenu === "topIncreases" && <TopIncreasesSection theme={theme} />}
        {activeMenu === "topReductions" && <TopReductionSection theme={theme} />}
        {activeMenu === "sectorAllocation" && <SectorAllocation theme={theme} />}
        {activeMenu === "setting" && <Setting theme={theme} />}
        {/* <TablesSection/> */}
      </main>
    </div>
  );
}
