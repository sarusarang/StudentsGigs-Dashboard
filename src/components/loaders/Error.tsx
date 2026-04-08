import { AlertCircle } from "lucide-react";
import { DashboardLayout } from "../common/DashboardLayout";


export default function Error() {


    return (



        <DashboardLayout>

            <div className="space-y-6">


                <div className="flex flex-col items-center justify-center h-[75vh] space-y-6">

                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 ring-8 ring-destructive/5">
                        <AlertCircle className="h-10 w-10 text-destructive" />
                    </div>

                    <div className="text-center">

                        <h3 className="text-xl font-display font-semibold text-foreground">Failed to load data</h3>

                        <p className="text-muted-foreground mt-2 max-w-md">There was a problem fetching your dashboard analytics. Please try checking your connection or refresh the page.</p>

                        <button
                            onClick={() => window.location.reload()}
                            className="mt-6 rounded-lg bg-primary px-6 py-2.5 font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:ring-4 hover:ring-primary/20"
                        >
                            Refresh Page
                        </button>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );
}