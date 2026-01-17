import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Определяем корневую папку проекта
const findProjectRoot = (currentDir: string): string => {
  const packageJsonPath = path.join(currentDir, 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    return currentDir;
  }
  
  const parentDir = path.dirname(currentDir);
  
  if (parentDir === currentDir) {
    throw new Error('Could not find project root (package.json not found)');
  }
  
  return findProjectRoot(parentDir);
};

const projectRoot = findProjectRoot(__dirname);
const dbPath = path.join(projectRoot, 'data', 'database.sqlite');

// Создаем папку data если её нет
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

console.log('Project root:', projectRoot);
console.log('Database path:', dbPath);

/**
 * SQLite база данных
 */
export const db = new Database(dbPath);

/**
 * Инициализация таблиц
 */
export const initDatabase = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS reset_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token TEXT UNIQUE NOT NULL,
      user_id INTEGER NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_reset_tokens_token ON reset_tokens(token);
  `);

  console.log('✅ Database initialized');
};
