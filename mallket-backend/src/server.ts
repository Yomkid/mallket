// src/server.ts
import dotenv from 'dotenv';
dotenv.config(); // 👈 Load env variables from .env

import app from './app';
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`MallKet backend is running on http://localhost:${PORT}`);
});
