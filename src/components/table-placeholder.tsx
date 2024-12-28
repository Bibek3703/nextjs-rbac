import React from "react";
import { Skeleton } from "./ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

export default function TablePlacehoder() {
    const isMobile = useIsMobile()
    return <div className="border rounded-md p-4 flex flex-col gap-4">
            <div className="space-y-2">
                <Skeleton className="h-5 w-[200px]" />
                <Skeleton className="h-3 w-[250px]" />
            </div>
            <div className="flex flex-col sm:flex-row ism:tems-center gap-4 justify-between">
                <Skeleton className="h-8 w-[250px]" />
                <div className="flex gap-4">
                    <Skeleton className="h-8 w-[80px]" />
                    <Skeleton className="h-8 w-[80px]" />
                </div>
            </div>
            <Skeleton className="h-8 w-full" />
            <div className="grid gric-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {Array.from({length: isMobile ? 4: 12}).map((_,idx) => <Skeleton key={idx} className="col-span-1 h-8" />)}
            </div>
    </div>;
}
