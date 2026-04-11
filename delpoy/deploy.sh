#!/bin/bash

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Путь к сайту (можно передать как аргумент или задать по умолчанию)
SITE_DIR="/var/www/kitkars/kitkars.ru"
ENV_FILE="$SITE_DIR/.env"
COMPOSE_FILE="$SITE_DIR/docker-compose.yaml"
SCRIPTS_DIR="/var/www/kitkars/shared-scripts"

echo -e "${GREEN}🚀 Настройка сайта в $SITE_DIR${NC}"

# Проверяем существование .env
if [ ! -f "$ENV_FILE" ]; then
    echo -e "${RED}❌ Файл .env не найден в $SITE_DIR${NC}"
    exit 1
fi

# Проверяем существование скриптов
if [ ! -d "$SCRIPTS_DIR" ]; then
    echo -e "${RED}❌ Директория скриптов не найдена: $SCRIPTS_DIR${NC}"
    exit 1
fi

# Создаём папку для данных
mkdir -p "$SITE_DIR/content-data"

# Запускаем обновление контента
echo -e "${YELLOW}🔄 Обновляем контент...${NC}"
node "$SCRIPTS_DIR/updateContent.js" "$ENV_FILE" "$SITE_DIR/content-data/"

# Извлекаем DOMEN из .env
DOMEN=$(grep ^DOMEN= "$ENV_FILE" | cut -d '=' -f2- | tr -d '"' | tr -d "'")
if [ -z "$DOMEN" ]; then
    echo -e "${RED}❌ Переменная DOMEN не найдена в .env${NC}"
    exit 1
fi

# Убираем http:// или https:// из домена
DOMEN=$(echo "$DOMEN" | sed -E 's|^https?://||' | sed 's|/.*$||')

# Извлекаем порт из docker-compose.yml
if [ ! -f "$COMPOSE_FILE" ]; then
    echo -e "${RED}❌ docker-compose.yml не найден в $SITE_DIR${NC}"
    exit 1
fi

PORT=$(grep -A5 "ports:" "$COMPOSE_FILE" | grep -oP '\d+(?=:3000)' | head -1)
if [ -z "$PORT" ]; then
    echo -e "${YELLOW}⚠️  Порт не найден, используем 30080 по умолчанию${NC}"
    PORT=30080
fi

echo -e "${GREEN}✅ Сайт: $SITE_DIR${NC}"
echo -e "${GREEN}✅ Домен: $DOMEN${NC}"
echo -e "${GREEN}✅ Порт: $PORT${NC}"

# Создаем nginx конфиг
NGINX_CONF="/etc/nginx/sites-available/$DOMEN"

echo -e "${YELLOW}📝 Создаем nginx конфиг $NGINX_CONF${NC}"

cat > "$NGINX_CONF" << EOF
server {
    listen 80;
    server_name $DOMEN;
    
    access_log /var/log/nginx/${DOMEN}_access.log;
    error_log /var/log/nginx/${DOMEN}_error.log;

    # Увеличиваем таймауты и отключаем буферизацию
    proxy_connect_timeout 300s;
    proxy_send_timeout 300s;
    proxy_read_timeout 300s;
    proxy_buffering off;
    proxy_request_buffering off;
    proxy_max_temp_file_size 0;

    location / {
        proxy_pass http://localhost:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location /_next/static {
        proxy_pass http://localhost:$PORT/_next/static;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /static {
        proxy_pass http://localhost:$PORT/static;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location ~* \.(webp|jpg|jpeg|png|gif|svg|ico)$ {
        proxy_pass http://localhost:$PORT;
        proxy_buffering off;
        proxy_request_buffering off;
        proxy_read_timeout 300s;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

echo -e "${GREEN}✅ nginx конфиг создан${NC}"

# Активируем сайт
ln -sf "$NGINX_CONF" "/etc/nginx/sites-enabled/"

# Проверяем конфиг nginx
echo -e "${YELLOW}🔍 Проверяем конфиг nginx...${NC}"
nginx -t

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Конфиг корректен, перезагружаем nginx...${NC}"
    systemctl reload nginx
    
    # Получаем SSL сертификат
    echo -e "${YELLOW}🔐 Получаем SSL сертификат для $DOMEN...${NC}"
    certbot --nginx -d "$DOMEN" --non-interactive --agree-tos --email "admin@$DOMEN" || {
        echo -e "${YELLOW}⚠️  Пробуем в интерактивном режиме...${NC}"
        certbot --nginx -d "$DOMEN"
    }
    
    echo -e "${GREEN}🎉 Сайт $DOMEN готов!${NC}"
    echo -e "${GREEN}   https://$DOMEN${NC}"
else
    echo -e "${RED}❌ Ошибка в конфиге nginx. Проверьте вручную.${NC}"
    exit 1
fi
