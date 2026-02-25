import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src/data/websiteData.json");

export async function GET() {
    try {
        const fileContents = fs.readFileSync(DATA_FILE, "utf8");
        return NextResponse.json(JSON.parse(fileContents));
    } catch (error) {
        return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        if (authHeader !== "Bearer admin_token_secret_123") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to write data" }, { status: 500 });
    }
}
