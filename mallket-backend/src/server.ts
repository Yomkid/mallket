// src/server.ts
import app from './app';
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`MallKet backend is running on http://localhost:${PORT}`);
});
