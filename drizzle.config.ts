import type { Config } from "drizzle-kit";

export default {
  schema: "./src/server/schema.ts",
  driver: "pg",
  out: "./src/server/migrations",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL ?? "",
  },
} satisfies Config;
