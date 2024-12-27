import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";
import getTodos from "./_actions/getTodos";

export async function GET(request: NextRequest) {
    return getTodos();
}
