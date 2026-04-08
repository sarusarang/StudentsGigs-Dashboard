import { motion } from "framer-motion";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";



// Plan Distribution Component
interface PlanDistributionProps {
  data: any[];
  colors: string[];
}



export function PlanDistribution({ data, colors }: PlanDistributionProps) {


  const hasData = data?.some((d) => d?.value > 0);


  return (


    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card rounded-xl p-6">


      <h3 className="font-display font-semibold text-foreground text-lg mb-1">Plan Distribution</h3>
      <p className="text-sm text-muted-foreground mb-4">Users across plans</p>


      {hasData ? (


        <ResponsiveContainer width="100%" height={260}>

          <PieChart>

            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>

            <Legend formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>} />

            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />

          </PieChart>

        </ResponsiveContainer>


      ) : (

        <div className="flex flex-col items-center justify-center h-[260px] gap-3">

          <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center">
            <PieChartIcon className="h-8 w-8 text-muted-foreground/50" />
          </div>

          <p className="text-sm font-medium text-muted-foreground">No plan data available</p>

          <p className="text-xs text-muted-foreground/60">Plan distribution will appear here once users are registered.</p>

        </div>

      )}

    </motion.div>

  );

}
