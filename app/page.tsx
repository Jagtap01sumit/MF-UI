"use client"
import Sidebar from "@/app/components/common/Sidebar";
import { sidebarItems } from "@/app/config/Sidebar";
import Filter from "@/app/sections/Filter";
import Header from "@/app/sections/Header";
import useTheme from "@/app/hook/useTheme";
import TablesSection from "@/app/sections/TablesSection";
import Dashboard from "@/app/sections/Dashboard";
import useFundStore from "@/app/store/useFundStore";
export default function Home() {
  const theme = useTheme();
  const { isSidebarOpen } = useFundStore();

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
        {!isSidebarOpen ? <Header /> : null}
        <Filter />

       <Dashboard theme={theme}/>
       <TablesSection/>
      </main>
    </div>
  );
}
