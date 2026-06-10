
import KpiSection from "@/app/sections/KpiSection";
import AllocationSection from "@/app/sections/AllocationSection";

export default function Dashboard({theme}) {
  return (
    <div>
      <KpiSection theme={theme} />
      <AllocationSection theme={theme} />
      {/* <AllocationSection theme={theme} /> */}
    </div>
  );
}
