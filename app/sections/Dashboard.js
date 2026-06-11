
import KpiSection from "@/app/sections/KpiSection";
import AllocationSection from "@/app/sections/AllocationSection";
import TablesSection from "@/app/sections/TablesSection";
export default function Dashboard({theme}) {
  return (
    <div>
      <KpiSection theme={theme} />
      <AllocationSection theme={theme} />
     <TablesSection/>
    </div>
  );
}
