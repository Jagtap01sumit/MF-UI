"use client";

import Sidebar from "@/app/components/common/Sidebar";
import { sidebarItems } from "@/app/config/Sidebar";
import KpiSection from "@/app/sections/KpiSection";
import Filter from "@/app/sections/Filter";
import { getTheme } from "@/app/CONSTANTS/Theme";
import AllocationSection from "@/app/sections/AllocationSection";

export default function Home() {
    const theme = getTheme(true);

  return (
    <div className="h-screen flex overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar menuItems={sidebarItems} />

      {/* Right scrollable section */}
      <main
        className="flex-1 p-6 overflow-y-auto"
        style={{
          background: theme.background,
        }}
      >
        <Filter />

        <div>
          <KpiSection />
          <AllocationSection theme={theme} />
          <AllocationSection theme={theme} />
        </div>
      </main>
    </div>
  );
}