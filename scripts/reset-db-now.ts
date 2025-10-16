#!/usr/bin/env tsx

import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

config();

async function resetDatabase() {
  const sql = neon(process.env.DATABASE_URL!);

  console.log("🗑️  Dropping all tables...\n");

  const tables = await sql`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE';
  `;

  console.log(`Found ${tables.length} tables to drop\n`);

  // Build a single DROP statement for all tables
  const dropStatements = tables
    .map(t => `"${t.table_name}"`)
    .join(', ');

  if (dropStatements) {
    // Execute the DROP command
    const query = `DROP TABLE IF EXISTS ${dropStatements} CASCADE`;
    await sql(query);

    tables.forEach(t => console.log(`  ✓ ${t.table_name}`));
    console.log(`\n✅ Dropped all ${tables.length} tables\n`);
  }

  console.log("✅ Database is now clean!\n");
  console.log("📝 Next steps:");
  console.log("1. npm run db:generate");
  console.log("2. npm run db:migrate\n");
}

resetDatabase().catch(console.error);
