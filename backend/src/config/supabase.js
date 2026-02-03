// Load .env FIRST before anything else
import 'dotenv/config.js';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('❌ SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY belum diisi di .env!');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const schemas = {
  users: `
    CREATE TABLE IF NOT EXISTS epanen_users (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone TEXT,
      role TEXT DEFAULT 'farmer',
      status TEXT DEFAULT 'active',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `,

  admins: `
    CREATE TABLE IF NOT EXISTS epanen_admins (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      status TEXT DEFAULT 'active',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `,

  chat_sessions: `
    CREATE TABLE IF NOT EXISTS epanen_chat_sessions (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id BIGINT NOT NULL,
      title TEXT DEFAULT 'Pesan Baru',
      context_summary TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      FOREIGN KEY (user_id) REFERENCES epanen_users(id) ON DELETE CASCADE
    )
  `,

  chat_messages: `
    CREATE TABLE IF NOT EXISTS epanen_chat_messages (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      user_id BIGINT NOT NULL,
      session_id UUID,
      role TEXT NOT NULL CHECK(role IN ('user', 'assistant')),
      message TEXT NOT NULL,
      category TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      FOREIGN KEY (user_id) REFERENCES epanen_users(id) ON DELETE CASCADE,
      FOREIGN KEY (session_id) REFERENCES epanen_chat_sessions(id) ON DELETE CASCADE
    )
  `,

  ai_memory: `
    CREATE TABLE IF NOT EXISTS epanen_ai_memory (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      user_id BIGINT NOT NULL,
      key TEXT NOT NULL,
      value TEXT NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      FOREIGN KEY (user_id) REFERENCES epanen_users(id) ON DELETE CASCADE,
      UNIQUE(user_id, key)
    )
  `,

  categories: `
    CREATE TABLE IF NOT EXISTS epanen_categories (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      type TEXT DEFAULT 'article',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `,

  articles: `
    CREATE TABLE IF NOT EXISTS epanen_articles (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content TEXT NOT NULL,
      excerpt TEXT,
      category TEXT,
      author_id BIGINT,
      image TEXT,
      status TEXT DEFAULT 'draft',
      views BIGINT DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `,

  commodity_prices: `
    CREATE TABLE IF NOT EXISTS epanen_commodity_prices (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price DECIMAL(12,2) NOT NULL,
      unit TEXT NOT NULL,
      location TEXT,
      trend TEXT DEFAULT 'stable',
      date DATE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `,

  discussions: `
    CREATE TABLE IF NOT EXISTS epanen_discussions (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      user_id BIGINT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT,
      status TEXT DEFAULT 'active',
      views BIGINT DEFAULT 0,
      is_edited BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      FOREIGN KEY (user_id) REFERENCES epanen_users(id) ON DELETE CASCADE
    )
  `,

  replies: `
    CREATE TABLE IF NOT EXISTS epanen_replies (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      discussion_id BIGINT NOT NULL,
      user_id BIGINT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      FOREIGN KEY (discussion_id) REFERENCES epanen_discussions(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES epanen_users(id) ON DELETE CASCADE
    )
  `,

  activity_logs: `
    CREATE TABLE IF NOT EXISTS epanen_activity_logs (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      user_id BIGINT,
      action TEXT NOT NULL,
      entity_type TEXT,
      entity_id BIGINT,
      details TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `
};

const seedData = {
  categories: [
    { name: 'Budidaya', slug: 'budidaya', type: 'article' },
    { name: 'Hama & Penyakit', slug: 'hama-penyakit', type: 'article' },
    { name: 'Cuaca & Iklim', slug: 'cuaca-iklim', type: 'article' },
    { name: 'Teknologi', slug: 'teknologi', type: 'article' },
    { name: 'Pasar', slug: 'pasar', type: 'discussion' },
    { name: 'Tanya Jawab', slug: 'tanya-jawab', type: 'discussion' }
  ],

  commodityPrices: [
    { name: 'Beras', category: 'Bahan Pokok', price: 14000, unit: 'kg', location: 'Jawa Timur', trend: 'up' },
    { name: 'Jagung', category: 'Bahan Pokok', price: 6500, unit: 'kg', location: 'Jawa Tengah', trend: 'stable' },
    { name: 'Cabai Merah', category: 'Sayuran', price: 45000, unit: 'kg', location: 'Jawa Barat', trend: 'down' },
    { name: 'Bawang Merah', category: 'Sayuran', price: 32000, unit: 'kg', location: 'Jawa Tengah', trend: 'stable' },
    { name: 'Telur Ayam', category: 'Protein', price: 28000, unit: 'kg', location: 'Jawa Timur', trend: 'up' }
  ]
};

