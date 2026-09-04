#!/bin/bash
set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   Ziabl Trade Academy — Deployment     ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"

# Check Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker не установлен. Установите: https://docs.docker.com/engine/install/${NC}"
    exit 1
fi

if ! command -v docker compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose не установлен${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker и Docker Compose найдены${NC}"

# Setup .env
if [ ! -f .env ]; then
    echo -e "${YELLOW}📄 Создаём .env из .env.example...${NC}"
    cp .env.example .env
    
    # Generate random NEXTAUTH_SECRET
    SECRET=$(openssl rand -base64 32)
    sed -i "s|your-super-secret-key-change-in-production|$SECRET|g" .env
    
    echo -e "${YELLOW}⚠️  Проверьте и отредактируйте .env перед продолжением${NC}"
    echo -e "${YELLOW}   nano .env${NC}"
    read -p "Нажмите Enter после редактирования .env..."
fi

# Build and start
echo -e "${GREEN}🔨 Собираем контейнеры...${NC}"
docker compose build

echo -e "${GREEN}🚀 Запускаем...${NC}"
docker compose up -d

# Wait for DB
echo -e "${YELLOW}⏳ Ждём готовности базы данных...${NC}"
sleep 10

# Run migrations and seed
echo -e "${GREEN}📊 Применяем миграции...${NC}"
docker compose exec app npx prisma db push

echo -e "${GREEN}🌱 Заполняем базу данных...${NC}"
docker compose exec app npx tsx prisma/seed.ts

echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   ✅ Деплой завершён успешно!          ║${NC}"
echo -e "${GREEN}║                                        ║${NC}"
echo -e "${GREEN}║   🌐 https://ziabl.ru                  ║${NC}"
echo -e "${GREEN}║   👤 admin@ziabl.ru / admin123          ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
