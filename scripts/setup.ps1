# Madinatul Uloom - Development Setup Script (Windows PowerShell)
# This script sets up the development environment

$ErrorActionPreference = "Stop"

Write-Host "🕌 Madinatul Uloom - Development Setup" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

function Test-Command {
    param($Command)
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        Write-Host "✅ $Command is installed" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ $Command is not installed. Please install it first." -ForegroundColor Red
        return $false
    }
}

Write-Host ""
Write-Host "Checking required tools..." -ForegroundColor Yellow

$nodeOk = Test-Command "node"
$pnpmOk = Test-Command "pnpm"
$dockerOk = Test-Command "docker"

if (-not ($nodeOk -and $pnpmOk -and $dockerOk)) {
    exit 1
}

# Check Node version
$nodeVersion = (node -v) -replace 'v', '' -split '\.' | Select-Object -First 1
if ([int]$nodeVersion -lt 20) {
    Write-Host "❌ Node.js version 20 or higher is required. Current: $(node -v)" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js version is compatible" -ForegroundColor Green

Write-Host ""
Write-Host "Setting up environment files..." -ForegroundColor Yellow

# Copy environment files if they don't exist
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Created .env from .env.example" -ForegroundColor Green
} else {
    Write-Host "⚠️  .env already exists, skipping" -ForegroundColor Yellow
}

if (-not (Test-Path "apps/web/.env.local")) {
    Copy-Item "apps/web/.env.example" "apps/web/.env.local"
    Write-Host "✅ Created apps/web/.env.local" -ForegroundColor Green
} else {
    Write-Host "⚠️  apps/web/.env.local already exists, skipping" -ForegroundColor Yellow
}

if (-not (Test-Path "apps/api/.env")) {
    Copy-Item "apps/api/.env.example" "apps/api/.env"
    Write-Host "✅ Created apps/api/.env" -ForegroundColor Green
} else {
    Write-Host "⚠️  apps/api/.env already exists, skipping" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Starting Docker services..." -ForegroundColor Yellow
docker compose up -d
Write-Host "✅ Docker services started" -ForegroundColor Green

Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
pnpm install
Write-Host "✅ Dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "Generating Prisma client..." -ForegroundColor Yellow
pnpm db:generate
Write-Host "✅ Prisma client generated" -ForegroundColor Green

Write-Host ""
Write-Host "Pushing database schema..." -ForegroundColor Yellow
pnpm db:push
Write-Host "✅ Database schema pushed" -ForegroundColor Green

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Available commands:" -ForegroundColor White
Write-Host "  pnpm dev          - Start development servers" -ForegroundColor Gray
Write-Host "  pnpm build        - Build all packages" -ForegroundColor Gray
Write-Host "  pnpm db:studio    - Open Prisma Studio" -ForegroundColor Gray
Write-Host "  pnpm lint         - Run linting" -ForegroundColor Gray
Write-Host ""
Write-Host "Services:" -ForegroundColor White
Write-Host "  Frontend:    http://localhost:3000" -ForegroundColor Gray
Write-Host "  Backend:     http://localhost:3001" -ForegroundColor Gray
Write-Host "  API Docs:    http://localhost:3001/docs" -ForegroundColor Gray
Write-Host "  Adminer:     http://localhost:8080" -ForegroundColor Gray
Write-Host "  Redis UI:    http://localhost:8081" -ForegroundColor Gray
Write-Host ""
