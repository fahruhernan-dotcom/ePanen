# 🌐 Setup Domain & SSL untuk ePanen

## 📋 Prasyarat

- ✅ Domain sudah dibeli (GoDaddy, Namecheap, Niagahoster, dll)
- ✅ VPS sudah siap (129.226.201.183)
- ✅ Docker & Docker Compose sudah terinstall

---

## 🚀 Langkah 1: Point Domain ke VPS

### Di Dashboard Domain Provider:

Tambahkan **2 A Records**:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 129.226.201.183 | 3600 (1 jam) |
| A | www | 129.226.201.183 | 3600 (1 jam) |

**Catatan:**
- `@` = root domain (epanen.com)
- `www` = subdomain www (www.epanen.com)
- TTL: 3600 = 1 jam (bisa juga pakai 14400 = 4 jam)

### Contoh di GoDaddy:
1. Login ke GoDaddy
2. Go to **My Products** → **DNS Management**
3. Click **Add**
4. Pilih Type: **A**
5. Host: `@`
6. Points to: `129.226.201.183`
7. TTL: **1 hour**
8. Click **Save**
9. Ulangi untuk `www`

### Contoh di Niagahoster:
1. Login ke Niagahoster
2. Go to **Domain** → **Kelola DNS**
3. Click **Tambahkan DNS Record**
4. Type: **A**
5. Name: `@`
6. IPv4 Address: `129.226.201.183`
7. Click **Simpan**
8. Ulangi untuk `www`

---

## ⏳ Langkah 2: Tunggu DNS Propagate

Setelah setup DNS, tunggu **5-30 menit** agar DNS propagate ke seluruh dunia.

### Cek DNS sudah propagate:

**Di Windows (Command Prompt):**
```cmd
ping epanen.com
```

**Di Mac/Linux:**
```bash
ping epanen.com
```

Kalau sudah reply dari IP `129.226.201.183`, berarti DNS sudah propagate.

**Atau cek online:**
- https://www.whatsmydns.net/
- Masukkan domain
- Tunggu sampai semua hijau

---

## 🔧 Langkah 3: SSH ke VPS

```bash
ssh ubuntu@129.226.201.183
# Password: IrAh3tVj)jYLMQ*^

# Masuk ke folder project
cd ~/epanen-web
```

---

## 🔐 Langkah 4: Install Certbot

```bash
# Update package list
sudo apt update

# Install certbot
sudo apt install certbot -y
```

---

## 📝 Langkah 5: Update Nginx Config

### 5a. Update nginx config untuk domain:

```bash
nano frontend/nginx-ssl.conf
```

Ganti `your-domain.com` dengan domain kamu:

```nginx
server {
    listen 80;
    server_name epanen.com www.epanen.com;  # ← Ganti ini
    ...
}
```

### 5b. Copy SSL config ke default config:

```bash
cp frontend/nginx-ssl.conf frontend/nginx.conf
```

---

## 🌐 Langkah 6: Generate SSL Certificate

### 6a. Stop docker containers dulu:

```bash
docker-compose down
```

### 6b. Generate SSL certificate:

```bash
sudo certbot certonly --standalone \
  -d epanen.com \
  -d www.epanen.com \
  --email kamu@email.com \
  --agree-tos \
  --no-eff-email
```

**Ganti:**
- `epanen.com` → domain kamu
- `kamu@email.com` → email kamu

**Output sukses:**
```
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/epanen.com/fullchain.pem
Key is saved at: /etc/letsencrypt/live/epanen.com/privkey.pem
```

---

## 📁 Langkah 7: Copy SSL Certificates

```bash
# Buat folder SSL
mkdir -p frontend/ssl

# Copy certificates
sudo cp /etc/letsencrypt/live/epanen.com/fullchain.pem frontend/ssl/
sudo cp /etc/letsencrypt/live/epanen.com/privkey.pem frontend/ssl/

# Set permissions
sudo chown -R $USER:$USER frontend/ssl
chmod 644 frontend/ssl/*.pem

# Verifikasi
ls -la frontend/ssl/
```

**Harusnya ada 2 files:**
- `fullchain.pem`
- `privkey.pem`

---

## 🐳 Langkah 8: Update Docker Compose

Edit `docker-compose.yml` untuk mount SSL certificates:

```bash
nano docker-compose.yml
```

Tambahkan volumes di `frontend` service:

```yaml
frontend:
  build:
    context: ./frontend
    dockerfile: Dockerfile
  container_name: epanen-frontend
  restart: unless-stopped
  ports:
    - "80:80"
    - "443:443"  # ← Tambah ini
  volumes:
    - ./frontend/ssl:/etc/nginx/ssl:ro  # ← Tambah ini
  depends_on:
    - backend
  networks:
    - epanen-network
```

---

## 🚀 Langkah 9: Update Environment Variables

```bash
nano .env
```

