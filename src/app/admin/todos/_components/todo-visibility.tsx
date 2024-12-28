"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import VisibilityButton from "@/components/visibility-button";
import useTodos from "@/hooks/use-todos";
import { Visibility } from "@/types/todo";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TodoVisibility(
    { id, visibility }: { id: string; visibility: Visibility },
) {
    const { updateTodo, updateError } = useTodos();

    useEffect(() => {
        if (updateError) {
            toast.error(updateError.message);
        }
    }, [updateError]);

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
