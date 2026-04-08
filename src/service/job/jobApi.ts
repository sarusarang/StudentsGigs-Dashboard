import { CommonApi } from "@/lib/CommonApi";
import { type DateFilter } from "@/hooks/useDateFilter";
import { buildDateFilterParams } from "@/lib/buildDateFilterParams";



//Get Job Stats API
export const JobStatsApi = async (filter: DateFilter) => {

    const params = new URLSearchParams(buildDateFilterParams(filter));

    return await CommonApi("GET", `/dashboard/analytics/job-stats/?${params}`, "", "");

}



//Get Job Category Graph API
export const JobCategoryGraphApi = async (filter: DateFilter) => {

    const params = new URLSearchParams(buildDateFilterParams(filter));

    return await CommonApi("GET", `/dashboard/analytics/job-categories/?${params}`, "", "");

}




//Get Online Jobs API
export const OnlineJobsApi = async (filter: DateFilter, page: number, search: string) => {

    const params = new URLSearchParams({ ...buildDateFilterParams(filter), page: page.toString() });
    if (search) params.append("search", search);

    return await CommonApi("GET", `/dashboard/analytics/online-job-analytics/?${params}`, "", "");

}




//Get Offline Jobs API
export const OfflineJobsApi = async (filter: DateFilter, page: number, search: string) => {

    const params = new URLSearchParams({ ...buildDateFilterParams(filter), page: page.toString() });
    if (search) params.append("search", search);

    return await CommonApi("GET", `/dashboard/analytics/offline-job-analytics/?${params}`, "", "");

}