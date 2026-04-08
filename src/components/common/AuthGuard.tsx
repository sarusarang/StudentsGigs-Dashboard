import { Navigate, Outlet } from "react-router-dom";



export function AuthGuard() {

  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;

}



export function GuestGuard() {

  const token = localStorage.getItem("access_token");


  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  
  return <Outlet />;

}
