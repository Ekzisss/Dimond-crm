#!/usr/bin/env bash
set -euo pipefail

APP=diamond-crm

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

export APP ACTIVE NEW OLD_PORT NEW_PORT

docker rm -f diamond-crm-stage || true

/tmp/scripts/deploy-blue-green.sh
