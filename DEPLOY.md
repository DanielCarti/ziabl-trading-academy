# 🚀 Развёртывание Ziabl Trade Academy на VPS

## Требования

- **Linux VPS** (Ubuntu 20.04+ / Debian 11+)
- **Docker** и **Docker Compose** установлены
- **Домен** ziabl.ru с DNS A-записью, указывающей на IP вашего VPS
- Минимум **1 ГБ RAM**, **10 ГБ** свободного места на диске

---

## Шаг 1: Подготовка сервера

### Установка Docker (если не установлен)

```bash
# Обновить пакеты
sudo apt update && sudo apt upgrade -y

# Установить Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Добавить текущего пользователя в группу docker
sudo usermod -aG docker $USER
newgrp docker

# Проверить
docker --version
docker compose version
```

---

## Шаг 2: Загрузка проекта на сервер

### Вариант А: через Git
```bash
cd /opt
git clone <url-репозитория> ziabl-trading-academy
cd ziabl-trading-academy
```

### Вариант Б: через SCP (копирование файлов)
```bash
# На локальной машине:
scp -r ./ziabl-trading-academy user@IP_ВАШЕГО_VPS:/opt/

# На сервере:
cd /opt/ziabl-trading-academy
```

---

## Шаг 3: Настройка DNS

1. Зайдите в панель управления вашего регистратора домена
2. Создайте **A-запись**:
   - **Имя**: `@` (или `ziabl.ru`)
   - **Тип**: `A`
   - **Значение**: `IP_ВАШЕГО_VPS`
   - **TTL**: `300` (5 минут)
3. (Опционально) Создайте A-запись для `www`:
   - **Имя**: `www`
   - **Значение**: `IP_ВАШЕГО_VPS`

### Проверка DNS
```bash
nslookup ziabl.ru
# Должен показать IP вашего VPS
```

> ⏳ DNS-записи могут обновляться до 24 часов, но обычно 5-30 минут.

---

## Шаг 4: Конфигурация

```bash
cd /opt/ziabl-trading-academy

# Скопировать шаблон
cp .env.example .env

# Отредактировать
nano .env
```

### Что изменить в `.env`:

| Переменная | Что указать |
|-----------|------------|
| `DATABASE_URL` | Изменить пароль: `postgresql://ziabl:ВАША_ПАРОЛЬ@db:5432/ziabl_academy` |
| `NEXTAUTH_SECRET` | Сгенерировать: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://ziabl.ru` |
| `ADMIN_PASSWORD` | Ваш пароль для админ-панели |

---

## Шаг 5: Получение SSL-сертификата

### Установка Certbot
```bash
sudo apt install certbot -y
```

### Получение сертификата (перед запуском nginx)
```bash
# Временно остановить nginx если он запущен
sudo systemctl stop nginx 2>/dev/null || true

# Получить сертификат
sudo certbot certonly --standalone -d ziabl.ru -d www.ziabl.ru

# Настроить автоматическое обновление
sudo certbot renew --dry-run
```

### Автообновление (cron)
```bash
echo "0 12 * * * /usr/bin/certbot renew --quiet && docker compose -f /opt/ziabl-trading-academy/docker-compose.yml restart nginx" | sudo crontab -
```

---

## Шаг 6: Запуск

```bash
cd /opt/ziabl-trading-academy

# Сделать скрипт исполняемым
chmod +x deploy.sh

# Запустить деплой
./deploy.sh
```

### Или вручную:
```bash
# Собрать контейнеры
docker compose build

# Запустить
docker compose up -d

# Подождать 10 секунд для инициализации БД
sleep 10

# Применить схему БД
docker compose exec app npx prisma db push

# Заполнить данными
docker compose exec app npx tsx prisma/seed.ts
```

---

## Шаг 7: Проверка

1. Откройте **https://ziabl.ru** в браузере
2. Проверьте загрузку главной страницы
3. Откройте курсы, перейдите в урок
4. Войдите в админ-панель:
   - URL: `https://ziabl.ru/admin`
   - Email: `admin@ziabl.ru`
   - Пароль: (тот, что указали в `.env`)

---

## 🔧 Обслуживание

### Просмотр логов
```bash
# Все сервисы
docker compose logs -f

# Конкретный сервис
docker compose logs -f app
docker compose logs -f db
docker compose logs -f nginx
```

### Перезапуск
```bash
docker compose restart        # Все сервисы
docker compose restart app    # Только приложение
```

### Обновление кода
```bash
cd /opt/ziabl-trading-academy
git pull
docker compose up -d --build
```

### Бэкап базы данных
```bash
# Создать бэкап
docker compose exec db pg_dump -U ziabl ziabl_academy > backup_$(date +%Y%m%d_%H%M%S).sql

# Восстановить из бэкапа
cat backup_20240101_120000.sql | docker compose exec -T db psql -U ziabl ziabl_academy
```

### Очистка Docker
```bash
docker system prune -a --volumes  # ⚠️ Удалит ВСЕ неиспользуемые данные
```

---

## ❗ Устранение неполадок

### Порт 80/443 занят
```bash
sudo lsof -i :80
sudo systemctl stop apache2  # или nginx
```

### Контейнер не запускается
```bash
docker compose logs app  # Смотрим ошибки
docker compose down && docker compose up -d  # Перезапуск
```

### База данных не подключается
```bash
docker compose exec db psql -U ziabl -d ziabl_academy  # Проверить доступ
docker compose logs db  # Смотрим логи БД
```

### SSL-сертификат не работает
```bash
sudo certbot certificates  # Проверить статус
sudo certbot renew --force-renewal  # Принудительно обновить
docker compose restart nginx
```
