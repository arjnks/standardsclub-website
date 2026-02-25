const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envFile = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf8');
envFile.split('\n').forEach(line => {
    const [key, val] = line.split('=');
    if (key && val) process.env[key.trim()] = val.trim();
});

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function sync() {
    console.log("Reading local data...");
    const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/data/websiteData.json"), "utf8"));

    console.log("Clearing old Supabase data...");
    await s.from('team_members').delete().neq('name', 'impossible_name_12345');
    await s.from('events').delete().neq('title', 'impossible_event_12345');

    console.log("Pushing fresh data to Supabase...");
    const mappedMembers = data.teamMembers.map(m => ({
        member_id: m.id || '',
        name: m.name || '',
        role: m.role || '',
        linkedin: m.linkedin || '',
        image: m.image || '',
        image_scale: m.imageScale ? String(m.imageScale) : '',
        image_position: m.imagePosition ? String(m.imagePosition) : ''
    }));
    const { error: tErr } = await s.from('team_members').insert(mappedMembers);
    if (tErr) console.error("Error inserting members:", tErr);

    const mappedEvents = data.events.map(e => ({
        title: e.title || '',
        date: e.date || '',
        description: e.description || '',
        tag: e.tag || ''
    }));
    const { error: eErr } = await s.from('events').insert(mappedEvents);
    if (eErr) console.error("Error inserting events:", eErr);

    console.log("Sync Complete!");
}
sync();
