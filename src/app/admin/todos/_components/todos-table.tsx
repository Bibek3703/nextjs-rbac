"use client";

import { DataTable } from "@/components/table";
import React from "react";
import { columns } from "./columns";
import useTodos from "@/hooks/use-todos";

export default function TodosTable() {
    const { todos, filters, setFilters, totalRow } = useTodos();

    return (
        <div>
            <DataTable
                data={todos}
                columns={columns}
                filters={filters}
                setFilters={setFilters}
                rowCount={totalRow}
            />
        </div>
    );
}
