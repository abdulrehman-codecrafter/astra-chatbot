import { AppSidebar } from "@/components/app-sidebar";
import Providers from "@/app/providers";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Layout({ children }) {
    return (
        <Providers>
            <SidebarProvider
                style={{
                    "--sidebar-width": "19rem",
                }}
            >
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1 cursor-pointer" />
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 max-h-[90vh] overflow-y-auto">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </Providers>
    );
}
