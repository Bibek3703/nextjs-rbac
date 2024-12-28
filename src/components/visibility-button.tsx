import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Visibility } from "@/types/todo";
import { Eye, EyeOff } from "lucide-react";
import React from "react";

export default function VisibilityButton(
    {
        visibility = "private",
        onClick = () => {},
        className,
    }: {
        visibility: Visibility;
        onClick?: () => void;
        className?: string;
    },
) {
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            className={cn(
                "p-1 h-auto w-auto hover:bg-transparent",
                className,
            )}
        >
            {visibility === "private"
                ? <EyeOff className="w-4" />
                : <Eye className="w-4" />}
        </Button>
    );
}
