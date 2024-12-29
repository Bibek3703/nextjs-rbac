"use server";

import { PAGE_INDEX, PAGE_SIZE } from "@/constants";
import { Filters } from "@/types";
import { Todo } from "@/types/todo";
import { createClient } from "@/utils/supabase/server";

export default async function getTodos(filters?: Filters<Todo>) {
    const supabase = await createClient();

    const {
        pageIndex = PAGE_INDEX,
        pageSize = PAGE_SIZE,
        sortBy,
        query,
        columns,
    } = filters || {};

    let offset = pageIndex * pageSize;

    let queryBuilder = supabase
        .from("todos")
        .select(`*, author:created_by(*)`, { count: "estimated" })
        .order("created_at", { ascending: false });

    // Apply search if query and columns are provided
    if (query && columns) {
        const searchColumns = columns?.replaceAll(",", "_");
        offset = 0;
        if (searchColumns) {
            queryBuilder = queryBuilder.textSearch(
                searchColumns,
                query.toLowerCase(),
            );
        }
    }

    // Apply sorting if specified
    if (sortBy) {
        console.log("sorting");
        const [column, order] = sortBy.split(".");
        queryBuilder = queryBuilder.order(column, {
            ascending: order === "asc",
        });
    }

    queryBuilder = queryBuilder.range(offset, offset + (pageSize - 1));

    const result = await queryBuilder;
    console.log({ offset, pageIndex, pageSize, result: result.data?.length });

    return result;
}
