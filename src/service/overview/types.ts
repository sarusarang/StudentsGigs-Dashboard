

// Types for dashboard Overview Data
export type PlanType = "free" | "standard" | "premium";



export interface RecentEmployee {
    name: string;
    job_title: string;
    profile_photo: string | null;
    plan: PlanType;
}



export interface RecentJob {
    job_title: string;
    company: string;
    job_type: "online" | "offline";
    total_application: number;
}



export interface DashboardStatsType {

    total_employees: number;
    total_employers: number;
    total_revenue: number;
    active_jobs: number;
    total_plan: number;

    // percentage values
    premium: number;
    standard: number;
    free: number;

    recent_employees: RecentEmployee[];
    recent_jobs: RecentJob[];
}