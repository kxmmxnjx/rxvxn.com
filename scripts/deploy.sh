#!/bin/bash
# deploy.sh - Deploy to OCI server
# Syncs public/ directory to remote server

set -e

echo "🚀 Deploying rxvxn.com..."

# Configuration - UPDATE THESE VALUES
SERVER_USER="ubuntu"
SERVER_HOST="your-oci-server-ip"  # Replace with your OCI IP
SERVER_PATH="/var/www/rxvxn.com"
LOCAL_BUILD_DIR="./public"
SSH_KEY="$HOME/.ssh/id_rsa"  # Update if using different key

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if build directory exists
if [ ! -d "$LOCAL_BUILD_DIR" ]; then
  echo "❌ Build directory not found. Run ./scripts/build.sh first."
  exit 1
fi

# Confirm deployment
echo -e "${YELLOW}⚠️  About to deploy to:${NC}"
echo "   Server: $SERVER_USER@$SERVER_HOST"
echo "   Path: $SERVER_PATH"
echo ""
read -p "Continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ Deployment cancelled."
  exit 0
fi

# Create backup on server
echo "💾 Creating backup on server..."
ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_HOST" << 'ENDSSH'
  BACKUP_DIR="/var/www/backups/rxvxn.com"
  mkdir -p "$BACKUP_DIR"
  TIMESTAMP=$(date +%Y%m%d-%H%M%S)
  
  if [ -d "/var/www/rxvxn.com" ]; then
    tar -czf "$BACKUP_DIR/backup-$TIMESTAMP.tar.gz" -C /var/www rxvxn.com
    echo "✅ Backup created: backup-$TIMESTAMP.tar.gz"
    
    # Keep only last 5 backups
    cd "$BACKUP_DIR"
    ls -t backup-*.tar.gz | tail -n +6 | xargs -r rm
  fi
ENDSSH

# Sync files to server
echo "📤 Syncing files to server..."
rsync -avz --delete \
  -e "ssh -i $SSH_KEY" \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='*.log' \
  "$LOCAL_BUILD_DIR/" \
  "$SERVER_USER@$SERVER_HOST:$SERVER_PATH/"

# Set correct permissions
echo "🔐 Setting permissions..."
ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_HOST" << 'ENDSSH'
  sudo chown -R www-data:www-data /var/www/rxvxn.com
  sudo find /var/www/rxvxn.com -type f -exec chmod 644 {} \;
  sudo find /var/www/rxvxn.com -type d -exec chmod 755 {} \;
ENDSSH

# Reload Nginx
echo "🔄 Reloading Nginx..."
ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_HOST" 'sudo systemctl reload nginx'

# Test deployment
echo "🧪 Testing deployment..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "http://$SERVER_HOST" || echo "000")

if [ "$RESPONSE" = "200" ]; then
  echo -e "${GREEN}✅ Deployment successful!${NC}"
  echo "🌐 Site is live at: http://$SERVER_HOST"
else
  echo -e "${YELLOW}⚠️  Deployment completed but site returned status: $RESPONSE${NC}"
  echo "Please check the server logs."
fi

echo ""
echo "📋 Post-deployment checklist:"
echo "   1. Visit the site and test functionality"
echo "   2. Check browser console for errors"
echo "   3. Test on mobile devices"
echo "   4. Verify all routes work correctly"
