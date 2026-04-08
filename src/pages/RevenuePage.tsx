import { DashboardLayout } from "@/components/common/DashboardLayout";
import { DateFilterBar } from "@/components/common/DateFilterBar";
import { useDateFilter } from "@/hooks/useDateFilter";
import { RevenueStatsCards } from "@/components/revenue/RevenueStatsCards";
import { RevenueUserTables } from "@/components/revenue/RevenueUserTables";



export default function RevenuePage() {

  // Date filter
  const { filter, setPreset, setCustomRange } = useDateFilter();


  return (

    <DashboardLayout>

      <div className="space-y-6">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Revenue Overview</h1>
            <p className="text-muted-foreground mt-1">Track all revenue from employee and employer premium plans.</p>
          </div>

          <DateFilterBar preset={filter.preset} from={filter.from} to={filter.to} onPresetChange={setPreset} onCustomRangeChange={setCustomRange} />

        </div>


        {/* Stats Cards */}
        <RevenueStatsCards filter={filter} />


        {/* User Tables */}
        <RevenueUserTables filter={filter} />

      </div>

    </DashboardLayout>

  );

}
