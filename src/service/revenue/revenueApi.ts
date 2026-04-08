import { CommonApi } from "@/lib/CommonApi";
import { type DateFilter } from "@/hooks/useDateFilter";
import { buildDateFilterParams } from "@/lib/buildDateFilterParams";



//Get Revenue Stats API
export const RevenueStatsApi = async (filter: DateFilter) => {

    const params = new URLSearchParams(buildDateFilterParams(filter));

    return await CommonApi("GET", `/dashboard/analytics/revenue-stats/?${params}`, "", "");

}