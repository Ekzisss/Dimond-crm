import 'dotenv/config';
import express from 'express';
import path from 'path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import cors from 'cors';
import { fileURLToPath } from 'url';

import { initDatabase } from '@shared/database';
import { typeDefs, resolvers } from '@shared/graphql';
import { createContext } from '@shared/types';

// Инициализация базы данных
initDatabase();

const app = express();
const PORT = 3000;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// backend/src → backend
// backend/dist → backend
const BACKEND_ROOT = path.resolve(__dirname, '..');

const PROJECT_ROOT = path.resolve(BACKEND_ROOT, '..');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

console.log('Server started');

app.use(
  '/graphql',
  cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }: { req: express.Request }) => createContext(req),
  }),
);

// API
app.get('/api/health', (_, res) => {
  res.json({ ok: true });
});

// Основная страница - лендинг
app.get('/', (_, res) => {
  res.sendFile(path.join(PROJECT_ROOT, 'frontend', 'dist', 'landing.html'));
});

// FRONT
app.use(express.static(path.join(PROJECT_ROOT, 'frontend', 'dist')));

// Все остальные маршруты - основное приложение
app.use((_, res) => {
  res.sendFile(path.join(PROJECT_ROOT, 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
  process.stdout.write('\n');
});
