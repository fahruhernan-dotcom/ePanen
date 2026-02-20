#!/bin/bash

# ===================================
# ePANEN VPS Deployment Script - Part 2
# Run this AFTER uploading epanen-web to VPS
# ===================================

echo "🚀 Deploy ePanen ke VPS..."
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ===================================
# 1. Setup Environment Variables
# ===================================

echo -e "${YELLOW}📝 Setup Environment Variables...${NC}"
echo ""

echo "Membuat file .env dari template..."
cp .env.example .env

echo ""
echo "Edit environment variables:"
echo "--------------------------------------"
echo "1. SUPABASE_URL    = URL project Supabase kamu"
echo "2. SUPABASE_SERVICE_ROLE_KEY = Service role key dari Supabase"
echo "3. AI_API_KEY       = sk-or-v1-... (OpenRouter key)"
echo "4. AI_MODEL        = x-ai/grok-4.1-fast"
echo "5. JWT_SECRET       = generate random string (min 32 chars)"
echo "6. FRONTEND_URL     = https://domain-kamu.com (atau IP VPS)"
echo "--------------------------------------"
echo ""

read -p "Apakah kamu sudah punya akun Supabase? (y/n): " has_supabase

if [ "$has_supabase" != "y" ]; then
    echo ""
    echo -e "${BLUE}💡 Tips buat akun Supabase GRATIS:${NC}"
    echo "1. Buka https://supabase.com"
    echo "2. Sign up/login"
    echo "3. Create new project"
    echo "4. Get credentials:"
    echo "   - Project URL (Settings → API)"
    echo "   - service_role key (Settings → API)"
    echo ""
    read -p "Enter SUPABASE_URL: " supabase_url
    read -p "Enter SUPABASE_SERVICE_ROLE_KEY: " supabase_key
    read -p "Enter AI_API_KEY: " ai_key
    read -p "Enter JWT_SECRET: " jwt_secret

    # Update .env
    sed -i "s|SUPABASE_URL=.*|SUPABASE_URL=$supabase_url|" .env
    sed -i "s|SUPABASE_SERVICE_ROLE_KEY=.*|SUPABASE_SERVICE_ROLE_KEY=$supabase_key|" .env
    sed -i "s|AI_API_KEY=.*|AI_API_KEY=$ai_key|" .env
    sed -i "s|JWT_SECRET=.*|JWT_SECRET=$jwt_secret|" .env
else
    nano .env
fi

echo ""
echo -e "${GREEN}✓ Environment variables siap!${NC}"

# ===================================
# 2. Build & Start Containers
# ===================================

echo ""
echo -e "${YELLOW}🐳 Build & Start Docker Containers...${NC}"
echo ""

ssh ubuntu@129.226.201.183 <<'ENDSSH'
cd ~/epanen-web

# Pull latest code from GitHub
git pull origin main

# Build and start
docker-compose up -d --build

echo ""
echo "✅ Containers started!"
echo ""

# Show running containers
docker-compose ps

# Show logs
echo ""
echo "📋 Logs (terakhir 20 baris):"
docker-compose logs --tail=20
ENDSSH

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}================================================${NC}"
    echo -e "${GREEN}🎉 DEPLOYMENT SUCCESSFUL!${NC}"
    echo -e "${GREEN}================================================${NC}"
    echo ""
    echo "🌐 Akses ePanen:"
    echo "   Frontend: http://129.226.201.183"
    echo "   Backend: http://129.226.201.183:3001"
    echo ""
    echo "📝 Cek status:"
    echo "   docker-compose ps      # Cek containers"
    echo "   docker-compose logs -f    # Lihat logs real-time"
    echo "   docker-compose down      # Stop containers"
    echo "   docker-compose up -d      # Start containers"
    echo ""
    echo -e "${YELLOW}NEXT:${NC}"
    echo "1. Test aplikasi di browser"
    echo "2. Kalau mau pakai domain:"
    echo "   - Point domain ke IP 129.226.201.183"
    echo "   - Install SSL: sudo apt install certbot"
    echo "   - sudo certbot --nginx -d namadomain.com"
else
    echo ""
    echo -e "${RED}❌ Deployment gagal. Cek logs:${NC}"
    ssh ubuntu@129.226.201.183 'cd ~/epanen-web && docker-compose logs'
fi
