import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    console.log("Proxy: Received claim request");

    let body;
    try {
        body = await request.json();
        console.log("Proxy: Request body:", body);
    } catch (e) {
        console.error("Proxy: Failed to parse request body", e);
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const apiKey = (process.env.Q_API_KEY as string || "").trim();
    // const apiKey = "6ece41f867d1956740303cb69af21b36abd355d563903207ed1d2bfedaa20715"; // Hardcoded for debugging
    const apiUrl = process.env.Q_API_URL;

    console.log("Proxy: API Key defined:", !!apiKey);
    console.log("Proxy: Masked API Key:", apiKey.substring(0, 4) + "..." + apiKey.substring(apiKey.length - 4));
    console.log("Proxy: API URL:", apiUrl);

    // Get Authorization header from the incoming request
    const authHeader = request.headers.get("Authorization");
    console.log("Proxy: Auth header present:", !!authHeader);
    if (authHeader) {
        console.log("Proxy: Auth header start:", authHeader.substring(0, 10) + "...");
        console.log("Proxy: Auth header length:", authHeader.length);
    }

    if (!authHeader) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        console.log(`Proxy: Forwarding to ${apiUrl}/gifts/claim`);
        const response = await fetch(`${apiUrl}/gifts/claim`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
                "Authorization": authHeader,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        console.log("Proxy: External API response status:", response.status);
        console.log("Proxy: External API response body:", data);

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error("Claim proxy error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
