# Reset Database (Clean Start)

Since there are old tables from a previous project, here are your options to start fresh:

## Option 1: Reset via Neon Console (Easiest - 2 minutes)

1. Go to [https://console.neon.tech](https://console.neon.tech)
2. Select your project
3. Go to **SQL Editor**
4. Run this query:

```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```

5. Then on your local machine:
```bash
npm run db:generate
npm run db:migrate
```

Done! ✅

## Option 2: Create Fresh Database (Recommended - 3 minutes)

1. In Neon console, create a NEW database:
   - Click "Databases" in sidebar
   - Click "New Database"
   - Name it: `adtrail`
   - Click "Create"

2. Get the NEW connection string:
   - It will be similar to your current one but with `/adtrail` at the end
   - Example: `postgresql://user:pass@host.neon.tech/adtrail?sslmode=require`

3. Update `.env` with the new DATABASE_URL

4. Run migrations:
```bash
npm run db:generate
npm run db:migrate
```

Done! ✅

## Option 3: Delete & Recreate Project (Nuclear option)

If you want to start completely fresh:

1. Delete the current Neon project
2. Create a new one
3. Update `.env` with new connection string
4. Run migrations

## Why This Matters

Having old tables mixed with new ones can cause:
- ❌ Naming conflicts
- ❌ Foreign key issues
- ❌ Migration problems
- ❌ Confusion during development

A clean database ensures everything works perfectly! 🎯
