import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  DollarSign,

} from "lucide-react";

import { NavLink } from "@/components/common/NavLink";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";





// Main Menu
const mainNav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Employees", url: "/dashboard/users", icon: Users },
  { title: "Employers", url: "/dashboard/users", icon: Building2 },
  { title: "Job Postings", url: "/dashboard/jobs", icon: Briefcase },
  { title: "Revenue", url: "/dashboard/revenue", icon: DollarSign },
];





export function AppSidebar() {


  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;



  return (
  
  
  
  <Sidebar collapsible="icon" className="border-r border-sidebar-border">


      {/* 🔥 HEADER */}
      <SidebarHeader className="py-2 px-3">

        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >

          <div
            className={cn(
              "relative flex items-center justify-center rounded-3xl transition-all duration-300",
              "bg-gradient-to-br from-primary/20 to-primary/5",
              "shadow-lg ",
              collapsed ? "h-14 w-14" : "h-16 w-64"
            )}
          >

            <img
              src={collapsed ? "/Tab-icon.png" : "/Nav-Icon.png"}
              alt="Logo"
              className={cn(
                "object-contain transition-all duration-300",
                collapsed ? "h-8 w-8" : "h-16 w-40"
              )}
            />

          </div>


        </div>


      </SidebarHeader>



      <Separator className="mx-4" />




      {/* 🔥 CONTENT */}
      <SidebarContent className="px-2 pt-4">
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 px-3 mb-2">
              Main Menu
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className={cn(
                      "h-11 rounded-xl transition-all duration-200",
                      collapsed && "justify-center px-0"
                    )}
                  >
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className={cn(
                        "flex items-center w-full",
                        "hover:bg-accent/60",
                        "transition-all duration-200",
                        collapsed ? "justify-center" : "px-3"
                      )}
                      activeClassName="bg-primary text-primary-foreground shadow-md"
                    >
                      <item.icon
                        className={cn(
                          "transition-all",
                          collapsed
                            ? "h-6 w-6"
                            : "h-5 w-5 mr-3"
                        )}
                      />

                      {!collapsed && (
                        <span className="font-medium text-sm">
                          {item.title}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 🔥 FOOTER */}
      <SidebarFooter className="p-4">
        <div
          className={cn(
            "rounded-xl bg-muted/40 border border-border/50 p-3 text-center transition-all",
            collapsed && "p-2"
          )}
        >
          {!collapsed ? (
            <>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} Students Gigs
              </p>
              <p className="text-[10px] text-muted-foreground/60 mt-1">
                v1.0.0
              </p>
            </>
          ) : (
            <div className="text-xs text-muted-foreground">©</div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}