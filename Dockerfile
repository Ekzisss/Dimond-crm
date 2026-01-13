# 1️⃣ Базовый Node
FROM node:22-alpine

# 2️⃣ Рабочая папка
WORKDIR /app

# 3️⃣ Копируем package.json и yarn.lock для backend и frontend
COPY backend/package.json backend/yarn.lock ./backend/
COPY frontend/package.json frontend/yarn.lock ./frontend/

# 4️⃣ Устанавливаем зависимости
RUN cd backend && yarn install --frozen-lockfile
RUN cd frontend && yarn install --frozen-lockfile

# 5️⃣ Копируем исходники
COPY backend ./backend
COPY frontend ./frontend

# 6️⃣ Билдим frontend
RUN cd frontend && yarn build

# 7️⃣ Билдим backend
RUN cd backend && yarn build

# 8️⃣ Экспонируем порт
EXPOSE 3000

# 9️⃣ Устанавливаем PM2 для запуска backend
RUN yarn global add pm2

# 10️⃣ Команда запуска
CMD ["pm2-runtime", "backend/dist/server.js", "--name", "app"]
