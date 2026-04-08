import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { JobCategoryGraphApi, JobStatsApi, OnlineJobsApi, OfflineJobsApi } from "./jobApi";
import { JobStatsType, CategoryStatsResponse , JobAnalyticsResponse } from "./types";
import { type DateFilter } from "@/hooks/useDateFilter";




// Hook to Get Job Stats
export const useGetJobStats = (filter: DateFilter) => {

    return useQuery<JobStatsType>({

        queryKey: ["jobStats", filter],

        queryFn: async () => {
            return await JobStatsApi(filter) as JobStatsType;
        },

        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
        retry: 1,

    })

}


// Hook to Get Job Category Graph
export const useGetJobCategoryGraph = (filter: DateFilter) => {

    return useQuery<CategoryStatsResponse>({

        queryKey: ["jobCategoryGraph", filter],

        queryFn: async () => {
            return await JobCategoryGraphApi(filter) as CategoryStatsResponse;
        },

        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
        retry: 1,

    })

}




// Hook to Get Online Jobs
export const useGetOnlineJobs = (filter: DateFilter, page: number, search: string) => {

    return useQuery<JobAnalyticsResponse>({

        queryKey: ["onlineJobs", filter, page, search],

        queryFn: async () => {
            return await OnlineJobsApi(filter, page, search) as JobAnalyticsResponse;
        },

        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
        placeholderData: keepPreviousData,

    })

}



// Hook to Get Offline Jobs
export const useGetOfflineJobs = (filter: DateFilter, page: number, search: string) => {

    return useQuery<JobAnalyticsResponse>({

        queryKey: ["offlineJobs", filter, page, search],

        queryFn: async () => {
            return await OfflineJobsApi(filter, page, search) as JobAnalyticsResponse;
        },

        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
        placeholderData: keepPreviousData,

    })

}