import { createClient } from "@/utils/supabase/server";

export default async function getTodos() {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    console.log({ user });
    if (userError || !user) {
        throw new Error("User is unauthorized");
    }

    const { data, error } = await supabase.from("todos")
        .select(`*, author:created_by(*)`);

    if (error) {
        throw error;
    }
    return data;
}
