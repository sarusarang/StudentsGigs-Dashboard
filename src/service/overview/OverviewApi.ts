import { CommonApi } from "@/lib/CommonApi";
import { type DateFilter } from "@/hooks/useDateFilter";
import { buildDateFilterParams } from "@/lib/buildDateFilterParams";



//Get Dashboard Overview API
export const DashboardOverviewApi = async (filter: DateFilter) => {

    const params = new URLSearchParams(buildDateFilterParams(filter));

    return await CommonApi("GET", `/dashboard/analytics/?${params}`, "", "");

}
