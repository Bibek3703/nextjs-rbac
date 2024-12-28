import { NextRequest, NextResponse } from "next/server";
import getTodos from "./_actions/getTodos";
import { Filters } from "@/types";
import { Todo } from "@/types/todo";
import { searchParamsToObject } from "@/utils/api";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const filters: Filters<Todo> = searchParamsToObject(
            new URLSearchParams(searchParams),
        );

        const { data, count, error, status, statusText } = await getTodos(
            filters,
        );

        if (error) {
            return NextResponse.json(error, { status, statusText });
        }

        if (error && statusText) {
            return NextResponse.json(error, { status, statusText });
        }

        return NextResponse.json({ todos: data, totalRow: count }, {
            status,
            statusText,
        });
    } catch (error: unknown) {
        // Handle unknown errors
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
