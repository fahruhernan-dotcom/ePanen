#!/bin/bash

# ===================================
# ePANEN PRODUCTION UPDATE SCRIPT
# Run this INSIDE your VPS terminal
# ===================================

echo "🚀 Memulai Update ePanen di Production..."
echo ""

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 1. Pull Latest Code
echo -e "${YELLOW}📥 Menarik kode terbaru dari GitHub...${NC}"
git pull origin main

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Gagal menarik kode. Mencoba Resolving dengan Hard Reset...${NC}"
    git reset --hard origin/main
fi

# 2. Rebuild & Restart Containers
echo ""
echo -e "${YELLOW}🐳 Membangun ulang dan menjalankan Container...${NC}"
docker-compose up -d --build

# 3. Cleanup
echo ""
echo -e "${YELLOW}🧹 Membersihkan image lama yang tidak terpakai...${NC}"
docker image prune -f

# 4. Status Check
echo ""
echo -e "${GREEN}✅ Update Selesai! Statistik Container:${NC}"
docker-compose ps

echo ""
echo -e "${GREEN}📋 Logs Terakhir:${NC}"
docker-compose logs --tail=10 backend
docker-compose logs --tail=10 frontend

echo ""
echo -e "${GREEN}ePanen sekarang berjalan dengan versi terbaru.${NC}"
