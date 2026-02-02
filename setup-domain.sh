#!/bin/bash

# ===================================
# ePANEN Domain & SSL Setup Script
# ===================================

echo "🌐 Setup Domain & SSL untuk ePanen"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# VPS Info
VPS_IP="129.226.201.183"
VPS_USER="ubuntu"

echo -e "${YELLOW}Step 1: Point Domain ke VPS${NC}"
echo "================================"
echo ""
echo "Buka dashboard provider domain kamu (GoDaddy, Namecheap, dll)"
echo "Tambahkan DNS Records:"
echo ""
echo "  Type: A Record"
echo "  Name: @"
echo "  Value: $VPS_IP"
echo "  TTL: 3600 (atau 1 jam)"
echo ""
echo "  Type: A Record"
echo "  Name: www"
echo "  Value: $VPS_IP"
echo "  TTL: 3600"
echo ""
echo -e "${YELLOW}Tunggu 5-30 menit agar DNS propagate selesai${NC}"
echo ""

read -p "Apakah DNS sudah di-setup dan sudah propagate? (y/n): " dns_ready

if [ "$dns_ready" != "y" ]; then
    echo -e "${RED}Setup DNS dulu, lalu jalankan script ini lagi${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Step 2: Masukkan Domain${NC}"
echo "================================"
read -p "Masukkan domain kamu (contoh: epanen.com): " DOMAIN

echo ""
echo -e "${YELLOW}Step 3: Update Nginx Config${NC}"
echo "================================"

# Update nginx config
sed -i "s/your-domain.com/$DOMAIN/g" frontend/nginx-ssl.conf

# Copy SSL config to replace default
cp frontend/nginx-ssl.conf frontend/nginx.conf

echo "✓ Nginx config updated untuk domain: $DOMAIN"

echo ""
echo -e "${YELLOW}Step 4: Update Environment Variables${NC}"
echo "================================"

# Update .env
sed -i "s|FRONTEND_URL=.*|FRONTEND_URL=https://$DOMAIN|g" .env

echo "✓ FRONTEND_URL updated ke: https://$DOMAIN"

echo ""
echo -e "${YELLOW}Step 5: Install Certbot & Generate SSL${NC}"
echo "================================"

ssh $VPS_USER@$VPS_IP << 'ENDSSH'
cd ~/epanen-web

# Install certbot
sudo apt update
sudo apt install certbot -y

# Stop containers temporarily
docker-compose down

# Generate SSL certificate
sudo certbot certonly --standalone \
  -d YOUR_DOMAIN \
  -d www.YOUR_DOMAIN \
  --email YOUR_EMAIL \
  --agree-tos \
  --no-eff-email

# Create SSL directory for nginx
mkdir -p frontend/ssl

# Copy certificates
sudo cp /etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem frontend/ssl/
sudo cp /etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem frontend/ssl/

# Set permissions
sudo chown -R $USER:$USER frontend/ssl
chmod 644 frontend/ssl/*.pem

echo "✓ SSL Certificate generated!"
ENDSSH

# Replace placeholders in SSH command
DOMAIN_ESCAPED=$(echo $DOMAIN | sed 's/\./\\./g')
sed -i "s/YOUR_DOMAIN/$DOMAIN/g" frontend/nginx-ssl.conf

read -p "Masukkan email untuk Let's Encrypt (untuk notifikasi expiry): " EMAIL

# Re-run SSH with actual values
ssh $VPS_USER@$VPS_IP << ENDSSH
cd ~/epanen-web

# Stop containers
docker-compose down

# Generate SSL certificate with actual domain
sudo certbot certonly --standalone \
  -d $DOMAIN \
  -d www.$DOMAIN \
  --email $EMAIL \
  --agree-tos \
  --no-eff-email

# Create SSL directory
mkdir -p frontend/ssl

# Copy certificates
sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem frontend/ssl/
sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem frontend/ssl/

# Set permissions
sudo chown -R $USER:$USER frontend/ssl
chmod 644 frontend/ssl/*.pem

echo "✓ SSL Certificate generated for $DOMAIN"
ENDSSH

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}Step 6: Update Docker Compose untuk SSL${NC}"
    echo "================================"

    # Update nginx-ssl.conf to mount SSL certificates
    cat > frontend/nginx-ssl.conf << EOF
# HTTP to HTTPS redirect
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    # Redirect all HTTP to HTTPS
    return 301 https://\$server_name\$request_uri;
}

# HTTPS main server
server {
    listen 443 ssl http2;
    server_name $DOMAIN www.$DOMAIN;

    # SSL certificates
    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;

    # SPA fallback
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # API proxy
    location /api/ {
        proxy_pass http://backend:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

    # Update docker-compose.yml to mount SSL certificates
    if ! grep -q "frontend/ssl" docker-compose.yml; then
        sed -i '/container_name: epanen-frontend/a\    volumes:\n      - ./frontend/ssl:/etc/nginx/ssl:ro' docker-compose.yml
    fi

    echo "✓ Docker Compose updated"

    echo ""
    echo -e "${GREEN}Step 7: Restart Docker Containers${NC}"
    echo "================================"

    ssh $VPS_USER@$VPS_IP << 'ENDSSH'
cd ~/epanen-web

# Re-build and start with SSL
docker-compose up -d --build

echo ""
echo "✅ Containers restarted with SSL!"
echo ""

# Show status
docker-compose ps
ENDSSH

    echo ""
    echo -e "${GREEN}================================================${NC}"
    echo -e "${GREEN}🎉 DOMAIN & SSL SETUP SUCCESSFUL!${NC}"
    echo -e "${GREEN}================================================${NC}"
    echo ""
    echo "🌐 ePanen sekarang bisa diakses via:"
    echo "   https://$DOMAIN"
    echo "   https://www.$DOMAIN"
    echo ""
    echo "📝 Auto-renewal SSL:"
    echo "   Certbot akan auto-renew SSL certificate sebelum expired."
    echo "   Cek dengan: sudo certbot renew --dry-run"
    echo ""
    echo -e "${YELLOW}Next:${NC}"
    echo "1. Test akses https://$DOMAIN"
    echo "2. Test akses https://www.$DOMAIN"
    echo "3. Cek SSL certificate di browser (should show valid certificate)"
    echo "4. Cek HTTP redirect ke HTTPS (auto redirect)"
else
    echo ""
    echo -e "${RED}❌ SSL setup gagal. Cek error di atas.${NC}"
    echo ""
    echo "Troubleshooting:"
    echo "1. Pastikan DNS sudah propagate (ping $DOMAIN)"
    echo "2. Pastikan port 80 dan 443 belum dipakai"
    echo "3. Pastikan domain sudah pointing ke $VPS_IP"
fi
