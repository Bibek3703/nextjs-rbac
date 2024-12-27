import getTodos from "@/app/api/todos/_actions/getTodos";
import React from "react";

export default async function Todos() {
    const response = await getTodos();
    console.log({ response });
    return <div>Todos</div>;
}
