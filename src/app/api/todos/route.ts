import { NextRequest, NextResponse } from "next/server";
import getTodos from "./_actions/getTodos";
import { Filters } from "@/types";
import { Todo } from "@/types/todo";
import { searchParamsToObject } from "@/utils/api";
import addTodo from "./_actions/addTodo";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const filters: Filters<Todo> = searchParamsToObject(
            new URLSearchParams(searchParams),
        );

        console.log({ filters });

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

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { data, count, error, status, statusText } = await addTodo(body);

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
