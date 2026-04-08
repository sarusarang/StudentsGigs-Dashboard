import { DashboardLayout } from "@/components/common/DashboardLayout";
import { StatCard } from "@/components/common/StatCard";
import { DateFilterBar } from "@/components/common/DateFilterBar";
import { useDateFilter } from "@/hooks/useDateFilter";
import { Users, Building2, Crown, BadgeCheck, Gift, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useGetEmployeeData, useGetEmployerData, useGetUserStats } from "@/service/Users/useUser";
import PageLoader from "@/components/loaders/PageLoader";
import Error from "@/components/loaders/Error";
import { EmployeeTable } from "@/components/users/EmployeeTable";
import { EmployerTable } from "@/components/users/EmployerTable";



export default function UsersPage() {



  // Search
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");



  // Pagination
  const [employeePage, setEmployeePage] = useState(1);
  const [employerPage, setEmployerPage] = useState(1);



  // Date Filter
  const { filter, setPreset, setCustomRange } = useDateFilter();



  // Debounce search — resets pages on new search
  useEffect(() => {

    const handler = setTimeout(() => {

      setDebouncedSearch(searchTerm);
      setEmployeePage(1);
      setEmployerPage(1);

    }, 500);

    return () => clearTimeout(handler);

  }, [searchTerm]);



  // Data
  const { data: employeeData, isLoading: employeeLoading, isFetching: employeeFetching, error: employeeError } = useGetEmployeeData(filter, employeePage, debouncedSearch);
  const { data: employerData, isLoading: employerLoading, isFetching: employerFetching, error: employerError } = useGetEmployerData(filter, employerPage, debouncedSearch);
  const { data: userStatsData, isLoading: userStatsLoading, error: userStatsError } = useGetUserStats(filter);



  // Loading UI (initial load only)
  if (employeeLoading || employerLoading || userStatsLoading) {
    return <PageLoader message="Gathering user data and statistics" title="Loading Users..." />;
  }



  // Error UI
  if (employeeError || employerError || userStatsError) {
    return <Error />;
  }



  return (


    <DashboardLayout>


      <div className="space-y-6">


        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Users Management</h1>
            <p className="text-muted-foreground mt-1">Manage all employees and employers on the platform.</p>
          </div>

          <DateFilterBar preset={filter.preset} from={filter.from} to={filter.to} onPresetChange={setPreset} onCustomRangeChange={setCustomRange} />

        </div>



        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

          <StatCard title="Total Employees" value={userStatsData?.employee_count ?? 0} icon={Users} iconColor="hsl(200, 80%, 50%)" delay={0} />
          <StatCard title="Total Employers" value={userStatsData?.employer_count ?? 0} icon={Building2} iconColor="hsl(150, 60%, 45%)" delay={0.1} />
          <StatCard title="Total Free Plan Users" value={userStatsData?.free_plns ?? 0} icon={Gift} iconColor="hsl(24, 95%, 53%)" delay={0.2} />
          <StatCard title="Total Standard Plan Users" value={userStatsData?.standard_plans ?? 0} icon={BadgeCheck} iconColor="hsl(265, 80%, 65%)" delay={0.3} />
          <StatCard title="Total Premium Plan Users" value={userStatsData?.premium_plans ?? 0} icon={Crown} iconColor="hsl(45, 95%, 55%)" delay={0.4} />

        </div>



        {/* Users Table Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-xl p-6">


          {/* Search */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">

            <div className="relative w-full sm:w-80">

              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-muted/50 border-transparent focus:border-primary/30"
              />

            </div>

          </div>



          {/* Tabs */}
          <Tabs defaultValue="employees">

            <TabsList className="bg-muted/50 mb-6">

              <TabsTrigger value="employees" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Employees ({employeeData?.count ?? 0})
              </TabsTrigger>

              <TabsTrigger value="employers" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Employers ({employerData?.count ?? 0})
              </TabsTrigger>

            </TabsList>


            <TabsContent value="employees" className="outline-none">

              <EmployeeTable
                data={employeeData}
                isFetching={employeeFetching}
                currentPage={employeePage}
                onPrev={() => setEmployeePage((p) => Math.max(1, p - 1))}
                onNext={() => setEmployeePage((p) => Math.min(employeeData?.total_pages ?? 1, p + 1))}
              />

            </TabsContent>


            <TabsContent value="employers" className="outline-none">

              <EmployerTable
                data={employerData}
                isFetching={employerFetching}
                currentPage={employerPage}
                onPrev={() => setEmployerPage((p) => Math.max(1, p - 1))}
                onNext={() => setEmployerPage((p) => Math.min(employerData?.total_pages ?? 1, p + 1))}
              />

            </TabsContent>


          </Tabs>


        </motion.div>


      </div>


    </DashboardLayout>


  );


}
