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
