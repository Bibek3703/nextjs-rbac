import React, { useState } from "react";

export default function useTodos() {
    const [todos, setTodos] = useState();

    async function fetchTodos() {
    }

    return {
        todos,
    };
}
