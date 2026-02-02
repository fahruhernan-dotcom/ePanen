# Backend Setup with OpenRouter AI

## Quick Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Get OpenRouter API Key

1. Go to [OpenRouter.ai](https://openrouter.ai)
2. Sign up or log in
3. Go to [API Keys](https://openrouter.ai/keys)
4. Copy your API key (starts with `sk-or-v1-`)

### 3. Get Supabase Service Role Key

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/ivsbyhzkqieukruscrbc/settings/api
2. Scroll to **Project API keys**
3. Copy the **service_role** secret (NOT the anon key!)
4. It starts with `eyJ...`

### 4. Configure Environment

Edit `backend/.env`:

```env
# Supabase
SUPABASE_URL=https://ivsbyhzkqieukruscrbc.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-role-key-here

# OpenRouter AI
AI_API_URL=https://openrouter.ai/api/v1
AI_API_KEY=sk-or-v1-your-openrouter-key-here
AI_MODEL=anthropic/claude-3.5-sonnet
```

### 5. Start Backend

```bash
npm start
```

Backend akan:
1. Connect ke Supabase kamu
2. Create ePanen tables (prefixed `epanen_`)
3. Seed initial data (categories, prices, default admin)
4. Ready untuk menerima requests!

---

## Testing

### Test AI Connection

```bash
# Test OpenRouter connection
curl -X POST http://localhost:3001/api/ai/test
```

### Test API Health

```bash
curl http://localhost:3001
```

Should return:
```json
{
  "name": "ePanen API",
  "database": "Supabase PostgreSQL"
}
```

---

## Available AI Models (OpenRouter)

Change `AI_MODEL` in `.env`:

| Model | Description | Good For |
|-------|-------------|----------|
| `anthropic/claude-3.5-sonnet` | Best quality, smart | Complex questions |
| `anthropic/claude-3-haiku` | Fast, cheap | Simple questions |
| `google/gemini-pro` | Balanced | General use |
| `meta-llama/llama-3-70b` | Open source | Privacy-focused |
| `mistralai/mistral-7b-instruct` | Fast | Quick responses |

**Recommended for ePanen:**
- Production: `anthropic/claude-3.5-sonnet` (smart, context-aware)
- Development: `anthropic/claude-3-haiku` (fast, cheap)

---

## Troubleshooting

### Supabase Connection Error

```
Error: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY
```

**Solution:**
- Check `.env` file exists
- Verify SUPABASE_URL is correct
- Make sure you copied **service_role** key (not anon key)

### OpenRouter API Error

```
❌ OpenRouter API Key invalid
```

**Solution:**
- Check your API key at https://openrouter.ai/keys
- Make sure it starts with `sk-or-v1-`
- Verify no extra spaces in `.env` file

### Tables Not Created

Backend should auto-create tables on first run. If not:

1. Check Supabase logs
2. Or run SQL manually in Supabase SQL Editor (see `SUPABASE_SETUP.md`)

---

## Default Admin Account

After first run:
- **Email:** admin@epanen.id
- **Password:** admin123

Login at: http://localhost:5173/login

---

## Next Steps

1. ✅ Backend configured with OpenRouter
2. ✅ Supabase connected (your existing project)
3. → Start frontend: `cd ../frontend && npm install && npm run dev`

---

**Questions?** Check `SUPABASE_SETUP.md` or `N8N_INTEGRATION.md`
