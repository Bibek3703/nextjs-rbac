import { z } from "zod"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
const visibilities = ["private", "public"] as const
export type Visibility = typeof visibilities[number];
const statuses = ["PROGRESS", "COMPLETED", "CANCELLED"] as const
export type TodoStatus = typeof statuses[number];

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

const todoFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(statuses),
  visibility: z.enum(visibilities),
})

export type todoFormValues = z.infer<typeof todoFormSchema>;
