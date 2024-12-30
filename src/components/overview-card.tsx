import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface OverviewCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    description?: string;
    textColor?: string;
}

export default function OverviewCard(
    { title, value, icon: Icon, description, textColor }: OverviewCardProps,
) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium capitalize">
                    {title.toLowerCase()}
                </CardTitle>
                <Icon className={cn("h-6 w-6", textColor)} />
            </CardHeader>
            <CardContent>
                <div className={cn("text-2xl font-bold", textColor)}>
                    {value}
                </div>
                {description && (
                    <p className="text-xs text-muted-foreground">
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
