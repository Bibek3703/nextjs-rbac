// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Visibility = "private" | "public";
export type TodoStatus = "PROGRESS" | "COMPLETED" | "CANCELLED";

export type Todo = {
    id: string;
    title: string;
    description: string;
    status: TodoStatus;
    visibility: Visibility;
    created_at?: String;
    created_by?: string;
    updated_at?: string;
};

// Only allow updating specific fields of the Todo
export type PartialTodo = Partial<
    Omit<Todo, "id" | "created_at" | "created_by" | "updated_at">
>;
