import 'dotenv/config';
import express from 'express';
import path from 'path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import cors from 'cors';

import { initDatabase } from '@shared/database';
import { typeDefs, resolvers } from '@shared/graphql';
import { createContext } from '@shared/types';

// Инициализация базы данных
initDatabase();

const app = express();
const PORT = 4000;
const root = process.cwd();
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'];

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
  })
);

// API
app.get('/api/health', (_, res) => {
  res.json({ ok: true });
});

// FRONT
app.use(express.static(path.join(root, 'frontend', 'dist')));

app.use((_, res) => {
  res.sendFile(path.join(root, 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.error(`Server running on http://localhost:${PORT}`);
  console.error(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
  process.stdout.write('\n');
});
