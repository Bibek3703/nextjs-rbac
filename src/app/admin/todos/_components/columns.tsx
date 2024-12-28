import { ColumnDef } from "@tanstack/react-table";
import { Todo, Visibility } from "@/types/todo";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import ActionsMenu from "./actions-menu";
import TodoVisibility from "./todo-visibility";

export const columns: ColumnDef<Todo>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="p-0 hover:bg-transparent"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
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
            const visibility: Visibility = row.getValue("visibility");
            const data: Todo = row.original;
            return (
                <div className="text-xs flex justify-center">
                    <TodoVisibility id={data.id} visibility={visibility} />
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const data = row.original;
            return <ActionsMenu data={data} />;
        },
    },
];
