#!/bin/bash

echo "🚀 Neural Hub - GitHub Upload Helper"
echo "====================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this from the neural-hub directory."
    exit 1
fi

echo "✅ Found Neural Hub project"
echo ""

# Create .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    echo "📝 Creating .gitignore file..."
    cat > .gitignore << EOF
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# Database
*.db
*.sqlite
*.sqlite3

# IDE
.vscode/
.idea/
EOF
    echo "✅ Created .gitignore"
fi

echo ""
echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. Go to https://github.com/new"
echo "2. Repository name: neural-hub"
echo "3. Description: AI content organization platform"
echo "4. Make it Public"
echo "5. Don't initialize with README (we already have one)"
echo "6. Click 'Create repository'"
echo ""
echo "7. After creating, GitHub will show you commands like:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/neural-hub.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "8. Run those commands in this terminal"
echo ""
echo "🎯 Ready to upload Neural Hub to GitHub!"
echo "" 