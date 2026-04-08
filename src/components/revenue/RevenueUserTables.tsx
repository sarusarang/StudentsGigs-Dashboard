import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useGetEmployeeData, useGetEmployerData } from "@/service/Users/useUser";
import { EmployeeTable } from "@/components/users/EmployeeTable";
import { EmployerTable } from "@/components/users/EmployerTable";
import { type DateFilter } from "@/hooks/useDateFilter";



// Revenue User Tables Component
interface RevenueUserTablesProps {
  filter: DateFilter;
}





export function RevenueUserTables({ filter }: RevenueUserTablesProps) {


  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");


  // Pagination state
  const [employeePage, setEmployeePage] = useState(1);
  const [employerPage, setEmployerPage] = useState(1);



  // Debounce search
  useEffect(() => {

    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setEmployeePage(1);
      setEmployerPage(1);
    }, 500);

    return () => clearTimeout(handler);

  }, [searchTerm]);



  // Fetch data
  const { data: employeeData, isFetching: employeeFetching } = useGetEmployeeData(filter, employeePage, debouncedSearch);
  const { data: employerData, isFetching: employerFetching } = useGetEmployerData(filter, employerPage, debouncedSearch);



  return (


    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-xl p-6">


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

  );

}
