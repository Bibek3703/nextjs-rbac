import React from "react";
import DashboardOverview from "./_components/dashboard-card";

export default function Dashboard() {
    return (
        <div className="flex flex-col w-full gap-4 min-h-full">
            <DashboardOverview />
            <div className="flex-1 rounded-xl bg-muted/50 md:min-h-max" />
        </div>
    );
}
