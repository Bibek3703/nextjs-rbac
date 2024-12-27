// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type Visibility = "private" | "public";
type TodoStatus = "PROGRESS" | "COMPLETED" | "CANCELLED";

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
