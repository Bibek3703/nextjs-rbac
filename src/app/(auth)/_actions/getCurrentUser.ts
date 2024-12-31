import { capitalize } from "@/utils/string";
import { createClient } from "@/utils/supabase/server";
import { jwtDecode, JwtPayload } from "jwt-decode";

export async function getUserSession() {
    const supabase = await createClient();
    return await supabase.auth.getSession();
}

export function getUserAppRole(token: string | undefined) {
    if (!token) return null;
    const jwt = jwtDecode(token) as JwtPayload & {
        user_role: string;
    };
    if (jwt?.user_role) {
        const role = capitalize(jwt.user_role);
        return role;
    }
    return null;
}
