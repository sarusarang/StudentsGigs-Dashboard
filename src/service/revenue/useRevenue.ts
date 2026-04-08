import { useQuery } from "@tanstack/react-query";
import { RevenueStatsResponse } from "./types";
import { RevenueStatsApi } from "./revenueApi";
import { type DateFilter } from "@/hooks/useDateFilter";




// Hook to Get Revenue Stats
export const useGetRevenueStats = (filter: DateFilter) => {

    return useQuery<RevenueStatsResponse>({

        queryKey: ["revenueStats", filter],

        queryFn: async () => {
            return await RevenueStatsApi(filter) as RevenueStatsResponse;
        },

        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
        retry: 1,

    })

}