#!/bin/bash

echo "🚀 AdTrail - Database Setup Script"
echo "=================================="
echo ""

# Generate a secure auth secret
echo "📝 Generating secure BETTER_AUTH_SECRET..."
AUTH_SECRET=$(openssl rand -base64 32)

echo ""
echo "✅ Generated secure authentication secret"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Sign up for a free Neon database at: https://neon.tech"
echo "2. Create a new project"
echo "3. Copy your connection string (it looks like: postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require)"
echo ""
echo "4. Update your .env file with these values:"
echo ""
echo "# Database"
echo "DATABASE_URL=\"YOUR_NEON_CONNECTION_STRING_HERE\""
echo ""
echo "# Better Auth"
echo "BETTER_AUTH_SECRET=\"$AUTH_SECRET\""
echo "BETTER_AUTH_URL=http://localhost:3000"
echo ""
echo "# App"
echo "NEXT_PUBLIC_APP_URL=http://localhost:3000"
echo ""
echo "5. Then run: npm run db:generate && npm run db:migrate"
echo ""
