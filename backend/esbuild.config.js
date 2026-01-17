import { build } from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Плагин для разрешения алиасов
const aliasPlugin = {
  name: 'alias',
  setup(build) {
    build.onResolve({ filter: /^@shared\// }, (args) => {
      let aliasPath = args.path.replace('@shared/', 'src/shared/');

      // Для файлов .ts не добавляем index.ts
      if (aliasPath.endsWith('.service') || aliasPath.includes('.')) {
        aliasPath += '.ts';
      } else {
        aliasPath += '/index.ts';
      }

      return {
        path: path.resolve(__dirname, aliasPath),
      };
    });
  },
};

await build({
  entryPoints: ['src/server.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'esm',
  outfile: 'dist/server.js',
  external: [
    'better-sqlite3',
    'bcrypt',
    'nodemailer',
    'express',
    'cors',
    '@apollo/server',
    '@as-integrations/express4',
    'jsonwebtoken',
    'dotenv',
  ],
  plugins: [aliasPlugin],
  sourcemap: true,
  minify: false,
});
