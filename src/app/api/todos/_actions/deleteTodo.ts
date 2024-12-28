"use server";

import { createClient } from "@/utils/supabase/server";

export default async function deleteTodo(id: string) {
    if (!id) throw new Error("Todo ID is required");

    const supabase = await createClient();

    const result = await supabase.from("todos")
        .delete().eq("id", id).select("id");

    return result;
}
