#!/bin/bash
# dev.sh - Start local development server
# Uses Python's built-in HTTP server

set -e

PORT=${1:-8000}
SRC_DIR="./src"

echo "🚀 Starting development server..."
echo "📁 Serving: $SRC_DIR"
echo "🌐 URL: http://localhost:$PORT"
echo ""
echo "Press Ctrl+C to stop"
echo ""

cd "$SRC_DIR"
python3 -m http.server "$PORT"
