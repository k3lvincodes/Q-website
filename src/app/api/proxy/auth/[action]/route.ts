import { NextRequest, NextResponse } from "next/server";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ action: string }> }
) {
    const { action } = await params;
    const validActions = ["register", "login", "verify"];

    if (!validActions.includes(action)) {
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const body = await request.json();
    const apiKey = (process.env.Q_API_KEY) as string;
    const apiUrl = process.env.Q_API_URL;
    // const baseUrl = process.env.Q_AUTH_API_URL; // Deprecated or redundant if using Q_API_URL/auth

    try {
        const response = await fetch(`${apiUrl}/auth/${action}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
