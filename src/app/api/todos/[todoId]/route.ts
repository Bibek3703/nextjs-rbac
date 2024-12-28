import { NextRequest, NextResponse } from "next/server";
import deleteTodo from "../_actions/deleteTodo";
import updateTodo from "../_actions/updateTodo";

export async function DELETE(
    request: NextRequest,
    { params }: { params: { todoId: string } },
) {
    try {
        const { todoId } = await params;

        const { data, error, status, statusText } = await deleteTodo(
            todoId,
        );

        if (error) {
            return NextResponse.json({ error }, { status, statusText });
        }

        return NextResponse.json(data, { status, statusText });
    } catch (error: unknown) {
        // Handle unknown errors
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { todoId: string } },
) {
    try {
        const { todoId } = await params;
        const body = await request.json();

        const { data, error, status, statusText } = await updateTodo(
            todoId,
            body,
        );

        console.log({ data, status, statusText, error });

        if (error && status === 406 && statusText === "Not Acceptable") {
            return NextResponse.json({
                error: "Not authorized to update todos",
            }, {
                status: 403,
                statusText,
            });
        }

        if (error) {
            return NextResponse.json({ error }, { status, statusText });
        }

        return NextResponse.json({ data }, { status, statusText });
    } catch (error: unknown) {
        // Handle unknown errors
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
