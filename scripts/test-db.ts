#!/usr/bin/env tsx

/**
 * Database Connection Test Script
 *
 * Run this to verify your Neon database connection works
 * Usage: npx tsx scripts/test-db.ts
 */

import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

// Load environment variables from .env
config();

async function testConnection() {
  console.log("🔍 Testing database connection...\n");

  if (!process.env.DATABASE_URL) {
    console.error("❌ ERROR: DATABASE_URL environment variable is not set");
    console.log("\nPlease add your Neon connection string to .env:");
    console.log('DATABASE_URL="postgresql://user:pass@host.neon.tech/db?sslmode=require"\n');
    process.exit(1);
  }

  if (process.env.DATABASE_URL === "postgresql://placeholder") {
    console.error("❌ ERROR: DATABASE_URL is still set to placeholder");
    console.log("\nPlease update .env with your actual Neon connection string");
    console.log("Get it from: https://console.neon.tech\n");
    process.exit(1);
  }

  try {
    const sql = neon(process.env.DATABASE_URL);

    console.log("📡 Connecting to database...");
    const result = await sql`SELECT version()`;

    console.log("✅ Connection successful!\n");
    console.log("PostgreSQL version:");
    console.log(result[0].version);
    console.log("\n🎉 Your database is ready!");
    console.log("\nNext steps:");
    console.log("1. Generate migrations: npm run db:generate");
    console.log("2. Run migrations: npm run db:migrate");
    console.log("3. Start dev server: npm run dev\n");

  } catch (error) {
    console.error("❌ Connection failed!\n");

    if (error instanceof Error) {
      console.error("Error message:", error.message);

      if (error.message.includes("format")) {
        console.log("\n💡 TIP: Make sure your connection string includes ?sslmode=require");
        console.log("Example: postgresql://user:pass@host.neon.tech/db?sslmode=require\n");
      } else if (error.message.includes("authentication")) {
        console.log("\n💡 TIP: Check your username and password are correct\n");
      } else if (error.message.includes("connect")) {
        console.log("\n💡 TIP: Check your internet connection and that the host is correct\n");
      }
    }

    process.exit(1);
  }
}

testConnection();
