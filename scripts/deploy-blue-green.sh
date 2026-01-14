#!/usr/bin/env bash
set -euo pipefail

IMAGE=ekzis/diamond-crm
APP=diamond-crm
NGINX_CONF=/etc/nginx/sites-available/diamond-crm

# 1. Определение green & blue.
if docker ps --format '{{.Names}}' | grep -q "${APP}-blue"; then
  ACTIVE=blue
  NEW=green
  OLD_PORT=3000
  NEW_PORT=3001
else
  ACTIVE=green
  NEW=blue
  OLD_PORT=3001
  NEW_PORT=3000
fi

echo "Active: $ACTIVE $OLD_PORT → Deploying: $NEW $NEW_PORT"

# 2. Разворачивание докер образа.
docker pull "$IMAGE"

docker rm -f "${APP}-${NEW}" || true

docker run -d \
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
docker stop "${APP}-${ACTIVE}"
docker rm "${APP}-${ACTIVE}"

echo "Докер контейнер ${APP}-${ACTIVE} удалён"

# 6. Удаляем старый image.

# Получаем IMAGE ID образа с тегом latest
LATEST_ID=$(docker images -q "${IMAGE}:latest")

# Получаем все IMAGE ID репозитория, кроме latest
OLD_IMAGES=$(docker images -q "$IMAGE" | grep -v "$LATEST_ID")

echo "Докер образы $OLD_IMAGES"

if [ -n "$OLD_IMAGES" ]; then
  for img in $OLD_IMAGES; do
    docker rmi -f "$img" && echo "Old image removed: $img"
  done
fi

echo "✅ Deploy finished"