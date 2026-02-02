# ===================================
# ePANEN VPS Auto-Deploy Script
# Run this script on Windows PowerShell
# ===================================

Write-Host "🚀 ePanen Auto-Deploy to VPS" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

# VPS Credentials
$VPS_IP = "129.226.201.183"
$VPS_USER = "ubuntu"
$VPS_PASSWORD = "IrAh3tVj)jYLMQ*^"
$PROJECT_PATH = "C:\Users\ASUS TUF A15\epanen-web"
$REMOTE_PATH = "/home/ubuntu/epanen-web"

# Check if pscp.exe exists (from PuTTY)
Write-Host "📦 STEP 1: Upload Project to VPS" -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Yellow
Write-Host ""

# Check if PuTTY/pscp is installed
$pscpPath = where.exe pscp 2>$null

if ($null -eq $pscpPath) {
    Write-Host "❌ pscp.exe not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Installing pscp.exe (PuTTY)..." -ForegroundColor Yellow
    Write-Host "Please download PuTTY from: https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html" -ForegroundColor White
    Write-Host "Or use WinSCP instead: https://winscp.net/" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter after installing PuTTY"
}

Write-Host "Using pscp to upload files..." -ForegroundColor Green
Write-Host "From: $PROJECT_PATH" -ForegroundColor White
Write-Host "To: $VPS_USER@$VPS_IP`:~/epanen-web" -ForegroundColor White
Write-Host ""

# Create upload command
$uploadCmd = "pscp -r -pw `"$VPS_PASSWORD`" `"$PROJECT_PATH\*`" `${VPS_USER}@${VPS_IP}:~/epanen-web`"

Write-Host "Running: $uploadCmd" -ForegroundColor Gray
Write-Host ""

# Execute upload
try {
    Invoke-Expression $uploadCmd
    Write-Host ""
    Write-Host "✅ Upload completed!" -ForegroundColor Green
} catch {
    Write-Host ""
    Write-Host "❌ Upload failed: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Alternative: Use WinSCP manually" -ForegroundColor Yellow
    Write-Host "1. Download WinSCP: https://winscp.net/" -ForegroundColor White
    Write-Host "2. Connect to: $VPS_IP" -ForegroundColor White
    Write-Host "3. Username: $VPS_USER" -ForegroundColor White
    Write-Host "4. Password: $VPS_PASSWORD" -ForegroundColor White
    Write-Host "5. Upload folder: $PROJECT_PATH" -ForegroundColor White
    Write-Host "6. Remote path: ~/epanen-web" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter after manual upload"
}

Write-Host ""
Write-Host "🔧 STEP 2: Setup & Deploy on VPS" -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Yellow
Write-Host ""

# Create SSH script for VPS
$vpsScript = @"
#!/bin/bash

echo "🔧 Setting up ePanen on VPS..."
echo ""

# Install Docker if not exists
if ! command -v docker &> /dev/null; then
    echo "📦 Installing Docker..."
    sudo apt-get update
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker ubuntu
    echo "✅ Docker installed!"
else
    echo "✅ Docker already installed"
fi

# Install Docker Compose if not exists
if ! command -v docker-compose &> /dev/null; then
    echo "📦 Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-\\\$(uname -s)-\\\$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo "✅ Docker Compose installed!"
else
    echo "✅ Docker Compose already installed"
fi

echo ""
echo "📝 Setting up environment variables..."

# Check if .env exists
if [ ! -f ~/epanen-web/.env ]; then
    cp ~/epanen-web/.env.example ~/epanen-web/.env
    echo "✅ .env file created from template"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env file with your credentials!"
    echo "   nano ~/epanen-web/.env"
    echo ""
    echo "   Required values:"
    echo "   - SUPABASE_URL"
    echo "   - SUPABASE_SERVICE_ROLE_KEY"
    echo "   - AI_API_KEY"
    echo "   - JWT_SECRET"
    echo "   - FRONTEND_URL"
    echo ""
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🐳 Building and starting containers..."

cd ~/epanen-web
docker-compose up -d --build

echo ""
echo "📊 Container status:"
docker-compose ps

echo ""
echo "================================================"
echo "🎉 DEPLOYMENT COMPLETED!"
echo "================================================"
echo ""
echo "🌐 Access ePanen:"
echo "   Frontend: http://$VPS_IP"
echo "   Backend:  http://$VPS_IP:3001"
echo "   Health:   http://$VPS_IP:3001/api/health"
echo ""
echo "📝 Next steps:"
echo "   1. Edit .env: nano ~/epanen-web/.env"
echo "   2. Restart: docker-compose restart"
echo "   3. View logs: docker-compose logs -f"
echo ""

"@

# Save script to temp file
$tempScript = "$env:TEMP\epanen-setup.sh"
$vpsScript | Out-File -FilePath $tempScript -Encoding ASCII

Write-Host "Copying setup script to VPS..." -ForegroundColor Green

# Copy script to VPS
$copyScriptCmd = "pscp -pw `"$VPS_PASSWORD`" `"$tempScript`" `${VPS_USER}@${VPS_IP}:/tmp/epanen-setup.sh`"
Invoke-Expression $copyScriptCmd

Write-Host "Running setup script on VPS..." -ForegroundColor Green
Write-Host ""

# SSH and execute setup script
$sshCmd = "plink -pw `"$VPS_PASSWORD`" `${VPS_USER}@${VPS_IP}` `"bash /tmp/epanen-setup.sh`"
Invoke-Expression $sshCmd

Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "✅ Deployment Process Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "Check if containers are running:" -ForegroundColor Yellow
Write-Host "  ssh $VPS_USER@$VPS_IP 'docker-compose ps'" -ForegroundColor White
Write-Host ""
Write-Host "View logs:" -ForegroundColor Yellow
Write-Host "  ssh $VPS_USER@$VPS_IP 'cd ~/epanen-web && docker-compose logs -f'" -ForegroundColor White
Write-Host ""
Write-Host "Test website:" -ForegroundColor Yellow
Write-Host "  http://$VPS_IP" -ForegroundColor White
Write-Host ""
