"use server";

import { createClient } from "@/utils/supabase/server";

export default async function getTodos() {
    const supabase = await createClient();

    return await supabase.from("todos")
        .select(`*, author:created_by(*)`);
}
