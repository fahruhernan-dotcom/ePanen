# ePanen Frontend Setup

## Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Dev Server

```bash
npm run dev
```

Frontend akan jalan di: **http://localhost:5173**

### 3. Buka Browser

Buka salah satu:
- **ePanen (User):** http://localhost:5173
- **Kian Office (Admin):** http://localhost:5173/admin

---

## Default Login

### Admin (Kian Office)
- Email: `admin@epanen.id`
- Password: `admin123`

### User/Farmer (ePanen)
- Register dulu di: http://localhost:5173/register

---

## Fitur yang Bisa Dites

### ePanen (User Interface)
- ✅ Register/Login
- ✅ Tanya Pakar (AI Chat)
- ✅ Artikel/Pengetahuan
- ✅ Harga Pasar
- ✅ Komunitas/Diskusi
- ✅ Profil

### Kian Office (Admin)
- ✅ Dashboard statistik
- ✅ Chat Logs (semua chat user-AI)
- ✅ User management
- ✅ Content management
- ✅ Discussion moderation
- ✅ Market price management

---

## Port Info

- **Frontend:** 5173
- **Backend:** 3001
- **API Proxy:** /api → http://localhost:3001/api

Jadi frontend ga perlu setting API URL, cukup `/api` aja!

---

## Build untuk Production

```bash
npm run build
```

Output: `dist/` folder (siap deploy ke VPS)
