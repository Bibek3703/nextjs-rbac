"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useTodosOverview() {
    // Query function to fetch todos
    const todosOverviewFetchFn = async () => {
        const response = await fetch(`/api/todos/overview`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(
                responseData?.error || "Failed to fetch todos overview",
            );
        }

        return responseData;
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["todos-overview"],
        queryFn: () => todosOverviewFetchFn(),
        placeholderData: keepPreviousData,
    });

    return {
        overview: data,
        isLoading,
        fetchError: error,
    };
}
