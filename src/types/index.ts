import { appOAuthProviders, todoStatuses } from "@/constants";

export type SvgProps = {
    size?: number;
    width?: number;
    height?: number;
};

export type ProviderType = typeof appOAuthProviders[number];
export type TodoStatusType = typeof todoStatuses[number];

export type PaginatedData<T> = {
    result: T[];
    rowCount: number;
};

export type PaginationParams = { pageIndex: number; pageSize: number };
export type SortParams = { sortBy?: `${string}.${"asc" | "desc"}` };
export type SearchParams = {
    query?: string;
    columns?: `${string},${string}` | string;
};
export type Filters<T> = Partial<
    T & PaginationParams & SortParams & SearchParams
>;
