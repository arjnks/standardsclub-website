import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET() {
    try {
        const { data: team_members, error: tError } = await supabase
            .from('team_members')
            .select('*')
            .order('created_at', { ascending: true });

        const { data: events, error: eError } = await supabase
            .from('events')
            .select('*')
            .order('created_at', { ascending: true });

        if (tError || eError) {
            console.error("Supabase SELECT error:", tError || eError);
            throw new Error("Supabase fetch failed");
        }

        return NextResponse.json({
            teamMembers: team_members.map(m => ({
                id: m.member_id,
                name: m.name,
                role: m.role,
                linkedin: m.linkedin,
                image: m.image,
                imageScale: m.image_scale,
                imagePosition: m.image_position
            })),
            events: events.map(e => ({
                title: e.title,
                date: e.date,
                description: e.description,
                tag: e.tag
            }))
        });
    } catch (error) {
        console.error("Failed to fetch data:", error);
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

        // 1. Delete old data (Using safe dummy conditions to catch everything)
        await supabase.from('team_members').delete().neq('name', 'impossible_name_12345');
        await supabase.from('events').delete().neq('title', 'impossible_event_12345');

        // 2. Insert new team members
        if (data.teamMembers && data.teamMembers.length > 0) {
            const mappedMembers = data.teamMembers.map((m: any) => ({
                member_id: m.id || '',
                name: m.name || '',
                role: m.role || '',
                linkedin: m.linkedin || '',
                image: m.image || '',
                image_scale: m.imageScale ? String(m.imageScale) : '',
                image_position: m.imagePosition ? String(m.imagePosition) : ''
            }));
            const { error: tErr } = await supabase.from('team_members').insert(mappedMembers);
            if (tErr) throw tErr;
        }

        // 3. Insert new events
        if (data.events && data.events.length > 0) {
            const mappedEvents = data.events.map((e: any) => ({
                title: e.title || '',
                date: e.date || '',
                description: e.description || '',
                tag: e.tag || ''
            }));
            const { error: eErr } = await supabase.from('events').insert(mappedEvents);
            if (eErr) throw eErr;
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to write data:", error);
        return NextResponse.json({ error: "Failed to write data" }, { status: 500 });
    }
}
