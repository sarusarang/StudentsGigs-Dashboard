import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PieChartIcon } from "lucide-react";



// Interface for Category Data
interface CategoryData {
  category: string;
  count: number;
}



// Interface for Job Category Chart Props
interface JobCategoryChartProps {
  data: CategoryData[] | undefined;
  isLoading: boolean;
  error: Error | null;
}



export function JobCategoryChart({ data, isLoading, error }: JobCategoryChartProps) {



  // Custom label formatter for XAxis to truncate long category names
  const renderCustomXAxisTick = ({ x, y, payload }: any) => {

    let truncatedText = payload.value;


    if (truncatedText && truncatedText.length > 12) {
      truncatedText = truncatedText.substring(0, 10) + "...";
    }


    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="middle"
          fill="hsl(var(--muted-foreground))"
          fontSize={11}
        >
          {truncatedText}
          <title>{payload.value}</title>
        </text>
      </g>
    );
  };



  if (isLoading) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }



  if (error) {
    return (
      <div className="h-[200px] flex items-center justify-center text-destructive">
        Failed to load category data.
      </div>
    );
  }



  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[260px] gap-3">
        <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center">
          <PieChartIcon className="h-8 w-8 text-muted-foreground/50" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">No category data available</p>
        <p className="text-xs text-muted-foreground/60">Category distribution will appear here once jobs are posted.</p>
      </div>
    );
  }


  return (

    <ResponsiveContainer width="100%" height={260}>

      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>

        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />

        <XAxis
          dataKey="category"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tick={renderCustomXAxisTick}
          interval={0}
        />

        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `${value}`} />

        <Tooltip
          contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
        />

        <Bar dataKey="count" fill="hsl(24, 95%, 53%)" radius={[6, 6, 0, 0]} />

      </BarChart>

    </ResponsiveContainer>

  );

}
