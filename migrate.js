const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envFile = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf8');
const envLines = envFile.split('\n');
for (const line of envLines) {
    const [key, val] = line.split('=');
    if (key && val) process.env[key.trim()] = val.trim();
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    const DATA_FILE = path.join(process.cwd(), "src/data/websiteData.json");
    const fileContents = fs.readFileSync(DATA_FILE, "utf8");
    const data = JSON.parse(fileContents);

    console.log('Migrating team members...');
    for (const member of data.teamMembers) {
        const { error } = await supabase.from('team_members').insert({
            member_id: member.id || '',
            name: member.name || '',
            role: member.role || '',
            linkedin: member.linkedin || '',
            image: member.image || '',
            image_scale: member.imageScale || '',
            image_position: member.imagePosition || ''
        });
        if (error) console.error('Error inserting member:', member.name, error);
    }

    console.log('Migrating events...');
    for (const event of data.events) {
        const { error } = await supabase.from('events').insert({
            title: event.title || '',
            date: event.date || '',
            description: event.description || '',
            tag: event.tag || ''
        });
        if (error) console.error('Error inserting event:', event.title, error);
    }

    console.log('Done migrating to Supabase!');
}

run();
