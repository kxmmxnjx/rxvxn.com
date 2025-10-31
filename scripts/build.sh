#!/bin/bash
# build.sh - Build script for rxvxn.com
# Copies src/ to public/ with optimizations

set -e  # Exit on error

echo "🔨 Building rxvxn.com..."

# Configuration
SRC_DIR="./src"
BUILD_DIR="./public"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

# Clean previous build
echo "📦 Cleaning previous build..."
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

# Copy all files from src to public
echo "📋 Copying files..."
cp -r "$SRC_DIR"/* "$BUILD_DIR"/

# Optional: Minify CSS (using basic sed for inline comments removal)
echo "🎨 Processing CSS..."
find "$BUILD_DIR/assets/css" -name "*.css" -type f -exec sed -i '/^[[:space:]]*\/\*/,/\*\//d' {} \;

# Optional: Remove source maps and comments from JS
echo "⚙️  Processing JavaScript..."
find "$BUILD_DIR/assets/js" -name "*.js" -type f -exec sed -i '/^[[:space:]]*\/\//d' {} \;

# Create build info file
echo "📝 Creating build info..."
cat > "$BUILD_DIR/build-info.json" << EOF
{
  "buildDate": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "buildId": "$TIMESTAMP",
  "version": "1.0.0"
}
EOF

# Create .htaccess for Apache (if needed)
# Uncomment if using Apache instead of Nginx
# cat > "$BUILD_DIR/.htaccess" << 'EOF'
# RewriteEngine On
# RewriteCond %{REQUEST_FILENAME} !-f
# RewriteCond %{REQUEST_FILENAME} !-d
# RewriteRule ^(.*)$ /index.html [L]
# EOF

# Generate file list
echo "📊 Generating file list..."
find "$BUILD_DIR" -type f > "$BUILD_DIR/file-list.txt"

# Count files
FILE_COUNT=$(find "$BUILD_DIR" -type f | wc -l)
DIR_SIZE=$(du -sh "$BUILD_DIR" | cut -f1)

echo "✅ Build complete!"
echo "📊 Statistics:"
echo "   - Files: $FILE_COUNT"
echo "   - Size: $DIR_SIZE"
echo "   - Output: $BUILD_DIR"
echo ""
echo "🚀 Ready to deploy!"
