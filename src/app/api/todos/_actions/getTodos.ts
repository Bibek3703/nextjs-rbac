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

    const offset = pageIndex * pageSize;

    let queryBuilder = supabase
        .from("todos")
        .select(`*, author:created_by(*)`, { count: "estimated" })
        .range(offset, offset + pageSize - 1);

    // Apply sorting if specified
    if (sortBy) {
        const [column, order] = sortBy.split(".");
        queryBuilder = queryBuilder.order(column, {
            ascending: order === "asc",
        });
    }

    console.log({ query });

    // Apply search if query and columns are provided
    if (query && columns) {
        const searchColumns = columns.replaceAll(",", "_");
        if (searchColumns) {
            queryBuilder = queryBuilder.textSearch(searchColumns, query);
        }
    }

    const result = await queryBuilder;

    return result;
}
