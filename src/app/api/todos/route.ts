import { NextRequest, NextResponse } from "next/server";
import getTodos from "./_actions/getTodos";

export async function GET(request: NextRequest) {
    const { data, error, status, statusText } = await getTodos();

    if (error) {
        return NextResponse.json({ error }, { status, statusText });
    }

    return NextResponse.json({ data }, { status, statusText });
}
