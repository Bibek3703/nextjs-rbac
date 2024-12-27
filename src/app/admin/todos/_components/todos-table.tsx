"use client";

import getTodos from "@/app/api/todos/_actions/getTodos";
import { DataTable } from "@/components/table";
import { Todo } from "@/types/todo";
import React, { useEffect, useState } from "react";
import { columns } from "./columns";

export default function TodosTable() {
    const [todos, setTodos] = useState<Todo[]>([]);

    const fetchTodos = async () => {
        const response = await getTodos();
        if (response.data) {
            setTodos(response.data);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div>
            <DataTable data={todos} columns={columns} />
        </div>
    );
}
