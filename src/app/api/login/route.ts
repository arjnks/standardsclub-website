import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

        if (username === "admin123" && password === "admin123") {
            return NextResponse.json({ success: true, token: "admin_token_secret_123" });
        }

        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
