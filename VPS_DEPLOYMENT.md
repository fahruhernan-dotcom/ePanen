# Deploy ke VPS (Your Own VPS)

## Preparasi di VPS

### 1. Requirement VPS

Pastikan VPS kamu ada:
- ✅ Node.js 18+
- ✅ Nginx (optional, tapi recommended)
- ✅ PM2 (untuk production process manager)
- ✅ Supabase connection (online)
- ✅ OpenRouter API key (ready to use)

### 2. Install PM2 (Process Manager)

```bash
# Di VPS kamu
npm install -g pm2
```

---

## Cara Deploy

### Opsi A: Deploy Manual (Simple)

#### 1. Upload Files ke VPS

```bash
# Dari lokal, upload folder epanen-web ke VPS
scp -r epanen-web/ user@your-vps-ip:/home/user/

# Atau pakai git (kalau VPS bisa akses git)
git clone <your-repo> /home/user/epanen-web
```

#### 2. Setup Backend di VPS

```bash
# SSH ke VPS
ssh user@your-vps-ip

cd epanen-web/backend

# Install dependencies
npm install

# Setup .env
cp .env.example .env
nano .env
# Paste:
# SUPABASE_URL=https://ivsbyhzkqieukruscrbc.supabase.co
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
# AI_API_KEY=sk-or-v1-your-openrouter-key
# JWT_SECRET=your-secret-key

# Start backend with PM2
pm2 start src/server.js --name epanen-backend
pm2 save
pm2 startup
```

#### 3. Setup Frontend di VPS

```bash
cd ../frontend

# Install dependencies
npm install

# Build untuk production
npm run build

# Serve dengan PM2
pm2 serve dist/ 3000 --name epanen-frontend --spa
pm2 save
```

#### 4. Setup Nginx Reverse Proxy

```bash
sudo nano /etc/nginx/sites-available/epanen
```

Isi dengan:

```nginx
# HTTP (redirect to HTTPS)
server {
    listen 80;
    server_name your-domain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

# HTTPS
server {
    listen 443 ssl;
    server_name your-domain.com;

    # SSL certificate (let's encrypt nanti)
    # ssl_certificate /path/to/cert.pem;
    # ssl_certificate_key /path/to/key.pem;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Aktifkan:

```bash
sudo ln -s /etc/nginx/sites-available/epanen /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### Opsi B: Deploy dengan Docker (Recommended)

#### 1. Build Docker Images

```bash
# Di lokal machine
cd epanen-web

# Build images
docker-compose build
```

#### 2. Export Images

```bash
# Save images
docker save epanen-web-backend:latest -o backend.tar
docker save epanen-web-frontend:latest -o frontend.tar

# Upload ke VPS
scp backend.tar frontend.tar user@your-vps-ip:/home/user/
```

#### 3. Load di VPS

```bash
# SSH ke VPS
ssh user@your-vps-ip

# Load images
docker load -i backend.tar
docker load -i frontend.tar

# Setup .env
cd epanen-web/backend
cp .env.example .env
nano .env
# Isi dengan credentials kamu

# Start dengan docker-compose
docker-compose up -d
```

---

## PM2 Commands (Manage Processes)

```bash
# Cek status
pm2 status

# Restart backend
pm2 restart epanen-backend

# Restart frontend
pm2 restart epanen-frontend

# Stop all
pm2 stop all

# Logs
pm2 logs epanen-backend
pm2 logs epanen-frontend

# Monitor
pm2 monit
```

---

## Deploy Checklist

### Backend
- [ ] `.env` file configured (Supabase + OpenRouter)
- [ ] `npm install` completed
- [ ] Backend running (port 3001)
- [ ] PM2 service created

### Frontend
- [ ] `npm install` completed
- [ ] `npm run build` successful
- [ ] Frontend served (port 3000)
- [ ] PM2 service created

### Nginx
- [ ] Nginx configured
- [ ] HTTP → HTTPS redirect
- [ ] Frontend proxy to :3000
- [ ] API proxy to :3001
- [ ] DNS configured (A record)

### SSL (Optional but Recommended)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Domain Configuration

### DNS Settings

Tambah A record di domain provider kamu:

```
Type: A
Name: @ (or your subdomain)
Value: your-vps-ip-address
TTL: 3600
```

Contoh:
```
@       A    123.45.67.89    → root domain
www     A    123.45.67.89    → www subdomain
admin   A    123.45.67.89    → admin subdomain (optional)
```

---

## Post-Deploy

### 1. Test Application

```bash
# Test frontend
curl https://your-domain.com

# Test backend
curl https://your-domain.com/api/

# Test login
curl -X POST https://your-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@epanen.id","password":"admin123"}'
```

### 2. Check Logs

```bash
# PM2 logs
pm2 logs

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 3. Verify Database

Buka Supabase dashboard → Table Editor → Cek:
- `epanen_users` ada
- `epanen_admins` ada (dengan admin default)
- `epanen_chat_messages` ada
- dll.

---

## Troubleshooting

### Port already in use

```bash
# Cek port
sudo netstat -tlnp | grep :3001
sudo netstat -tlnp | grep :3000

# Kill process
sudo kill -9 <PID>
```

### PM2 service not starting

```bash
# Check logs
pm2 logs epanen-backend --lines 50

# Restart
pm2 delete epanen-backend
pm2 start src/server.js --name epanen-backend
```

### Nginx 502 Bad Gateway

```bash
# Check if backend running
curl http://localhost:3001

# Check nginx config
sudo nginx -t

# Check PM2
pm2 status
```

---

## URLs After Deploy

| Service | URL |
|---------|-----|
| Frontend (ePanen) | https://your-domain.com |
| Admin (Kian Office) | https://your-domain.com/admin |
| API Base | https://your-domain.com/api |
| Health Check | https://your-domain.com/api/health |

---

**Siap deploy!** Mau setup lewat Docker atau manual? 🚀
