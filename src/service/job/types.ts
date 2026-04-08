

// Job stats
export interface JobStatsType {

  total_jobs_count: number;
  online_jobs_count: number;
  offline_jobs_count: number;
  total_applications_count: number;

}


// Category Types
export type CategoryStats = {
  category: string;
  count: number;
};


export type CategoryStatsResponse = CategoryStats[];



// Online and offline Job Types
export type JobAnalyticsItem = {
  job_title: string;
  company: string;
  job_type: "online" | "offline";
  total_application: number;
  contact: string;
};



export type JobAnalyticsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  total_pages: number;
  current_page: number;
  results: JobAnalyticsItem[];
};