#!/usr/bin/env bash
set -euo pipefail

IMAGE=ekzis/diamond-crm
NGINX_CONF=/etc/nginx/sites-available/diamond-crm

echo "Active: $ACTIVE $OLD_PORT → Deploying: $NEW $NEW_PORT"

# 2. Разворачивание докер образа.
docker pull "$IMAGE"

docker rm -f "${APP}-${NEW}" || true

docker run -d \
  -v /srv/diamond-crm/data:/app/backend/data \
  -e JWT_SECRET="${JWT_SECRET}" \
  -e SMTP_HOST="${SMTP_HOST}" \
  -e SMTP_PORT="${SMTP_PORT}" \
  -e SMTP_SECURE="${SMTP_SECURE}" \
  -e SMTP_USER="${SMTP_USER}" \
  -e SMTP_PASSWORD="${SMTP_PASSWORD}" \
  -e EMAIL_FROM_NAME="${EMAIL_FROM_NAME}" \
  -e FRONTEND_URL="${FRONTEND_URL}" \
  --name "${APP}-${NEW}" \
  -p "${NEW_PORT}:3000" \
  "$IMAGE"

echo "Докер образ развёрнут"

# 3. Проверка состояния нового образа.
for i in {1..10}; do
  curl -fs http://localhost:${NEW_PORT}/api/health && break
  sleep 2
done

echo "Докер образ ОК"

# 4. Изменение активного порта.
sudo sed -i "s/127.0.0.1:${OLD_PORT}/127.0.0.1:${NEW_PORT}/" "$NGINX_CONF"
sudo systemctl restart nginx

echo "Порт изменён на $NEW_PORT"

# 5. Остановка и удаление прошлого докер контейнера.
docker stop "${APP}-${ACTIVE}" || true
docker rm "${APP}-${ACTIVE}" || true

echo "Докер контейнер ${APP}-${ACTIVE} удалён"

# 6. Удаляем старые images.
docker image prune -f

echo "✅ Deploy finished"
