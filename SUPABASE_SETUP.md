# Supabase Setup Guide for ePanen

This guide will help you set up Supabase for the ePanen backend.

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose your organization
5. Set project name: `epanen`
6. Set database password (save it!)
7. Choose a region close to your users
8. Click "Create new project"

## Step 2: Get Your Credentials

1. Go to your project dashboard
2. Click on **Settings** → **API**
3. Copy these values:
   - **Project URL** → `SUPABASE_URL`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep this secret!)

## Step 3: Create Database Tables

You have 2 options:

### Option A: Automatic (via Backend)
The backend will auto-create tables on first run. Just set your env variables and start!

### Option B: Manual (via Supabase SQL Editor)

Go to **SQL Editor** in Supabase dashboard and run:

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ePanen users table (farmers)
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
);

-- ePanen admins table
CREATE TABLE IF NOT EXISTS epanen_admins (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat sessions to group messages
CREATE TABLE IF NOT EXISTS epanen_chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id BIGINT NOT NULL,
  title TEXT DEFAULT 'Pesan Baru',
  context_summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES epanen_users(id) ON DELETE CASCADE
);

-- Chat messages (farmer-AI conversations)
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
);

-- User-specific AI Memory (Long-term context)
CREATE TABLE IF NOT EXISTS epanen_ai_memory (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES epanen_users(id) ON DELETE CASCADE,
  UNIQUE(user_id, key)
);

-- Categories for articles
CREATE TABLE IF NOT EXISTS epanen_categories (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT DEFAULT 'article',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Articles/Content
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
);

-- Commodity prices
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
);

-- Discussions
CREATE TABLE IF NOT EXISTS epanen_discussions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  status TEXT DEFAULT 'active',
  views BIGINT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES epanen_users(id) ON DELETE CASCADE
);

-- Discussion replies
CREATE TABLE IF NOT EXISTS epanen_replies (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  discussion_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (discussion_id) REFERENCES epanen_discussions(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES epanen_users(id) ON DELETE CASCADE
);

-- Activity logs
CREATE TABLE IF NOT EXISTS epanen_activity_logs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id BIGINT,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON epanen_chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON epanen_chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON epanen_chat_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON epanen_chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_memory_user_id ON epanen_ai_memory(user_id);

-- Insert seed data
INSERT INTO epanen_categories (name, slug, type) VALUES
  ('Budidaya', 'budidaya', 'article'),
  ('Hama & Penyakit', 'hama-penyakit', 'article'),
  ('Cuaca & Iklim', 'cuaca-iklim', 'article'),
  ('Teknologi', 'teknologi', 'article'),
  ('Pasar', 'pasar', 'discussion'),
  ('Tanya Jawab', 'tanya-jawab', 'discussion')
ON CONFLICT (slug) DO NOTHING;

-- Insert commodity prices
INSERT INTO epanen_commodity_prices (name, category, price, unit, location, trend, date) VALUES
  ('Beras', 'Bahan Pokok', 14000, 'kg', 'Jawa Timur', 'up', CURRENT_DATE),
  ('Jagung', 'Bahan Pokok', 6500, 'kg', 'Jawa Tengah', 'stable', CURRENT_DATE),
  ('Cabai Merah', 'Sayuran', 45000, 'kg', 'Jawa Barat', 'down', CURRENT_DATE),
  ('Bawang Merah', 'Sayuran', 32000, 'kg', 'Jawa Tengah', 'stable', CURRENT_DATE),
  ('Telur Ayam', 'Protein', 28000, 'kg', 'Jawa Timur', 'up', CURRENT_DATE)
ON CONFLICT DO NOTHING;

-- Note: Default admin will be created by the backend automatically
-- Username: admin, Password: admin123
```

## Step 4: Configure Backend Environment

Create `.env` file in `/backend` directory:

```env
# Server Configuration
NODE_ENV=development
PORT=3001

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# AI Service (configure your AI API)
AI_API_URL=https://api.openai.com/v1
AI_API_KEY=your-ai-api-key
AI_MODEL=gpt-3.5-turbo
AI_MAX_TOKENS=500
AI_TEMPERATURE=0.7

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

## Step 5: Start the Backend

```bash
cd backend
npm install
npm start
```

The backend will:
1. Connect to your Supabase project
2. Create tables if they don't exist
3. Seed initial data
4. Create default admin account

## Step 6: Verify Setup

Check the backend is running:
```bash
curl http://localhost:3001
```

You should see:
```json
{
  "name": "ePanen API",
  "database": "Supabase PostgreSQL"
}
```

## Integration with Your Existing Supabase

If you already have tables like `customer`, `chat_history`, `workflow_logs`:

1. **ePanen tables are prefixed** with `epanen_` to avoid conflicts
2. **Your existing tables remain untouched**
3. **You can query both** from Supabase dashboard

### Example: Using your existing `chat_history` table

If you want to use your existing `chat_history` table instead of `epanen_chat_messages`, you can modify the controllers:

```javascript
// In questionController.js, change:
await supabaseQuery.insert('epanen_chat_messages', {...});

// To:
await supabase.from('chat_history').insert({
  session_id: sessionId,
  message: { role: 'user', content: message }
});
```

## Troubleshooting

### Connection Error
```
Error: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY
```
**Solution**: Make sure you set both env variables correctly.

### Table Already Exists
```
Table creation note: already exists
```
**Solution**: This is normal! Tables already exist, skipping creation.

### Permission Denied
```
Error: permission denied for table epanen_users
```
**Solution**: Make sure you're using the `service_role` key (not `anon` key).

## Default Accounts

After setup, you can login with:

**Admin:**
- Email: `admin@epanen.id`
- Password: `admin123`

**Farmers:**
- Register via `/register` endpoint

## Next Steps

1. ✅ Supabase is configured
2. ✅ Backend is running
3. → Configure AI API for chat functionality
4. → Start frontend: `cd frontend && npm install && npm run dev`
5. → Test the complete flow

---

**Need help?** Check the main [README.md](../README.md)
