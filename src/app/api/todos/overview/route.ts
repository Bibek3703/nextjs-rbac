import { NextResponse } from "next/server";
import { getTodosMonthlyStatistic } from "../_actions/getTodosMonthlyStatistic";

export async function GET() {
    try {
        const data = await getTodosMonthlyStatistic();

        return NextResponse.json(data, { status: 200 });
    } catch (error: unknown) {
        // Handle unknown errors
        return NextResponse.json(
            {
                error: error instanceof Error
                    ? error?.message
                    : "Internal Server Error",
            },
            { status: 500 },
        );
    }
}
