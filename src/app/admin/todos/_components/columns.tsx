import { ColumnDef } from "@tanstack/react-table";
import { Todo } from "@/types/todo";
import { Eye, EyeClosed, EyeOff, MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Todo>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "description",
        header: () => (
            <div className="text-right hidden md:flex">
                Description
            </div>
        ),
        cell: ({ row }) => {
            const description: string = row.getValue("description");
            return (
                <p className="text-xs line-clamp-3 hidden md:flex">
                    {description}
                </p>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status: string = row.getValue("status");
            return (
                <div className="text-xs capitalize">
                    {status.toLowerCase()}
                </div>
            );
        },
    },
    {
        accessorKey: "visibility",
        header: () => (
            <div className="text-right flex justify-center">
                Visibility
            </div>
        ),
        cell: ({ row }) => {
            const visibility = row.getValue("visibility");
            return (
                <div className="text-xs flex justify-center">
                    {visibility === "private"
                        ? <EyeOff className="w-4" />
                        : <Eye className="w-4" />}
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original;

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
                            onClick={() =>
                                navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>
                            View payment details
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
