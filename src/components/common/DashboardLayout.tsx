import { ReactNode } from "react";
import { useTheme } from "@/hooks/useTheme";
import { AppSidebar } from "@/components/common/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Moon, Sun, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";




// Dashboard Layout
interface DashboardLayoutProps {

  children: ReactNode;

}



export function DashboardLayout({ children }: DashboardLayoutProps) {


  // Theme Toggle
  const { theme, toggleTheme } = useTheme();


  // Navigate
  const navigate = useNavigate();


  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };



  return (


    <SidebarProvider>

      <div className="min-h-screen flex w-full">

        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0">

          <header className="h-16 flex items-center justify-between border-b border-border bg-card/50 backdrop-blur-sm px-4 md:px-6 sticky top-0 z-30">

            <div className="flex items-center gap-3">

              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

              <div className="hidden md:flex relative">
                <h1 className="text-xl font-bold">Admin Portal</h1>
              </div>

            </div>


            <div className="flex items-center gap-2">

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-foreground hover:bg-accent"
              >

                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}

              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 hover:bg-red-500/10 ml-1"
                title="Logout"
              >

                <LogOut className="h-5 w-5" />

              </Button>

              <div className="h-9 w-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm ml-2">
                A
              </div>

            </div>

          </header>

          <main className="flex-1 p-4 md:p-6 overflow-auto">
          
            {children}

          </main>

        </div>

      </div>

    </SidebarProvider>

  );

}
