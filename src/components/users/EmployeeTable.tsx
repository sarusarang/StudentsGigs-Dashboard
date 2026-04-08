import { motion } from "framer-motion";
import { TableSkeleton } from "@/components/loaders/TableSkeleton";
import { UserTablePagination } from "@/components/users/UserTablePagination";
import { Employee, EmployeeDashboardResponse } from "@/service/Users/types";
import { SearchX } from "lucide-react";





// Plan badge color helper
function getPlanClass(plan: Employee["plan"]) {

  if (plan === "premium") return "bg-pink-500 text-white";
  if (plan === "standard") return "bg-violet-500 text-white";
  return "bg-blue-500 text-white";

}



// Interface for EmployeeTableProps
interface EmployeeTableProps {
  data: EmployeeDashboardResponse | undefined;
  isFetching: boolean;
  currentPage: number;
  onPrev: () => void;
  onNext: () => void;
}



export function EmployeeTable({ data, isFetching, currentPage, onPrev, onNext }: EmployeeTableProps) {


  return (


    <>


      <div className="overflow-x-auto">


        <table className="w-full">


          <thead>

            <tr className="border-b border-border">
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Name</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Contact</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4 hidden md:table-cell">Role</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4 hidden sm:table-cell">Plan</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Amount</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Status</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4 hidden lg:table-cell">Joined</th>
            </tr>

          </thead>



          <tbody>

            {isFetching ? (

              <TableSkeleton columns={7} rows={5} />

            ) : data?.results?.length === 0 ? (

              <tr>

                <td colSpan={7} className="py-16">

                  <div className="flex flex-col items-center justify-center gap-3 text-center">

                    {/* Icon */}
                    <div className="h-14 w-14 flex items-center justify-center rounded-full bg-muted">
                      <SearchX className="h-7 w-7 text-muted-foreground" />
                    </div>

                    {/* Title */}
                    <p className="text-base font-semibold text-foreground">
                      No employees found
                    </p>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground max-w-sm">
                      We couldn’t find any employees matching your current filters. Try adjusting your search criteria.
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

                      <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center overflow-hidden">

                        {emp?.profile_photo ? (

                          <img src={emp?.profile_photo} alt={emp?.name} className="h-full w-full object-cover" />

                        ) : (

                          <span className="text-xs font-semibold text-accent-foreground">{emp?.name?.charAt(0) || "U"}</span>

                        )}


                      </div>

                      <div>

                        <p className="text-sm font-medium text-foreground">{emp?.name}</p>
                        <p className="text-xs text-muted-foreground md:hidden">{emp?.job_title}</p>

                      </div>
                    </div>

                  </td>


                  <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">{emp?.contact}</td>


                  <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">{emp?.job_title || "N/A"}</td>


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


                  <td className="py-3 px-4 text-sm text-muted-foreground hidden lg:table-cell">
                    {new Date(emp?.created_date).toLocaleDateString()}
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
