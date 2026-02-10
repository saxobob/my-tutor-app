import { defineConfig } from '@prisma/config';
import 'dotenv/config'; // <--- ADD THIS LINE

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});