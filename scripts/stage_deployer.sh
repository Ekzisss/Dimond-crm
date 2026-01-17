#!/usr/bin/env bash
set -euo pipefail

IMAGE=ekzis/diamond-crm
PORT=3100
APP=diamond-crm-stage

# 1. Разворачивание докер образа.
docker pull "$IMAGE"

docker rm -f $APP || true

docker run -d \
  --name $APP \
  -v /srv/diamond-crm/data-stage:/app/backend/data \
  -e JWT_SECRET="$JWT_SECRET" \
  -e SMTP_HOST="$SMTP_HOST" \
  -e SMTP_PORT="$SMTP_PORT" \
  -e SMTP_SECURE="$SMTP_SECURE" \
  -e SMTP_USER="$SMTP_USER" \
  -e SMTP_PASSWORD="$SMTP_PASSWORD" \
  -e EMAIL_FROM_NAME="$EMAIL_FROM_NAME" \
  -e FRONTEND_URL="$FRONTEND_URL" \
  -p "${PORT}:3000" \
  "$IMAGE"

echo "Докер образ развёрнут"

# 2. Проверка состояния нового образа.
for i in {1..10}; do
  curl -fs http://localhost:${PORT}/api/health && break
  sleep 2
done

echo "Докер образ ОК"

# 3. Удаляем старые images.
docker image prune -f

echo "✅ Stage deploy finished"
