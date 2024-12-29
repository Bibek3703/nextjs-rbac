import { PartialTodo } from "@/types/todo";
import { createClient } from "@/utils/supabase/server";

export default async function addTodo(todo: PartialTodo) {
    const supabase = await createClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        throw new Error("Unauthorized");
    }

    const result = await supabase.from("todos")
        .insert({
            ...todo,
            created_by: user.id,
        })
        .select("id")
        .single();

    return result;
}
