#!/bin/bash
# publish-preview.sh - Publish a new subdomain preview
# Creates Nginx config and updates DNS (manual DNS update required)

set -e

echo "🌐 Publishing Subdomain Preview"

# Configuration
NGINX_SITES_DIR="/etc/nginx/sites-available"
NGINX_ENABLED_DIR="/etc/nginx/sites-enabled"
PREVIEW_DIR="/var/www/previews"

# Get input
read -p "Subdomain name (e.g., 'john' for john.rxvxn.com): " SUBDOMAIN
read -p "Owner name: " OWNER_NAME
read -p "Target URL or local path: " TARGET

# Validate subdomain
if [[ ! "$SUBDOMAIN" =~ ^[a-z0-9-]+$ ]]; then
  echo "❌ Invalid subdomain. Use only lowercase letters, numbers, and hyphens."
  exit 1
fi

DOMAIN="${SUBDOMAIN}.rxvxn.com"
CONFIG_FILE="${NGINX_SITES_DIR}/${DOMAIN}"

echo ""
echo "Creating preview for: $DOMAIN"
echo "Owner: $OWNER_NAME"
echo "Target: $TARGET"
echo ""
read -p "Continue? (y/N): " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ Cancelled."
  exit 0
fi

# Create Nginx configuration
echo "📝 Creating Nginx configuration..."

cat > "$CONFIG_FILE" << EOF
# Subdomain preview: $DOMAIN
# Owner: $OWNER_NAME
# Created: $(date)

server {
    listen 80;
    listen [::]:80;
    
    server_name $DOMAIN;
    
    # Logging
    access_log /var/log/nginx/${DOMAIN}-access.log;
    error_log /var/log/nginx/${DOMAIN}-error.log;
    
EOF

# Check if target is a URL or local path
if [[ "$TARGET" =~ ^https?:// ]]; then
  # Proxy to external URL
  cat >> "$CONFIG_FILE" << EOF
    location / {
        proxy_pass $TARGET;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
EOF
else
  # Serve from local directory
  mkdir -p "${PREVIEW_DIR}/${SUBDOMAIN}"
  
  cat >> "$CONFIG_FILE" << EOF
    root ${PREVIEW_DIR}/${SUBDOMAIN};
    index index.html;
    
    location / {
        try_files \$uri \$uri/ /index.html;
    }
EOF
fi

cat >> "$CONFIG_FILE" << EOF
}
EOF

echo "✅ Config created: $CONFIG_FILE"

# Enable site
echo "🔗 Enabling site..."
ln -sf "$CONFIG_FILE" "${NGINX_ENABLED_DIR}/${DOMAIN}"

# Test Nginx config
echo "🧪 Testing Nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
  echo "✅ Nginx config is valid"
  
  # Reload Nginx
  echo "🔄 Reloading Nginx..."
  systemctl reload nginx
  
  echo ""
  echo "✅ Preview published successfully!"
  echo ""
  echo "📋 Next steps:"
  echo "   1. Add DNS A record: $SUBDOMAIN -> your-server-ip"
  echo "   2. Wait for DNS propagation (up to 48 hours)"
  echo "   3. Test: http://$DOMAIN"
  echo "   4. (Optional) Setup SSL: certbot --nginx -d $DOMAIN"
else
  echo "❌ Nginx config test failed"
  rm "${NGINX_ENABLED_DIR}/${DOMAIN}"
  exit 1
fi
