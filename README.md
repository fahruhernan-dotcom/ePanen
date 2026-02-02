# ePanen Web Platform + Nala Office Admin Dashboard

Platform digital untuk petani Indonesia dengan AI-powered assistant dan admin dashboard.

**Database: Supabase PostgreSQL** 🎯

## 🌾 Fitur

### ePanen (User Interface - Petani)
- **Tanya Pakar (AI Q&A)** - Chat dengan AI untuk konsultasi pertanian
- **Pengetahuan** - Artikel dan panduan pertanian
- **Harga Pasar** - Informasi harga komoditas terbaru
- **Komunitas** - Forum diskusi antar petani
- **Profil** - Kelola profil dan lihat riwayat chat

### Nala Office (Admin Interface)
- **Dashboard** - Statistik dan analitik platform
- **Chat Logs** - Pantau semua percakapan farmer-AI
- **User Management** - Kelola user petani
- **Content Management** - Kelola artikel/konten
- **Discussion Moderation** - Moderasi forum
- **Market Prices** - Update harga komoditas

## 🛠 Tech Stack

### Backend
- **Node.js + Express** - REST API server
- **Supabase** - PostgreSQL database & auth
- **JWT Authentication** - Token-based auth with role management
- **AI Integration** - Configurable AI API (OpenAI compatible)

### Frontend
- **Vue.js 3** - Progressive JavaScript framework
- **PrimeVue** - UI component library
- **Tailwind CSS** - Utility-first CSS
- **Pinia** - State management

## 📦 Instalasi

### 1. Prasyarat
- Node.js 18+
- Supabase account (gratis di [supabase.com](https://supabase.com))
- AI API key (OpenAI atau compatible)

### 2. Setup Supabase

**Quick Start:**
```bash
# Copy env template
cp backend/.env.example backend/.env
```

Edit `backend/.env` dengan kredensial Supabase Anda:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Detailed setup guide:** See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

### 3. Install Backend

```bash
cd backend
npm install
npm start
```

Backend akan otomatis membuat tabel Supabase saat pertama kali dijalankan.

### 4. Install Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

## 🚀 Deployment dengan Docker

```bash
# Build dan start semua services
docker-compose up -d

# Cek logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 👤 Default Accounts

### Admin
- **Email:** `admin@epanen.id`
- **Password:** `admin123`
- **Akses:** Nala Office (http://localhost:5173/admin)

### Farmer
- Register melalui `/register` atau http://localhost:5173/register

## 📡 API Endpoints

### Authentication
```
POST /api/auth/register      - User registration
POST /api/auth/login         - Login (auto-detects admin/user)
GET  /api/auth/me            - Get current user
PUT  /api/auth/profile       - Update profile
```

### Chat (User)
```
POST /api/chat/message       - Send message to AI
GET  /api/chat/history       - Get user's chat history
```

### Chat Logs (Admin)
```
GET /api/admin/chatlogs              - ALL conversations
GET /api/admin/chatlogs/user/:id     - Specific user's chats
GET /api/admin/chatlogs/stats        - Chat statistics
```

### Content
```
GET    /api/articles           - List articles
POST   /api/admin/articles     - Create (admin)
PUT    /api/admin/articles/:id - Update (admin)
DELETE /api/admin/articles/:id - Delete (admin)
```

### Market
```
GET  /api/market/prices        - List prices
POST /api/admin/market/prices  - Add price (admin)
```

### Discussions
```
GET  /api/discussions                  - List discussions
POST /api/discussions                  - Create (user)
POST /api/discussions/:id/reply        - Reply
DELETE /api/admin/discussions/:id      - Delete (admin)
```

### Admin Dashboard
```
GET /api/admin/stats            - Dashboard statistics
GET /api/admin/users           - List users
PUT /api/admin/users/:id/status - Update user status
```

## 🗄️ Database Schema (Supabase)

All ePanen tables are prefixed with `epanen_`:

| Table | Description |
|-------|-------------|
| `epanen_users` | Farmer/user accounts |
| `epanen_admins` | Admin accounts |
| `epanen_chat_messages` | AI chat history |
| `epanen_articles` | Knowledge base articles |
| `epanen_categories` | Article categories |
| `epanen_commodity_prices` | Market prices |
| `epanen_discussions` | Forum discussions |
| `epanen_replies` | Discussion replies |
| `epanen_activity_logs` | Activity tracking |

### Integration with Existing Supabase

ePanen uses `epanen_` prefix to avoid conflicts with your existing tables:
- ✅ Your `customer` table stays untouched
- ✅ Your `chat_history` table stays untouched
- ✅ Your `workflow_logs` table stays untouched
- ✅ New ePanen tables are added separately

## 🎨 Brand Colors

```scss
Primary:   #2D5A27  // Deep green
Secondary: #52A446  // Medium green
Accent:    #A8D5A2  // Light green
```

Tagline: **"Yakin Kita Bisa!"**

## 🔒 Security

- Password hashed dengan bcrypt
- JWT token untuk authentication
- Role-based access control (RBAC)
- Supabase RLS (Row Level Security) ready
- CORS configuration
- Input validation

## 📝 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=3001

# Supabase
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRE=7d

# AI Service
AI_API_URL=https://api.openai.com/v1
AI_API_KEY=your-ai-api-key
AI_MODEL=gpt-3.5-turbo

# Frontend
FRONTEND_URL=http://localhost:5173
```

### Frontend
```env
VITE_API_BASE=/api
```

## 🐛 Troubleshooting

### Supabase Connection Error
```bash
Error: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY
```
**Solution:** Check your `.env` file has correct Supabase credentials.

### Tables Not Created
Backend should auto-create tables. If not:
1. Check backend logs for errors
2. Or run SQL manually in Supabase SQL Editor (see SUPABASE_SETUP.md)

### AI Not Responding
1. Check `AI_API_KEY` is set in `.env`
2. Check AI API URL is accessible
3. Backend logs will show AI errors

## 📄 License

MIT

## 👨‍🌾 Support

**"Yakin Kita Bisa!"**

---

**ePanen Team** © 2025
