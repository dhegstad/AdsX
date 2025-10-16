#!/usr/bin/env tsx

import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import * as readline from "readline";

config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function resetDatabase() {
  const sql = neon(process.env.DATABASE_URL!);

  console.log("🗑️  Database Reset Tool\n");
  console.log("⚠️  WARNING: This will DROP ALL TABLES in your database!");
  console.log("This action CANNOT be undone.\n");

  const confirm = await ask("Are you sure you want to continue? (type 'yes' to confirm): ");

  if (confirm.toLowerCase() !== "yes") {
    console.log("\n❌ Reset cancelled.");
    rl.close();
    process.exit(0);
  }

  console.log("\n📋 Fetching all tables...");

  const tables = await sql`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE';
  `;

  if (tables.length === 0) {
    console.log("✨ Database is already empty!");
    rl.close();
    return;
  }

  console.log(`\nFound ${tables.length} tables to drop:`);
  tables.forEach((t) => console.log(`  - ${t.table_name}`));

  const finalConfirm = await ask("\nProceed with dropping all tables? (type 'DROP' to confirm): ");

  if (finalConfirm !== "DROP") {
    console.log("\n❌ Reset cancelled.");
    rl.close();
    process.exit(0);
  }

  console.log("\n🗑️  Dropping all tables...");

  // Drop all tables (CASCADE to handle foreign keys)
  for (const table of tables) {
    try {
      await sql(`DROP TABLE IF EXISTS "${table.table_name}" CASCADE`);
      console.log(`  ✓ Dropped ${table.table_name}`);
    } catch (error) {
      console.error(`  ✗ Failed to drop ${table.table_name}:`, error);
    }
  }

  console.log("\n✅ Database reset complete!");
  console.log("\n📝 Next steps:");
  console.log("1. Generate fresh migrations: npm run db:generate");
  console.log("2. Apply migrations: npm run db:migrate");
  console.log("3. Start dev server: npm run dev\n");

  rl.close();
}

resetDatabase().catch((error) => {
  console.error("\n❌ Error:", error);
  rl.close();
  process.exit(1);
});
