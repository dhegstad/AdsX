#!/usr/bin/env tsx

import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

config();

async function checkTables() {
  const sql = neon(process.env.DATABASE_URL!);

  console.log("📋 Checking database tables...\n");

  const tables = await sql`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name;
  `;

  if (tables.length === 0) {
    console.log("✨ Database is empty (no tables found)");
    return;
  }

  console.log(`Found ${tables.length} tables:\n`);
  tables.forEach((row, i) => {
    console.log(`${i + 1}. ${row.table_name}`);
  });

  console.log("\n");

  // Check if we have the expected tables
  const expectedTables = [
    'user', 'session', 'account', 'verification',
    'organization', 'member', 'invitation',
    'ad_account', 'monitoring_job', 'change_event', 'api_usage_log', 'audit_log',
    'slack_integration', 'notification_rule', 'notification_log',
    'subscription', 'usage_record', 'payment'
  ];

  const tableNames = tables.map(t => t.table_name);
  const missingTables = expectedTables.filter(t => !tableNames.includes(t));
  const extraTables = tableNames.filter(t => !expectedTables.includes(t) && t !== '__drizzle_migrations');

  if (missingTables.length > 0) {
    console.log("⚠️  Missing expected tables:");
    missingTables.forEach(t => console.log(`   - ${t}`));
    console.log("");
  }

  if (extraTables.length > 0) {
    console.log("⚠️  Extra tables (not in our schema):");
    extraTables.forEach(t => console.log(`   - ${t}`));
    console.log("\n💡 You may want to drop these old tables to start fresh.");
    console.log("   See scripts/reset-db.ts for a clean reset script.\n");
  }

  if (missingTables.length === 0 && extraTables.length === 0) {
    console.log("✅ All expected tables are present!");
    console.log("✅ No extra tables found!");
  }
}

checkTables().catch(console.error);
