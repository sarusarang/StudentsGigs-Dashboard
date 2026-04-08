import { CalendarIcon, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { type DatePreset } from "@/hooks/useDateFilter";

interface DateFilterBarProps {
  preset: DatePreset;
  from: Date | undefined;
  to: Date | undefined;
  onPresetChange: (preset: DatePreset) => void;
  onCustomRangeChange: (from: Date | undefined, to: Date | undefined) => void;
}

const presets: { value: DatePreset; label: string }[] = [
  { value: "all", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "this_week", label: "This Week" },
  { value: "this_month", label: "This Month" },
  { value: "this_year", label: "This Year" },
  { value: "custom", label: "Custom Range" },
];

export function DateFilterBar({
  preset,
  from,
  to,
  onPresetChange,
  onCustomRangeChange,
}: DateFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/50">
        {presets
          .filter((p) => p.value !== "custom")
          .map((p) => (
            <Button
              key={p.value}
              variant="ghost"
              size="sm"
              onClick={() => onPresetChange(p.value)}
              className={cn(
                "h-8 px-3 text-xs font-medium rounded-md transition-all",
                preset === p.value
                  ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {p.label}
            </Button>
          ))}
      </div>

      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 gap-2 text-xs font-medium border-border/60",
                preset === "custom" && "border-primary/40 bg-primary/5"
              )}
            >
              <CalendarIcon className="h-3.5 w-3.5" />
              {preset === "custom" && from
                ? `${format(from, "MMM d, yy")}${to ? ` – ${format(to, "MMM d, yy")}` : ""}`
                : "Custom Range"}
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="flex flex-col sm:flex-row">
              <div className="p-3 border-b sm:border-b-0 sm:border-r border-border">
                <p className="text-xs font-medium text-muted-foreground mb-2 px-1">From</p>
                <Calendar
                  mode="single"
                  selected={from}
                  onSelect={(date) => onCustomRangeChange(date, to)}
                  className="p-0 pointer-events-auto"
                  initialFocus
                />
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-muted-foreground mb-2 px-1">To</p>
                <Calendar
                  mode="single"
                  selected={to}
                  onSelect={(date) => onCustomRangeChange(from, date)}
                  className="p-0 pointer-events-auto"
                  disabled={(date) => (from ? date < from : false)}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
