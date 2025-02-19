import React, { ReactNode } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppTopBar from "./_components/app-topbar";
import { AppSidebar } from "./_components/app-sidebar";

export default function AdminLayout(
    { children }: { children: ReactNode },
) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppTopBar />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
