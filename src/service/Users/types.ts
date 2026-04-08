

// Employee Types
export interface Employee {

    name: string;
    job_title: string;
    profile_photo: string | null;
    plan: "free" | "standard" | "premium";
    plan_amount: number
    contact: string;
    created_date: string;
    status: "Active" | "Deactivate";

}


export interface EmployeeDashboardResponse {

    count: number;
    next: string | null;
    previous: string | null;
    total_pages: number;
    current_page: number;
    results: Employee[];

}


// Employer Types
export interface Employer {

    company_name: string | null;
    logo: string | null;
    plan: "free" | "standard" | "premium";
    plan_amount: number
    contact: string;
    created_at: string;
    status: "Active" | "Deactivate";

}

export interface EmployerDashboardResponse {

    count: number;
    next: string | null;
    previous: string | null;
    total_pages: number;
    current_page: number;
    results: Employer[];

}




// User Stats Types
export interface UserStatsResponse {

    employee_count: number;
    employer_count: number;
    premium_plans: number;
    standard_plans: number;
    free_plns: number;

}