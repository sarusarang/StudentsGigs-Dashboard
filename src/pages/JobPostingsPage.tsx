import { DashboardLayout } from "@/components/common/DashboardLayout";
import { StatCard } from "@/components/common/StatCard";
import { DateFilterBar } from "@/components/common/DateFilterBar";
import { useDateFilter } from "@/hooks/useDateFilter";
import { Briefcase, Globe, MapPin, Eye, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { JobCategoryChart } from "@/components/dashboard/JobCategoryChart";
import { useGetJobStats, useGetJobCategoryGraph, useGetOnlineJobs, useGetOfflineJobs } from "@/service/job/useJob";
import { JobAnalyticsTable } from "@/components/jobs/JobAnalyticsTable";




export default function JobPostingsPage() {


  // Date Filter
  const { filter, setPreset, setCustomRange, filterByDate } = useDateFilter();



  // Get Job Stats
  const { data: jobStats, isLoading: isLoadingJobStats, error: jobStatsError } = useGetJobStats(filter);



  // Get Job Category Graph
  const { data: jobCategoryGraph, isLoading: isLoadingJobCategoryGraph, error: jobCategoryGraphError } = useGetJobCategoryGraph(filter);



  // Search and Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [onlinePage, setOnlinePage] = useState(1);
  const [offlinePage, setOfflinePage] = useState(1);



  // Debounce Search
  useEffect(() => {

    const handler = setTimeout(() => {

      setDebouncedSearch(searchTerm);
      setOnlinePage(1);
      setOfflinePage(1);

    }, 500);

    return () => clearTimeout(handler);

  }, [searchTerm]);



  // Get Online Jobs
  const { data: onlineJobsData, isFetching: isFetchingOnlineJobs, error: onlineJobsError } = useGetOnlineJobs(filter, onlinePage, debouncedSearch);



  // Get Offline Jobs
  const { data: offlineJobsData, isFetching: isFetchingOfflineJobs, error: offlineJobsError } = useGetOfflineJobs(filter, offlinePage, debouncedSearch);


  return (


    <DashboardLayout>


      <div className="space-y-6">


        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Job Postings</h1>
            <p className="text-muted-foreground mt-1">All jobs posted by employers across the platform.</p>
          </div>

          <DateFilterBar preset={filter.preset} from={filter.from} to={filter.to} onPresetChange={setPreset} onCustomRangeChange={setCustomRange} />

        </div>



        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Jobs" value={isLoadingJobStats ? "..." : jobStats?.total_jobs_count || 0} icon={Briefcase} iconColor="hsl(24, 95%, 53%)" delay={0} />
          <StatCard title="Online Jobs" value={isLoadingJobStats ? "..." : jobStats?.online_jobs_count || 0} icon={Globe} iconColor="hsl(200, 80%, 50%)" delay={0.1} />
          <StatCard title="Offline Jobs" value={isLoadingJobStats ? "..." : jobStats?.offline_jobs_count || 0} icon={MapPin} iconColor="hsl(150, 60%, 45%)" delay={0.2} />
          <StatCard title="Total Applicants" value={isLoadingJobStats ? "..." : jobStats?.total_applications_count || 0} icon={Eye} iconColor="hsl(280, 65%, 55%)" delay={0.3} />
        </div>



        {/* Jobs by Category */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-card rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground text-lg mb-4">Jobs by Category</h3>
          <JobCategoryChart
            data={jobCategoryGraph}
            isLoading={isLoadingJobCategoryGraph}
            error={jobCategoryGraphError}
          />
        </motion.div>




        {/* Jobs Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-xl p-6">


          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">

            <div className="relative w-full sm:w-80">

              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input placeholder="Search jobs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 bg-muted/50 border-transparent focus:border-primary/30" />

            </div>

          </div>



          <Tabs defaultValue="online">

            <TabsList className="bg-muted/50 mb-6">

              <TabsTrigger value="online" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Online ({onlineJobsData?.count || 0})
              </TabsTrigger>

              <TabsTrigger value="offline" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Offline ({offlineJobsData?.count || 0})
              </TabsTrigger>

            </TabsList>


            <TabsContent value="online" className="outline-none">

              <JobAnalyticsTable
                data={onlineJobsData}
                isFetching={isFetchingOnlineJobs}
                currentPage={onlinePage}
                onPrev={() => setOnlinePage(p => Math.max(1, p - 1))}
                onNext={() => setOnlinePage(p => Math.min(onlineJobsData?.total_pages ?? 1, p + 1))}
              />

            </TabsContent>


            <TabsContent value="offline" className="outline-none">

              <JobAnalyticsTable
                data={offlineJobsData}
                isFetching={isFetchingOfflineJobs}
                currentPage={offlinePage}
                onPrev={() => setOfflinePage(p => Math.max(1, p - 1))}
                onNext={() => setOfflinePage(p => Math.min(offlineJobsData?.total_pages ?? 1, p + 1))}
              />

            </TabsContent>

          </Tabs>

        </motion.div>

      </div>

    </DashboardLayout>

  );


}
