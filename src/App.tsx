import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { AuthGuard, GuestGuard } from "@/components/common/AuthGuard";
import PageLoader from "./components/loaders/PageLoader";



// Lazy load all the pages
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardOverview = lazy(() => import("./pages/DashboardOverview"));
const UsersPage = lazy(() => import("./pages/UsersPage"));
const JobPostingsPage = lazy(() => import("./pages/JobPostingsPage"));
const RevenuePage = lazy(() => import("./pages/RevenuePage"));
const NotFound = lazy(() => import("./pages/NotFound"));




const App = () => (


  <Suspense fallback={<PageLoader title="Loading..." message="Getting things ready..." />}>

    <Toaster />

    <Sonner />

    <Routes>

      <Route element={<GuestGuard />}>

        <Route path="/" element={<LoginPage />} />

      </Route>

      <Route element={<AuthGuard />}>

        <Route path="/dashboard" element={<DashboardOverview />} />
        <Route path="/dashboard/users" element={<UsersPage />} />
        <Route path="/dashboard/jobs" element={<JobPostingsPage />} />
        <Route path="/dashboard/revenue" element={<RevenuePage />} />

      </Route>

      <Route path="*" element={<NotFound />} />

    </Routes>


  </Suspense>



);

export default App;
