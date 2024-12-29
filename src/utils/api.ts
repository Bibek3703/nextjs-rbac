import { Filters } from "@/types";

export function createSearchParams<T>(params: Filters<T>): URLSearchParams {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            if (Array.isArray(value) && key !== "columns") {
                value.forEach((item) =>
                    searchParams.append(key, item.toString())
                );
            } else {
                searchParams.append(key, value.toString());
            }
        }
    });

    return searchParams;
}

// Simple conversion
export function searchParamsToObject(searchParams: URLSearchParams) {
    const params: Record<string, any> = {};

    searchParams.forEach((value, key) => {
        params[key] = value;
    });

    return params;
}
