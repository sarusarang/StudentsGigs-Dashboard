import { motion } from "framer-motion";
import { TableSkeleton } from "@/components/loaders/TableSkeleton";
import { UserTablePagination } from "@/components/users/UserTablePagination";
import { JobAnalyticsResponse } from "@/service/job/types";
import { SearchX } from "lucide-react";



// Props
interface JobAnalyticsTableProps {
  data: JobAnalyticsResponse | undefined;
  isFetching: boolean;
  currentPage: number;
  onPrev: () => void;
  onNext: () => void;
}



export function JobAnalyticsTable({ data, isFetching, currentPage, onPrev, onNext }: JobAnalyticsTableProps) {


  return (

    <>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-border">
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Job Title</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Company</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Contact</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4 hidden sm:table-cell">Type</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Applicants</th>
            </tr>

          </thead>


          <tbody>

            {isFetching ? (

              <TableSkeleton columns={4} rows={5} />

            ) : data?.results?.length === 0 ? (

              <tr>

                <td colSpan={4} className="py-16">

                  <div className="flex flex-col items-center justify-center gap-3 text-center">

                    <div className="h-14 w-14 flex items-center justify-center rounded-full bg-muted">
                      <SearchX className="h-7 w-7 text-muted-foreground" />
                    </div>

                    <p className="text-base font-semibold text-foreground">
                      No jobs found
                    </p>

                    <p className="text-sm text-muted-foreground max-w-sm">
                      We couldn’t find any jobs matching your current filters. Try adjusting your search criteria.
                    </p>

                  </div>

                </td>

              </tr>


            ) : (

              data?.results?.map((job, i) => (

                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/50 hover:bg-accent/30 transition-colors"
                >

                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-foreground">{job?.job_title}</p>
                  </td>

                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    {job?.company}
                  </td>

                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    {job?.contact}
                  </td>

                  <td className="py-3 px-4 hidden sm:table-cell">

                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${job?.job_type === "online" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                      {job?.job_type.toUpperCase()}
                    </span>

                  </td>

                  <td className="py-3 px-4 text-sm font-semibold text-foreground">
                    {job?.total_application}
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
        hasNext={Boolean(data?.next)}
        onPrev={onPrev}
        onNext={onNext}
      />

    </>

  );

}
