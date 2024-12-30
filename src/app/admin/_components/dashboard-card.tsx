"use client";

import OverviewCard from "@/components/overview-card";
import { todoStatuses } from "@/constants";
import useTodosOverview from "@/hooks/use-todos-overview";
import { CircleCheckBig, CircleOff, Loader, SquareDashed } from "lucide-react";
import React from "react";

export default function DashboardOverview() {
    const { overview, isLoading } = useTodosOverview();

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "PROGRESS":
                return Loader;
            case "COMPLETED":
                return CircleCheckBig;
            case "CANCELLED":
                return CircleOff;
            default:
                return SquareDashed;
        }
    };

    const getStatusTextColor = (status: string) => {
        switch (status) {
            case "PROGRESS":
                return "text-blue-500";
            case "COMPLETED":
                return "text-green-500";
            case "CANCELLED":
                return "text-destructive";
            default:
                return "text-muted-foreground";
        }
    };

    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {todoStatuses.map((status, idx) =>
                isLoading
                    ? (
                        <div
                            key={idx}
                            className="rounded-xl bg-muted/50 h-32"
                        >
                        </div>
                    )
                    : (
                        <OverviewCard
                            key={idx}
                            title={`${status} todos`}
                            value={overview[status]}
                            icon={getStatusIcon(status)}
                            textColor={getStatusTextColor(status)}
                            description={overview[`${status}_trend`] !== "N/A"
                                ? `+${
                                    overview[`${status}_trend`]
                                }% from last month`
                                : ""}
                        />
                    )
            )}
        </div>
    );
}
