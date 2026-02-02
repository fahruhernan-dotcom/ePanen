# 🚀 Panduan Deploy ePanen ke VPS

## 📋 Persiapan Lokal (di komputer kamu)

### 1. Install FileZilla atau WinSCP
- Download dari: https://filezilla-project.org/
- Untuk upload file ke VPS

### 2. Install SSH Client
- Windows: Gunakan **Putty** atau **Windows Terminal**
- Mac/Linux: Terminal sudah ada

---

## 🌐 Upload Project ke VPS

### Via FileZilla:

1. **Buka FileZilla**

2. **Koneksi ke VPS:**
   - Host: `129.226.201.183`
   - Username: `ubuntu`
   - Password: `IrAh3tVj)jYLMQ*^`
   - Port: `22`

3. **Upload folder:**
   - Local: `C:\Users\ASUS TUF A15\epanen-web\` (pilih folder epanen-web)
   - Remote: `/home/ubuntu/`
   - Upload semua (drag & drop)

4. **Tunggu proses upload selesai**

---

## 🔧 Installasi di VPS

### Buka Terminal/SSH dan login:

```bash
ssh ubuntu@129.226.201.183
# Password: IrAh3tVj)jYLMQ*^
```

### Jalankan perintah ini:

```bash
# 1. Update system
sudo apt-get update && sudo apt-get upgrade -y

# 2. Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 3. Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-\$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 4. Add user ke docker group
sudo usermod -aG docker ubuntu

# 5. Cek docker
docker --version
docker-compose --version
```

---

## ⚙️ Setup Environment Variables

```bash
cd ~/epanen-web

# Copy template
cp .env.example .env

# Edit environment variables
nano .env
```

### Isi yang perlu diubah di `.env`:

```bash
# SUPABASE (Required)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI Service (Required)
AI_API_URL=https://openrouter.ai/api/v1
AI_API_KEY=sk-or-v1-your-key-here
AI_MODEL=x-ai/grok-4.1-fast

# JWT (Required)
JWT_SECRET=generate-random-string-min-32-chars

# Frontend (Required)
FRONTEND_URL=http://129.226.201.183
```

### Generate JWT Secret:

```bash
# Cara generate random string:
openssl rand -hex 32
```

### Save dan exit nano:
- Tekan `Ctrl + O` (simpan)
- Tekan `Enter`
- Tekan `Ctrl + X` (keluar)

---

## 🚀 Deploy Application

### Jalankan:

```bash
# Build dan start containers
docker-compose up -d --build
```

### Cek status:

```bash
# Cek containers yang running
docker-compose ps

# Lihat logs (real-time)
docker-compose logs -f

# Cek semua logs
docker-compose logs
```

---

## 🌐 Akses Aplikasi

Deploy selesai! Akses:

- **Frontend:** http://129.226.201.183
- **Backend API:** http://129.226.201.183:3001
- **Health Check:** http://129.226.201.183:3001/api/health

---

## 🔧 Commands Penting

### Cek logs:
```bash
docker-compose logs -f              # Real-time logs
docker-compose logs backend       # Backend logs only
docker-compose logs frontend      # Frontend logs only
```

### Stop aplikasi:
```bash
docker-compose down
```

### Start aplikasi:
```bash
docker-compose up -d
```

### Re-build:
```bash
docker-compose up -d --build
```

### Restart:
```bash
docker-compose restart
```

---

## 🌐 Setup Domain (Opsional)

**Punya domain?** Lanjut ke [DOMAIN_SETUP_GUIDE.md](./DOMAIN_SETUP_GUIDE.md) untuk setup lengkap dengan HTTPS!

### Quick Summary:

1. **Point Domain ke IP VPS**
   Di dashboard provider domain:
   - Tambah A Record: `@` → `129.226.201.183`
   - Tambah A Record: `www` → `129.226.201.183`

2. **Install SSL Certificate (HTTPS)**

```bash
# SSH ke VPS
ssh ubuntu@129.226.201.183

# Install Certbot
sudo apt update
sudo apt install certbot -y

# Stop containers (release port 80)
docker-compose down

# Generate SSL certificate
sudo certbot certonly --standalone \
  -d namadomain.com \
  -d www.namadomain.com \
  --email kamu@email.com \
  --agree-tos

# Copy certificates
mkdir -p ~/epanen-web/frontend/ssl
sudo cp /etc/letsencrypt/live/namadomain.com/fullchain.pem ~/epanen-web/frontend/ssl/
sudo cp /etc/letsencrypt/live/namadomain.com/privkey.pem ~/epanen-web/frontend/ssl/
sudo chown -R ubuntu:ubuntu ~/epanen-web/frontend/ssl

# Update .env
nano ~/epanen-web/.env
# FRONTEND_URL=https://namadomain.com

# Update nginx config (gunakan nginx-ssl.conf)
cp ~/epanen-web/frontend/nginx-ssl.conf ~/epanen-web/frontend/nginx.conf
nano ~/epanen-web/frontend/nginx.conf
# Ganti "your-domain.com" dengan domain kamu

# Restart containers
docker-compose up -d --build
```

3. **Auto-Renewal**

```bash
# Test renewal
sudo certbot renew --dry-run
```

**📖 Panduan Lengkap:** Lihat [DOMAIN_SETUP_GUIDE.md](./DOMAIN_SETUP_GUIDE.md) untuk detail lengkap!

---

## 🆘 Update Application

### Cara update jika ada perubahan code:

```bash
# 1. SSH ke VPS
ssh ubuntu@129.226.201.183

# 2. Masuk ke project
cd ~/epanen-web

# 3. Pull latest code (kalau pakai git)
git pull

# 4. Re-build
docker-compose up -d --build

# 5. Restart
docker-compose restart
```

---

## 📊 Monitoring

### Cek resource usage:
```bash
htop
# atau
top
```

### Cek disk space:
```bash
df -h
```

---

## 🐛 Troubleshooting

### Container tidak start:
```bash
docker-compose logs
docker-compose ps -a
```

### Port conflict:
```bash
sudo netstat -tulpn | grep -E '80|3001|443'
sudo kill -9 <PID>
```

### Backend error 500:
```bash
docker-compose logs backend
```

---

## ✅ Checklist Deploy

- [ ] Upload folder epanen-web ke VPS
- [ ] Install Docker & Docker Compose di VPS
- [ ] Edit .env dengan credentials yang benar
- [ ] Jalankan `docker-compose up -d --build`
- [ ] Test aplikasi di browser
- ] Cek health endpoint: http://129.226.201.183:3001/api/health
- ] (Opsional) Setup domain & SSL

---

## 💬 Support

Kalau ada masalah:
- Cek logs: `docker-compose logs`
- Cek containers: `docker-compose ps`
- Restart: `docker-compose restart`

---

**Good luck! 🌾**
*"Yakin Kita Bisa!"*
