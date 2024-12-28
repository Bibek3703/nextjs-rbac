"use server";

import { PartialTodo } from "@/types/todo";
import { createClient } from "@/utils/supabase/server";

export default async function updateTodo(id: string, todoData: PartialTodo) {
    if (!id) throw new Error("Todo ID is required");

    const supabase = await createClient();

    const result = await supabase
        .from("todos")
        .update({ ...todoData })
        .eq("id", id)
        .select(`*, author:created_by(*)`)
        .single();

    return result;
}
