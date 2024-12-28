"use client";

import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CopyIcon, MoreHorizontal, Trash2Icon, ViewIcon } from "lucide-react";
import { Todo } from "@/types/todo";
import useTodos from "@/hooks/use-todos";

export default function ActionsMenu({ data }: { data: Todo }) {
    const { deleteTodo } = useTodos();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    className="flex items-center gap-1"
                    onClick={() => navigator.clipboard.writeText(data.id)}
                >
                    <CopyIcon />
                    Copy todo ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="flex items-center gap-1 text-destructive"
                    onClick={() => deleteTodo(data.id)}
                >
                    <Trash2Icon />
                    Delete todo
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-1">
                    <ViewIcon />
                    View todo details
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
