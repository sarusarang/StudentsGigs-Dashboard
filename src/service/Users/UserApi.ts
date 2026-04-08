import { CommonApi } from "@/lib/CommonApi";
import { type DateFilter } from "@/hooks/useDateFilter";
import { buildDateFilterParams } from "@/lib/buildDateFilterParams";



//Get Employee Data API
export const EmployeeDataApi = async (filter: DateFilter, page: number, search: string) => {

    const params = new URLSearchParams({ ...buildDateFilterParams(filter), page: page.toString() });
    if (search) params.append("search", search);

    return await CommonApi("GET", `/dashboard/analytics/employee-dashboard/?${params}`, "", "");

}



//Get Employer Data API
export const EmployerDataApi = async (filter: DateFilter, page: number, search: string) => {

    const params = new URLSearchParams({ ...buildDateFilterParams(filter), page: page.toString() });
    if (search) params.append("search", search);

    return await CommonApi("GET", `/dashboard/analytics/employer-dashboard/?${params}`, "", "");

}



//Get User Stats API
export const UserStatsApi = async (filter: DateFilter) => {

    const params = new URLSearchParams(buildDateFilterParams(filter));

    return await CommonApi("GET", `/dashboard/analytics/employee-employer-stats/?${params}`, "", "");

}