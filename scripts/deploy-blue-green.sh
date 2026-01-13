#!/usr/bin/env bash
set -euo pipefail

IMAGE=ekzis/diamond-crm:latest
APP=diamond-crm
NGINX_CONF=/etc/nginx/sites-available/diamond-crm

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

echo "Active: $ACTIVE → Deploying: $NEW"

docker pull "$IMAGE"

docker rm -f "${APP}-${NEW}" || true

docker run -d \
  --name "${APP}-${NEW}" \
  -p "${NEW_PORT}:3000" \
  "$IMAGE"

# проверка здоровья
for i in {1..10}; do
  curl -fs http://localhost:${NEW_PORT}/api/health && break
  sleep 2
done

sed -i "s/127.0.0.1:${OLD_PORT}/127.0.0.1:${NEW_PORT}/" "$NGINX_CONF"
nginx -s reload

docker stop "${APP}-${ACTIVE}"
docker rm "${APP}-${ACTIVE}"


# ===== Удаляем старый image =====
# Определяем ID старого образа
OLD_IMAGE=$(docker images -q "${IMAGE}")

# Удаляем старый образ (если есть)
if [ -n "$OLD_IMAGE" ]; then
  docker rmi -f "$OLD_IMAGE" || true
  echo "Old image removed: $OLD_IMAGE"
fi

echo "✅ Deploy finished"