Update `FRONTEND_URL`:

```bash
FRONTEND_URL=https://epanen.com  # ← Ganti ke domain kamu
```

---

## 🔄 Langkah 10: Rebuild & Start Containers

```bash
# Build dan start dengan SSL
docker-compose up -d --build

# Cek status
docker-compose ps

# Cek logs
docker-compose logs -f frontend
```

**Harusnya frontend running on port 80 & 443:**
```
epanen-frontend   Up      0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp
```

---

## ✅ Langkah 11: Test Akses

### 11a. Test HTTP → HTTPS Redirect

Buka browser dan akses:
- http://epanen.com → harus auto-redirect ke https://epanen.com
- http://www.epanen.com → harus auto-redirect ke https://www.epanen.com

### 11b. Test HTTPS

Akses:
- https://epanen.com ✅
- https://www.epanen.com ✅

### 11c. Cek SSL Certificate

Di browser:
1. Click icon lock 🔒 di address bar
2. Click "Connection is secure" / "Certificate"
3. Cek:
   - Issued by: Let's Encrypt
   - Valid untuk: epanen.com + www.epanen.com
   - Expiry date: ~90 days dari sekarang

### 11d. Test API

Akses backend via HTTPS:
- https://epanen.com/api/health
- https://www.epanen.com/api/health

---

## 🔄 Auto-Renewal SSL

Certbot akan auto-renew SSL sebelum expired, tapi kita bisa setup manual renewal check:

### Cek auto-renewal:

```bash
sudo certbot renew --dry-run
```

**Output sukses:**
```
Congratulations, all simulated renewals succeeded
```

### Setup cron job (optional):

```bash
sudo crontab -e
```

Tambahkan baris ini:

```
0 3 * * * certbot renew --quiet --post-hook "docker-compose -f /home/ubuntu/epanen-web/docker-compose.yml restart frontend"
```

**Artinya:** Cek renewal setiap jam 3 pagi, kalau ada renewal → restart frontend container.

---

## 🆘 Troubleshooting

### Problem 1: DNS belum propagate

**Gejala:**
- Ping domain tidak resolve ke 129.226.201.183
- "Could not connect" saat generate SSL

**Solusi:**
- Tunggu 5-30 menit
- Cek di https://www.whatsmydns.net/
- Clear cache DNS: `ipconfig /flushdns` (Windows)

### Problem 2: Port 80 or 443 already in use

**Gejala:**
- Error saat start docker: "port is already allocated"

**Solusi:**
```bash
# Cek apa yang pakai port
sudo netstat -tulpn | grep -E '80|443'

# Kill process
sudo kill -9 <PID>

# Atau stop nginx jika ada
sudo systemctl stop nginx
```

### Problem 3: SSL certificate error

**Gejala:**
- "Unable to connect" saat generate certificate
- "Connection timeout"

**Solusi:**
- Pastikan DNS sudah propagate
- Pastikan port 80 & 443 open di firewall
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### Problem 4: Website tidak accessible

**Gejala:**
- Browser show "This site can't be reached"

**Solusi:**
```bash
# Cek containers
docker-compose ps

# Cek logs
docker-compose logs frontend

# Restart
docker-compose restart
```

### Problem 5: HTTP tidak redirect ke HTTPS

**Gejala:**
- http://epanen.com tidak redirect

**Solusi:**
- Cek nginx config ada redirect block:
```nginx
server {
    listen 80;
    return 301 https://$server_name$request_uri;
}
```
- Restart frontend:
```bash
docker-compose restart frontend
```

---

## 📋 Checklist

- [ ] DNS A Records sudah ditambahkan (@ dan www)
- [ ] DNS sudah propagate (ping → 129.226.201.183)
- [ ] Certbot sudah terinstall
- [ ] Nginx config sudah update dengan domain
- [ ] SSL certificate sudah generate
- [ ] SSL certificates sudah copy ke frontend/ssl
- [ ] docker-compose.yml sudah update (port 443 & volumes)
- [ ] .env sudah update (FRONTEND_URL=https://...)
- [ ] Containers sudah rebuild & restart
- [ ] HTTP → HTTPS redirect works
- [ ] HTTPS accessible
- [ ] SSL certificate valid di browser
- [ ] API works via HTTPS

---

## 🎉 Selesai!

Setelah semua langkah selesai:

- **Website:** https://epanen.com
- **Backend API:** https://epanen.com/api
- **SSL:** Valid untuk 90 days (auto-renew)
- **HTTP Redirect:** Auto ke HTTPS

---

## 💬 Support

Kalau ada masalah:
- Cek logs: `docker-compose logs -f`
- Cek containers: `docker-compose ps`
- Restart: `docker-compose restart`
- Cek DNS: `ping epanen.com`
- Cek SSL: `sudo certbot certificates`

---

**Good luck! 🌾**
*"Yakin Kita Bisa!"*
