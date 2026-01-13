import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;
const root = process.cwd();

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
  console.log(`Server running on http://localhost:${PORT}`);
});
