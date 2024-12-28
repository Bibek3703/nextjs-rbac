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

export default function useTodos() {
    const queryClient = useQueryClient();

    const [filters, setFilters] = useState<Filters<Todo>>({
        pageIndex: 0,
        pageSize: 5,
    });

    const todosFetchFn = async (filters: Filters<Todo>) => {
        const searchQueries = createSearchParams(filters);
        const response = await fetch(`/api/todos?${searchQueries}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to delete the todo");
        }
        return response.json();
    };

    const { data, isFetching, isLoading, error } = useQuery({
        queryKey: ["todos", { ...filters }],
        queryFn: () => todosFetchFn(filters),
        placeholderData: keepPreviousData,
    });

    const todoDeleteFn = async (id: string) => {
        const response = await fetch(`/api/todos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error("Failed to delete the todo");
        }
        return response.json();
    };

    const deleteMutation = useMutation({
        mutationFn: todoDeleteFn,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos", filters],
            });
        },
    });

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
        return response.json();
    };

    const updateMutation = useMutation({
        mutationFn: todoUpdateFn,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos", filters],
            });
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
        isLoading: isFetching || isLoading,
        filters,
        fetchError: error,
        deleteError: deleteMutation.error,
        updateError: updateMutation.error,
    };
}
