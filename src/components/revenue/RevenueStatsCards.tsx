import { StatCard } from "@/components/common/StatCard";
import { useGetRevenueStats } from "@/service/revenue/useRevenue";
import { type DateFilter } from "@/hooks/useDateFilter";
import { IndianRupee, TrendingUp, Users, Building2 } from "lucide-react";
import Error from "@/components/loaders/Error";


// Revenue Stats Cards Component
interface RevenueStatsCardsProps {
  filter: DateFilter;
}



export function RevenueStatsCards({ filter }: RevenueStatsCardsProps) {


  const { data: revenueData, error } = useGetRevenueStats(filter);



  if (error) {
    return <Error />;
  }


  // Revenue Stats Data
  const totalRevenue = revenueData?.total_revenue || 0;
  const employeeRevenue = revenueData?.employee_revenue || 0;
  const employerRevenue = revenueData?.employer_revenue || 0;
  const paidUsers = revenueData?.paid_users || 0;



  return (


    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">


      <StatCard
        title="Total Revenue"
        value={`₹ ${totalRevenue.toLocaleString()}`}
        icon={IndianRupee}
        iconColor="hsl(24, 95%, 53%)"
        delay={0}
      />


      <StatCard
        title="Employee Revenue"
        value={`₹ ${employeeRevenue.toLocaleString()}`}
        icon={Users}
        iconColor="hsl(200, 80%, 50%)"
        delay={0.1}
      />

      <StatCard
        title="Employer Revenue"
        value={`₹ ${employerRevenue.toLocaleString()}`}
        icon={Building2}
        iconColor="hsl(150, 60%, 45%)"
        delay={0.2}
      />

      <StatCard
        title="Paid Users"
        value={paidUsers}
        icon={TrendingUp}
        iconColor="hsl(280, 65%, 55%)"
        delay={0.3}
      />

    </div>

  );

}
