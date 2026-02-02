#!/bin/bash

# ===================================
# ePANEN VPS Deployment Script
# ===================================

echo "🚀 Memulai deployment ePanen ke VPS..."
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# VPS Info
VPS_IP="129.226.201.183"
VPS_USER="ubuntu"
VPS_HOST="ubuntu@$VPS_IP"

echo -e "${GREEN}VPS Target:${NC} $VPS_IP"
echo -e "${GREEN}Username:${NC} $VPS_USER"
echo ""

# ===================================
# 1. Install Docker & Docker Compose on VPS
# ===================================

echo -e "${YELLOW}[1/6]${NC} Install Docker & Docker Compose di VPS..."
echo ""

ssh $VPS_HOST << 'ENDSSH'
# Update system
sudo apt-get update && sudo apt-get upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-\$(uname -s)-\$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create project directory
mkdir -p ~/epanen-web
cd ~/epanen-web

echo "✅ Docker & Docker Compose installed!"
ENDSSH

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Step 1 Selesai!${NC}"
else
    echo -e "${RED}✗ Gagal install Docker. Coba manual!${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}=================================================${NC}"
echo ""
echo -e "${GREEN}NEXT STEP:${NC}"
echo "1. Upload folder epanen-web ke VPS:"
echo "   - Buka FileZilla/WinSCP"
echo "   - Connect ke: $VPS_IP"
echo "   - Username: ubuntu"
echo "   - Password: (password kamu)"
echo "   - Upload SELURUH isi folder epanen-web"
echo ""
echo -e "${GREEN}ATAU jalankan perintah ini di komputer kamu:${NC}"
echo -e "${YELLOW}cd path/to/epanen-web${NC}"
echo -e "${YELLOW}bash deploy-upload.sh${NC}"
echo ""
echo "2. Kalau sudah upload, jalankan:"
echo -e "   ${YELLOW}ssh $VPS_HOST${NC}"
echo -e "   ${YELLOW}cd ~/epanen-web${NC}"
echo -e "   ${YELLOW}nano .env${NC}  # Edit environment variables"
echo -e "   ${YELLOW}docker-compose up -d${NC}"
echo ""
echo -e "${YELLOW}=================================================${NC}"
