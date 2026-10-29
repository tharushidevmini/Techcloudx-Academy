import fs from 'fs';
import path from 'path';
import { pool } from '../config/db';

export async function runMigrations() {
  console.log('[MIGRATION] Starting database migrations...');
  const migrationsDir = path.resolve(__dirname, '../../../database/migrations');

  if (!fs.existsSync(migrationsDir)) {
    console.error(`[MIGRATION ERROR] Directory not found: ${migrationsDir}`);
    return;
  }

  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    console.log(`[MIGRATION] Applying migration: ${file}`);
    const sql = fs.readFileSync(filePath, 'utf-8');

    try {
      await pool.query(sql);
      console.log(`[MIGRATION SUCCESS] Applied: ${file}`);
    } catch (err: any) {
      console.error(`[MIGRATION ERROR] In ${file}:`, err.message);
    }
  }

  console.log('[MIGRATION COMPLETE] All schema migrations finished.');
}

if (require.main === module) {
  runMigrations()
    .then(() => pool.end())
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
