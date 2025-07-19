#!/bin/bash

echo "🚀 Uploading Neural Hub to GitHub..."

# Files that MUST be uploaded for Next.js to work
echo "📁 Essential files to upload:"
echo "✅ package.json"
echo "✅ next.config.js"
echo "✅ tsconfig.json"
echo "✅ src/app/page.tsx"
echo "✅ src/app/layout.tsx"
echo "✅ src/app/globals.css"

echo ""
echo "📋 Instructions:"
echo "1. Go to your GitHub repository: https://github.com/andrewuffman/neural-hub"
echo "2. Click 'Add file' → 'Upload files'"
echo "3. Upload the ENTIRE 'src' folder (drag and drop the whole folder)"
echo "4. Also upload these files from the root:"
echo "   - package.json"
echo "   - next.config.js"
echo "   - tsconfig.json"
echo "5. Commit the changes"
echo "6. Vercel will automatically redeploy"

echo ""
echo "🎯 The key is uploading the ENTIRE 'src' folder, not just individual files!" 