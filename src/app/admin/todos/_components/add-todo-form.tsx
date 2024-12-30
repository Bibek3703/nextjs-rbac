"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { todoFormSchema, todoFormValues } from "@/types/todo";
import useTodos from "@/hooks/use-todos";
import { CircleXIcon, SaveIcon } from "lucide-react";

export function AddTodoForm(
    { setOpen = () => {} }: { setOpen: (open: boolean) => void },
) {
    const { addTodo } = useTodos();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<todoFormValues>({
        resolver: zodResolver(todoFormSchema),
        defaultValues: {
            title: "",
            description: "",
            status: "PROGRESS",
            visibility: "public",
        },
    });

    async function onSubmit(values: todoFormValues) {
        setIsSubmitting(true);
        await addTodo(values);
        setIsSubmitting(false);
        setOpen(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter todo title"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                The title of your todo item.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter todo description"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                A detailed description of your todo item.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="PROGRESS">
                                        In Progress
                                    </SelectItem>
                                    <SelectItem value="COMPLETED">
                                        Completed
                                    </SelectItem>
                                    <SelectItem value="CANCELLED">
                                        Cancelled
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                The current status of your todo item.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="visibility"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Visibility</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select visibility" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="public">
                                        Public
                                    </SelectItem>
                                    <SelectItem value="private">
                                        Private
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Choose who can see this todo item.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="w-full flex justify-between items-center pt-4">
                    <Button
                        type="button"
                        variant="destructive"
                        className="h-auto"
                        onClick={() => setOpen(false)}
                    >
                        <CircleXIcon />
                        <span>Close</span>
                    </Button>
                    <Button
                        type="submit"
                        className="h-auto"
                        disabled={isSubmitting}
                    >
                        <SaveIcon />
                        <span>{isSubmitting ? "Adding..." : "Add Todo"}</span>
                    </Button>
                </div>
            </form>
        </Form>
    );
}
