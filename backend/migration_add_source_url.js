import 'dotenv/config';
import { supabase } from './src/config/supabase.js';

async function addSourceUrlColumn() {
    console.log('🔌 Connecting to Supabase...');

    const sql = `
    ALTER TABLE epanen_articles 
    ADD COLUMN IF NOT EXISTS source_url TEXT;
  `;

    const { error } = await supabase.rpc('exec_sql', { sql });

    if (error) {
        console.error('❌ Failed to add source_url column:', error);

        // Fallback: Try to use direct SQL via loop if RPC fails (though RPC exec_sql is standard here)
        // Or just inform the user to run it manually.
        console.log('You might need to run this SQL in Supabase Dashboard:');
        console.log(sql);
    } else {
        console.log('✅ Successfully added source_url column to epanen_articles');
    }
}

addSourceUrlColumn();