async function initializeDatabase() {
  try {
    console.log('🔌 Connecting to Supabase...');

    // Create tables via SQL queries
    for (const [name, schema] of Object.entries(schemas)) {
      const { error } = await supabase.rpc('exec_sql', { sql: schema });
      if (error && !error.message.includes('already exists')) {
        console.log(`Note: ${name} - ${error.message}`);
      }
    }

    // Seed categories
    const { data: existingCats } = await supabase.from('epanen_categories').select('id');
    if (!existingCats || existingCats.length === 0) {
      const { error: catError } = await supabase.from('epanen_categories').insert(seedData.categories);
      if (!catError) console.log('✓ Categories seeded');
    }

    // Seed commodity prices
    const { data: existingPrices } = await supabase.from('epanen_commodity_prices').select('id');
    if (!existingPrices || existingPrices.length === 0) {
      const prices = seedData.commodityPrices.map(p => ({
        ...p,
        date: new Date().toISOString().split('T')[0]
      }));
      const { error: priceError } = await supabase.from('epanen_commodity_prices').insert(prices);
      if (!priceError) console.log('✓ Commodity prices seeded');
    }

    // Create default admin
    const { data: existingAdmin } = await supabase.from('epanen_admins').select('id').eq('username', 'admin').single();
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const { error: adminError } = await supabase.from('epanen_admins').insert({
        username: 'admin',
        email: 'admin@epanen.id',
        password: hashedPassword,
        role: 'admin'
      });
      if (!adminError) console.log('✓ Default admin created (username: admin, password: admin123)');
    }

    console.log('✅ Supabase initialized successfully!');
    return true;
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    console.log('\n💡 Note: You may need to create tables manually in Supabase SQL Editor.');
    console.log('See SUPABASE_SETUP.md for SQL scripts.\n');
    return false;
  }
}

function getDatabase() {
  return supabase;
}

export const supabaseQuery = {
  // Get single record
  async one(table, query = {}) {
    let dbQuery = supabase.from(table).select('*');

    if (query.where) {
      query.where.forEach(({ column, value, operator = 'eq' }) => {
        dbQuery = dbQuery.filter(column, operator, value);
      });
    }

    if (query.order) {
      dbQuery = dbQuery.order(query.order.column, { ascending: query.order.ascending ?? true });
    }

    const { data, error } = await dbQuery.maybeSingle();
    if (error) throw error;
    return data;
  },

  // Get multiple records
  async many(table, query = {}) {
    let dbQuery = supabase.from(table).select('*', { count: 'exact' });

    if (query.where) {
      if (Array.isArray(query.where)) {
        query.where.forEach(({ column, value, operator = 'eq' }) => {
          dbQuery = dbQuery.filter(column, operator, value);
        });
      }
    }

    if (query.order) {
      dbQuery = dbQuery.order(query.order.column, { ascending: query.order.ascending ?? true });
    }

    if (query.limit) {
      dbQuery = dbQuery.limit(query.limit);
    }

    if (query.range) {
      dbQuery = dbQuery.range(query.range.from, query.range.to);
    }

    const { data, error, count } = await dbQuery;
    if (error) throw error;
    return { data: data || [], count };
  },

  // Insert record
  async insert(table, record) {
    const { data, error } = await supabase.from(table).insert(record).select().single();
    if (error) throw error;
    return data;
  },

  // Update record
  async update(table, updates, query) {
    let dbQuery = supabase.from(table).update(updates);

    if (query.where) {
      query.where.forEach(({ column, value, operator = 'eq' }) => {
        dbQuery = dbQuery.filter(column, operator, value);
      });
    }

    const { data, error } = await dbQuery.select();
    if (error) throw error;
    return data;
  },

  // Delete record
  async delete(table, query) {
    let dbQuery = supabase.from(table).delete();

    if (query.where) {
      query.where.forEach(({ column, value, operator = 'eq' }) => {
        dbQuery = dbQuery.filter(column, operator, value);
      });
    }

    const { error } = await dbQuery;
    if (error) throw error;
    return true;
  }
};

export { initializeDatabase, getDatabase };
