"use client";

import { Filters } from "@/types";
import { PartialTodo, Todo } from "@/types/todo";
import { createSearchParams } from "@/utils/api";
import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function useTodos() {
    const queryClient = useQueryClient();

    const [filters, setFilters] = useState<Filters<Todo>>({
        pageIndex: 0,
        pageSize: 5,
        columns: "title"
    });

    // Query function to fetch todos
    const todosFetchFn = async (filters: Filters<Todo>) => {
        const searchQueries = createSearchParams(filters);
        const response = await fetch(`/api/todos?${searchQueries}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData?.error || "Failed to fetch todos");
        }
        return responseData;
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["todos", { ...filters }],
        queryFn: () => todosFetchFn(filters),
        placeholderData: keepPreviousData,
    });

    // Mutation function to delete todo
    const todoDeleteFn = async (id: string) => {
        const response = await fetch(`/api/todos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData?.error || "Failed to delete todo");
        }
        return responseData;
    };

    const deleteMutation = useMutation({
        mutationFn: todoDeleteFn,
        onSuccess: () => {
            toast.success("Todo deleted successfully");
            queryClient.invalidateQueries({
                queryKey: ["todos", filters],
            });
        },
        onError: (error) => {
            toast.error(error?.message || "Failed to delete todo");
        },
    });

    // Mutation function to update todo
    const todoUpdateFn = async (
        { id, data }: { id: string; data: PartialTodo },
    ) => {
        const response = await fetch(`/api/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData?.error || "Failed to update todo");
        }
        return responseData;
    };

    const updateMutation = useMutation({
        mutationFn: todoUpdateFn,
        onSuccess: () => {
            toast.success("Todo updated successfully");
            queryClient.invalidateQueries({
                queryKey: ["todos", filters],
            });
        },
        onError: (error) => {
            toast.error(error?.message || "Failed to update todo");
        },
    });

    const deleteTodo = (id: string) => {
        deleteMutation.mutate(id);
    };

    const updateTodo = (id: string, data: PartialTodo) => {
        updateMutation.mutate({ id, data });
    };

    return {
        todos: data?.todos ?? [],
        totalRow: data?.totalRow ?? 0,
        setFilters,
        deleteTodo,
        updateTodo,
        isLoading,
        filters,
        fetchError: error,
        deleteError: deleteMutation.error,
        updateError: updateMutation.error,
    };
}
