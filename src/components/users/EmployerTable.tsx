import { motion } from "framer-motion";
import { TableSkeleton } from "@/components/loaders/TableSkeleton";
import { UserTablePagination } from "@/components/users/UserTablePagination";
import { Employer, EmployerDashboardResponse } from "@/service/Users/types";
import { SearchX, Download } from "lucide-react";
import { Button } from "@/components/ui/button";



// Plan badge color helper
function getPlanClass(plan: Employer["plan"]) {
  if (plan === "premium") return "bg-pink-500 text-white";
  if (plan === "standard") return "bg-violet-500 text-white";
  return "bg-blue-500 text-white";
}



// Interface for EmployerTableProps
interface EmployerTableProps {

  data: EmployerDashboardResponse | undefined;
  isFetching: boolean;
  currentPage: number;
  onPrev: () => void;
  onNext: () => void;

}



export function EmployerTable({ data, isFetching, currentPage, onPrev, onNext }: EmployerTableProps) {


  return (


    <>

      {/* Download Alert */}
      {data?.download_url && (
        <motion.div
           initial={{ opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           className="flex flex-col sm:flex-row items-center justify-between bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6"
        >
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <h3 className="text-sm font-semibold text-foreground flex items-center justify-center sm:justify-start gap-2">
              <Download className="w-4 h-4 text-primary" />
              Export Employer Data
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Download the complete employer list as a CSV file for your offline records and reporting.
            </p>
          </div>
          <a href={data.download_url} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all duration-300">
              <Download className="w-4 h-4" />
              Download CSV
            </Button>
          </a>
        </motion.div>
      )}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-border">
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Company</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Contact</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4 hidden sm:table-cell">Plan</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Amount</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Status</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4 hidden md:table-cell">Joined</th>
            </tr>

          </thead>



          <tbody>

            {isFetching ? (

              <TableSkeleton columns={6} rows={5} />

            ) : data?.results?.length === 0 ? (

              <tr>

                <td colSpan={6} className="py-16">

                  <div className="flex flex-col items-center justify-center gap-3 text-center">

                    {/* Icon */}
                    <div className="h-14 w-14 flex items-center justify-center rounded-full bg-muted">
                      <SearchX className="h-7 w-7 text-muted-foreground" />
                    </div>

                    {/* Title */}
                    <p className="text-base font-semibold text-foreground">
                      No employers found
                    </p>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground max-w-sm">
                      We couldn’t find any employers matching your current filters. Try adjusting your search criteria.
                    </p>

                  </div>

                </td>

              </tr>

            ) : (

              data?.results?.map((emp, i) => (

                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/50 hover:bg-accent/30 transition-colors"
                >

                  <td className="py-3 px-4">

                    <div className="flex items-center gap-3">

                      <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center overflow-hidden">

                        {emp?.logo ? (

                          <img src={emp?.logo} alt={emp?.company_name || ""} className="h-full w-full object-cover" />

                        ) : (

                          <span className="text-xs font-bold text-primary-foreground">{emp?.company_name?.charAt(0) || "C"}</span>

                        )}

                      </div>

                      <div>
                        <p className="text-sm font-medium text-foreground">{emp?.company_name}</p>
                      </div>

                    </div>

                  </td>


                  <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">{emp?.contact}</td>


                  <td className="py-3 px-4 hidden sm:table-cell">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getPlanClass(emp?.plan)}`}>
                      {emp?.plan?.toUpperCase()}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-sm font-semibold text-foreground">
                    ₹{emp?.plan_amount ?? 0}
                  </td>

                  <td className="py-3 px-4">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${emp?.status?.toLowerCase() === "active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                      {emp?.status}
                    </span>
                  </td>


                  <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">
                    {new Date(emp?.created_at).toLocaleDateString()}
                  </td>


                </motion.tr>


              ))


            )}


          </tbody>


        </table>


      </div>

      <UserTablePagination
        currentPage={currentPage}
        totalPages={data?.total_pages ?? 1}
        hasNext={data?.next}
        onPrev={onPrev}
        onNext={onNext}
      />

    </>

  );


}
