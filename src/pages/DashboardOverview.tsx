import { DashboardLayout } from "@/components/common/DashboardLayout";
import { StatCard } from "@/components/common/StatCard";
import { DateFilterBar } from "@/components/common/DateFilterBar";
import { useDateFilter } from "@/hooks/useDateFilter";
import { Users, Building2, Briefcase, IndianRupee } from "lucide-react";
import { PlanDistribution } from "@/components/dashboard/PlanDistribution";
import { RecentEmployees } from "@/components/dashboard/RecentEmployees";
import { RecentJobs } from "@/components/dashboard/RecentJobs";
import { useGetDashboardOverview } from "@/service/overview/useOverview";
import PageLoader from "@/components/loaders/PageLoader";
import Error from "@/components/loaders/Error";




export default function DashboardOverview() {



  // Date Filter
  const { filter, setPreset, setCustomRange } = useDateFilter();



  // Get Dashboard Overview API
  const { data: dashboardOverview, isLoading, error } = useGetDashboardOverview(filter);



  // Loading UI
  if (isLoading) {
    return (
      <PageLoader message="Gathering the latest dashboard insights" title="Loading Analytics..." />
    );
  }


  // Error UI
  if (error) {
    return (
      <Error />
    );
  }


  // Pie Chart Colors
  const pieColors = ["#3B82F6", "#8B5CF6", "#EC4899"];


  // Pie Chart Data
  const pieData = [
    { name: "Free", value: dashboardOverview?.free || 0 },
    { name: "Standard", value: dashboardOverview?.standard || 0 },
    { name: "Premium", value: dashboardOverview?.premium || 0 },
  ];


  return (


    <DashboardLayout>


      <div className="space-y-6">


        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Dashboard Overview</h1>
            <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening.</p>
          </div>

          <DateFilterBar preset={filter.preset} from={filter.from} to={filter.to} onPresetChange={setPreset} onCustomRangeChange={setCustomRange} />

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <StatCard title="Total Employees" value={dashboardOverview?.total_employees || 0} icon={Users} iconColor="hsl(200, 80%, 50%)" delay={0} />

          <StatCard title="Total Employers" value={dashboardOverview?.total_employers || 0} icon={Building2} iconColor="hsl(24, 95%, 53%)" delay={0.1} />

          <StatCard title="Total Revenue" value={`₹ ${(dashboardOverview?.total_revenue || 0).toLocaleString()}`} icon={IndianRupee} iconColor="hsl(150, 60%, 45%)" delay={0.2} />

          <StatCard title="Active Jobs" value={dashboardOverview?.active_jobs || 0} icon={Briefcase} iconColor="hsl(280, 65%, 55%)" delay={0.3} />

        </div>


        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
          <PlanDistribution data={pieData} colors={pieColors} />
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          <RecentEmployees employees={dashboardOverview?.recent_employees || []} />

          <RecentJobs jobs={dashboardOverview?.recent_jobs || []} />

        </div>

      </div>

    </DashboardLayout>


  );


}
