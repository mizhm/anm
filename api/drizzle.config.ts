import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';
dotenv.config();

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '123456aA@',
    database: process.env.DB_NAME || 'employees',
  },
});
