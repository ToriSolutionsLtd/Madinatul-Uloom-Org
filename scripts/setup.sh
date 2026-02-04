#!/bin/bash

# Madinatul Uloom - Development Setup Script
# This script sets up the development environment

set -e

echo "🕌 Madinatul Uloom - Development Setup"
echo "======================================"

# Check for required tools
check_tool() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ $1 is not installed. Please install it first."
        exit 1
    fi
    echo "✅ $1 is installed"
}

echo ""
echo "Checking required tools..."
check_tool node
check_tool pnpm
check_tool docker

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Node.js version 20 or higher is required. Current: $(node -v)"
    exit 1
fi
echo "✅ Node.js version is compatible"

echo ""
echo "Setting up environment files..."

# Copy environment files if they don't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env from .env.example"
else
    echo "⚠️  .env already exists, skipping"
fi

if [ ! -f apps/web/.env.local ]; then
    cp apps/web/.env.example apps/web/.env.local
    echo "✅ Created apps/web/.env.local"
else
    echo "⚠️  apps/web/.env.local already exists, skipping"
fi

if [ ! -f apps/api/.env ]; then
    cp apps/api/.env.example apps/api/.env
    echo "✅ Created apps/api/.env"
else
    echo "⚠️  apps/api/.env already exists, skipping"
fi

echo ""
echo "Starting Docker services..."
docker compose up -d
echo "✅ Docker services started"

echo ""
echo "Installing dependencies..."
pnpm install
echo "✅ Dependencies installed"

echo ""
echo "Generating Prisma client..."
pnpm db:generate
echo "✅ Prisma client generated"

echo ""
echo "Pushing database schema..."
pnpm db:push
echo "✅ Database schema pushed"

echo ""
echo "======================================"
echo "🎉 Setup complete!"
echo ""
echo "Available commands:"
echo "  pnpm dev          - Start development servers"
echo "  pnpm build        - Build all packages"
echo "  pnpm db:studio    - Open Prisma Studio"
echo "  pnpm lint         - Run linting"
echo ""
echo "Services:"
echo "  Frontend:    http://localhost:3000"
echo "  Backend:     http://localhost:3001"
echo "  API Docs:    http://localhost:3001/docs"
echo "  Adminer:     http://localhost:8080"
echo "  Redis UI:    http://localhost:8081"
echo ""
