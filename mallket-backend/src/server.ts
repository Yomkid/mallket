// src/server.ts
import dotenv from 'dotenv';
dotenv.config(); // 👈 Load env variables from .env

import app from './app';
const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MallKet backend is running on port ${PORT}`);
});




