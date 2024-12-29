"use client";

import VisibilityButton from "@/components/visibility-button";
import useTodos from "@/hooks/use-todos";
import { Visibility } from "@/types/todo";
import React from "react";

export default function TodoVisibility(
    { id, visibility }: { id: string; visibility: Visibility },
) {
    const { updateTodo } = useTodos();

    const handleOnClick = () => {
        updateTodo(id, {
            visibility: visibility === "private" ? "public" : "private",
        });
    };

    return (
        <>
            <VisibilityButton
                visibility={visibility}
                onClick={() => handleOnClick()}
            />
        </>
    );
}
