import React from "react";
import { todoStatuses } from "@/constants";

export default function Dashboard() {
    return (
        <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                {todoStatuses.map((status, idx) => (
                    <div
                        key={idx}
                        className="aspect-video rounded-xl bg-muted/50 p-3 md:p-4"
                    >
                        <h1 className="text-lg font-semibold capitalize">
                            {status.toLowerCase()}
                        </h1>
                    </div>
                ))}
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </>
    );
}
