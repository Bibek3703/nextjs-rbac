"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { AddTodoForm } from "./add-todo-form";

export default function TodoHeaderActions() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex items-center gap-4">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="default"
                        className="h-auto w-auto p-1.5 px-4"
                    >
                        Add Todo
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>New Todo</DialogTitle>
                        <DialogDescription>
                            Add new todo information
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <AddTodoForm setOpen={setOpen} />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
