import { createClient } from "@/utils/supabase/server";

export default async function getTodos() {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    console.log({ user: user.data.user });
    return user;
}
