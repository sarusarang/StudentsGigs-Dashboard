import { motion } from "framer-motion";
import { User, Users } from "lucide-react";
import { RecentEmployee } from "@/service/overview/types";




export function RecentEmployees({ employees }: { employees: RecentEmployee[] }) {


  return (


    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card rounded-xl p-6">


      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground text-lg">Recent Employees</h3>
        <User className="h-6 w-6 text-muted-foreground" />
      </div>


      <div className="space-y-3">


        {employees?.length > 0 ? (


          employees?.map((emp) => (


            <div key={emp?.name} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">


              <div className="flex items-center gap-3">


                <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center overflow-hidden">

                  {emp?.profile_photo ? (

                    <img
                      src={emp?.profile_photo}
                      alt={emp?.name || "profile"}
                      className="h-full w-full object-cover"
                    />

                  ) : (

                    <span className="text-sm font-semibold text-accent-foreground">
                      {emp?.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>

                  )}

                </div>


                <div>
                  <p className="text-sm font-medium text-foreground">{emp?.name}</p>
                  <p className="text-xs text-muted-foreground">{emp?.job_title}</p>
                </div>

              </div>

              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${emp?.plan === "premium" ? "bg-pink-500 text-white" : emp?.plan === "standard" ? "bg-violet-500 text-white" : "bg-blue-500 text-white"}`}>
                {emp?.plan.toUpperCase()}
              </span>

            </div>

          ))

        ) : (

          <div className="flex flex-col items-center justify-center py-10 gap-3">

            <div className="h-14 w-14 rounded-full bg-muted/50 flex items-center justify-center">
              <Users className="h-7 w-7 text-muted-foreground/50" />
            </div>

            <p className="text-sm font-medium text-muted-foreground">No employees found</p>

            <p className="text-xs text-muted-foreground/60 text-center">No employee registrations in the selected period.</p>

          </div>

        )}

      </div>


    </motion.div>


  );


}
