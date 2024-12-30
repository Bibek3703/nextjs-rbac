import { TodoStatus } from "@/types/todo";
import { createClient } from "@/utils/supabase/server";

interface MonthlyStats {
    [key: string]: {
        PROGRESS: number;
        COMPLETED: number;
        CANCELLED: number;
    };
}

export async function getTodosMonthlyStatistic() {
    const supabase = await createClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (!user || error) {
        throw new Error("Unauthorized");
    }

    const { data, error: todosError } = await supabase
        .from("todos")
        .select("created_at, status")
        .eq("created_by", user.id)
        .order("created_at", { ascending: true });

    if (todosError) {
        console.error("Error fetching todos:", error);
        return new Response(JSON.stringify({ error: todosError.message }), {
            headers: { "Content-Type": "application/json" },
            status: 400,
        });
    }

    const monthlyStats = data.reduce((acc: MonthlyStats, todo: {
        created_at: string;
        status: TodoStatus;
    }) => {
        const date = new Date(todo.created_at);
        const monthKey = `${date.getFullYear()}-${
            String(date.getMonth() + 1).padStart(2, "0")
        }`;

        if (!acc[monthKey]) {
            acc[monthKey] = { PROGRESS: 0, COMPLETED: 0, CANCELLED: 0 };
        }
        acc[monthKey][todo.status]++;
        return acc;
    }, {} as MonthlyStats);

    const sortedMonths = Object.keys(monthlyStats).sort();
    const trends = sortedMonths.map((month, index) => {
        const stats = monthlyStats[month];
        const prevMonth = index > 0
            ? monthlyStats[sortedMonths[index - 1]]
            : null;

        const calculateTrend = (current: number, previous: number) => {
            if (!previous) return "N/A";
            const change = ((current - previous) / previous) * 100;
            return change.toFixed(2) + "%";
        };

        return {
            month,
            PROGRESS: stats.PROGRESS,
            COMPLETED: stats.COMPLETED,
            CANCELLED: stats.CANCELLED,
            PROGRESS_trend: calculateTrend(
                stats.PROGRESS,
                prevMonth?.PROGRESS || 0,
            ),
            COMPLETED_trend: calculateTrend(
                stats.COMPLETED,
                prevMonth?.COMPLETED || 0,
            ),
            CANCELLED_trend: calculateTrend(
                stats.CANCELLED,
                prevMonth?.CANCELLED || 0,
            ),
        };
    });
    return trends[0];
}
