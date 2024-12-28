"use client";

import { DataTable } from "@/components/table";
import React from "react";
import { columns } from "./columns";
import useTodos from "@/hooks/use-todos";
import TablePlacehoder from "@/components/table-placeholder";

export default function TodosTable() {
    const { todos, filters, setFilters, totalRow, isLoading } = useTodos();

    if(isLoading){
        return <TablePlacehoder />
    }

    return (
        <div>
            <DataTable
                data={todos}
                columns={columns}
                filters={filters}
                setFilters={setFilters}
                rowCount={totalRow}
                title="Todos"
                description="List of todos this month"
            />
        </div>
    );
}
