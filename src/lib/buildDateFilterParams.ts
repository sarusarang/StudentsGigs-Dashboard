import { format } from "date-fns";
import { type DateFilter } from "@/hooks/useDateFilter";

// Maps frontend preset names to backend filter values
const PRESET_MAP: Record<string, string> = {
  all: "all_time",
  today: "today",
  this_week: "this_week",
  this_month: "this_month",
  this_year: "this_year",
  custom: "custom",
};

/**
 * Converts a DateFilter object into URLSearchParams entries that
 * match the backend's expected query string format:
 *
 *   ?filter=all_time
 *   ?filter=today
 *   ?filter=this_week
 *   ?filter=this_month
 *   ?filter=this_year
 *   ?filter=custom&start_date=YYYY-MM-DD&end_date=YYYY-MM-DD
 */
export function buildDateFilterParams(filter: DateFilter): Record<string, string> {
  const backendFilter = PRESET_MAP[filter.preset] ?? "all_time";
  const params: Record<string, string> = { filter: backendFilter };

  if (filter.preset === "custom") {
    if (filter.from) params.start_date = format(filter.from, "yyyy-MM-dd");
    if (filter.to)   params.end_date   = format(filter.to,   "yyyy-MM-dd");
  }

  return params;
}
