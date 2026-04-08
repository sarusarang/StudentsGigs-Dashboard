import { useQuery } from "@tanstack/react-query";
import { DashboardOverviewApi } from "./OverviewApi";
import { DashboardStatsType } from "./types";
import { type DateFilter } from "@/hooks/useDateFilter";




// Hook to Get Dashboard Overview
export const useGetDashboardOverview = (filter: DateFilter) => {

    return useQuery<DashboardStatsType>({

        queryKey: ["dashboardOverview", filter],

        queryFn: async () => {
            return await DashboardOverviewApi(filter) as DashboardStatsType;
        },

        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
        retry: 1,

    })

}