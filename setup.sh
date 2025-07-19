#!/bin/bash

echo "🚀 Setting up AI Content Hub..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "📦 Please install Node.js first:"
    echo "   Visit https://nodejs.org/ and download the LTS version"
    echo "   Or use Homebrew: brew install node"
    echo "   Or use nvm: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not available."
    exit 1
fi

echo "✅ npm is available: $(npm --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Set up environment
if [ ! -f .env.local ]; then
    echo "🔧 Setting up environment variables..."
    cp env.example .env.local
    echo "✅ Created .env.local file"
    echo "⚠️  Please edit .env.local with your configuration values"
fi

# Generate Prisma client
echo "🗄️  Setting up database..."
npx prisma generate

# Push database schema
echo "📊 Creating database..."
npx prisma db push

echo "🎉 Setup complete!"
echo ""
echo "🚀 To start the development server:"
echo "   npm run dev"
echo ""
echo "🌐 Open http://localhost:3000 in your browser"
echo ""
echo "📚 For more information, see README.md" 