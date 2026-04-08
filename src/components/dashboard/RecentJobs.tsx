import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { RecentJob } from "@/service/overview/types";



export function RecentJobs({ jobs }: { jobs: RecentJob[] }) {


  return (


    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass-card rounded-xl p-6">


      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground text-lg">Recent Job Postings</h3>
        <Briefcase className="h-6 w-6 text-muted-foreground" />
      </div>


      <div className="space-y-3">

        {jobs?.length > 0 ? (

          jobs?.map((job) => (

            <div key={job?.job_title} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">

              <div>
                <p className="text-sm font-medium text-foreground">{job?.job_title}</p>
                <p className="text-xs text-muted-foreground font-bold">{job?.company}</p>
              </div>

              <div className="text-right">

                <p className="text-sm font-semibold text-foreground">{job?.total_application} applicants</p>

                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${job?.job_type === "online" ? "bg-success/10 text-success" : job?.job_type === "offline" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>
                  {job?.job_type}
                </span>

              </div>

            </div>

          ))

        ) : (

          <div className="flex flex-col items-center justify-center py-10 gap-3">

            <div className="h-14 w-14 rounded-full bg-muted/50 flex items-center justify-center">
              <Briefcase className="h-7 w-7 text-muted-foreground/50" />
            </div>

            <p className="text-sm font-medium text-muted-foreground">No job postings found</p>

            <p className="text-xs text-muted-foreground/60 text-center">No jobs were posted in the selected period.</p>

          </div>

        )}


      </div>


    </motion.div>


  );


}
