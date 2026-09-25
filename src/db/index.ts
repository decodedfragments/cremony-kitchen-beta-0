import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
  __arenaNextJsPostgresqlPoolUrl?: string;
};

// The dev-mode pool survives HMR, so rebuild it if DATABASE_URL changed
// (e.g. after an integration is connected) instead of reusing a stale one.
const cachedPool =
  globalForDb.__arenaNextJsPostgresqlPoolUrl === databaseUrl
    ? globalForDb.__arenaNextJsPostgresqlPool
    : undefined;

if (!cachedPool && globalForDb.__arenaNextJsPostgresqlPool) {
  void globalForDb.__arenaNextJsPostgresqlPool.end().catch(() => {});
}

export const pool =
  cachedPool ??
  new Pool({
    connectionString: databaseUrl,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
  globalForDb.__arenaNextJsPostgresqlPoolUrl = databaseUrl;
}

export const db = drizzle(pool);
