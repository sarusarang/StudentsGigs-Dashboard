import { Loader2 } from "lucide-react";
import { DashboardLayout } from "../common/DashboardLayout";



export default function PageLoader({ message, title }: { message: string, title: string }) {


    return (


        <DashboardLayout>


            <div className="space-y-6">


                <div className="flex flex-col items-center justify-center h-[75vh] space-y-6">

                    <div className="relative">

                        <Loader2 className="h-16 w-16 animate-spin text-primary/80" />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-4 w-4 rounded-full bg-primary animate-pulse" />
                        </div>

                    </div>

                    <div className="text-center">
                        <h3 className="text-xl font-display font-semibold text-foreground">{title}</h3>
                        <p className="text-muted-foreground mt-2">{message}</p>
                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}