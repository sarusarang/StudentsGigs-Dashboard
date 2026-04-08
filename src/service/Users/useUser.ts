import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { EmployeeDashboardResponse, EmployerDashboardResponse, UserStatsResponse } from "./types";
import { EmployeeDataApi, EmployerDataApi, UserStatsApi } from "./UserApi";
import { type DateFilter } from "@/hooks/useDateFilter";



// Hook to Get Employee Data
export const useGetEmployeeData = (filter: DateFilter, page: number, search: string) => {

    return useQuery<EmployeeDashboardResponse>({

        queryKey: ["employeeData", filter, page, search],

        queryFn: async () => {
            return await EmployeeDataApi(filter, page, search) as EmployeeDashboardResponse;
        },

        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
        placeholderData: keepPreviousData,

    })

}



// Hook to Get Employer Data
export const useGetEmployerData = (filter: DateFilter, page: number, search: string) => {

    return useQuery<EmployerDashboardResponse>({

        queryKey: ["employerData", filter, page, search],

        queryFn: async () => {
            return await EmployerDataApi(filter, page, search) as EmployerDashboardResponse;
        },

        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
        placeholderData: keepPreviousData,

    })

}



// Hook to Get User Stats
export const useGetUserStats = (filter: DateFilter) => {

    return useQuery<UserStatsResponse>({

        queryKey: ["userStats", filter],

        queryFn: async () => {
            return await UserStatsApi(filter) as UserStatsResponse;
        },

        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,

    })

}