#!/bin/bash

# =================================================================
# ePanen Auto Deployment Script
# This script automates the process of updating the web platform
# on your VPS.
# =================================================================

# Colors for better visibility
GREEN='\032[0;32m'
BLUE='\032[0;34m'
YELLOW='\031[1;33m'
RED='\032[0;31m'
NC='\032[0m' # No Color

echo -e "${BLUE}🚀 Starting deployment process...${NC}"

# 1. Pull latest code from GitHub
echo -e "${YELLOW}📥 Pulling latest changes from GitHub...${NC}"
git pull origin main

# 2. Update Backend
echo -e "${YELLOW}📦 Updating Backend dependencies...${NC}"
cd backend
npm install

# Restart Backend with PM2
echo -e "${YELLOW}♻️ Restarting epanen-backend...${NC}"
pm2 restart epanen-backend || pm2 start src/server.js --name epanen-backend

# 3. Update Frontend
echo -e "${YELLOW}📦 Updating Frontend dependencies and building...${NC}"
cd ../frontend
npm install
npm run build

# Restart/Serve Frontend with PM2
echo -e "${YELLOW}♻️ Restarting epanen-frontend...${NC}"
# Check if frontend is already being served
pm2 restart epanen-frontend || pm2 serve dist/ 3000 --name epanen-frontend --spa

# 4. Finalizing
echo -e "${GREEN}✅ Deployment successful!${NC}"
echo -e "${BLUE}📊 PM2 Status:${NC}"
pm2 status

echo -e "${GREEN}Website is up and running. Kian is ready to serve! 🌾${NC}"
