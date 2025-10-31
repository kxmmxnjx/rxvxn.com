#!/bin/bash
# setup-server.sh - Initial server setup script for OCI Ubuntu
# Run this on the OCI server to install dependencies and configure environment

set -e

echo "🔧 Setting up rxvxn.com server..."

# Update system
echo "📦 Updating system packages..."
sudo apt update
sudo apt upgrade -y

# Install Nginx
echo "🌐 Installing Nginx..."
sudo apt install -y nginx

# Install Node.js (if using backend)
echo "📗 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL (optional)
read -p "Install PostgreSQL? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "🐘 Installing PostgreSQL..."
  sudo apt install -y postgresql postgresql-contrib
  
  # Create database and user
  read -p "Create database 'rxvxn'? (y/N): " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    sudo -u postgres psql -c "CREATE DATABASE rxvxn;"
    echo "✅ Database 'rxvxn' created"
  fi
fi

# Create directories
echo "📁 Creating directories..."
sudo mkdir -p /var/www/rxvxn.com
sudo mkdir -p /var/www/previews
sudo mkdir -p /var/www/backups/rxvxn.com
sudo mkdir -p /var/log/rxvxn

# Set permissions
echo "🔐 Setting permissions..."
sudo chown -R www-data:www-data /var/www/rxvxn.com
sudo chown -R www-data:www-data /var/www/previews
sudo chown -R $USER:$USER /var/www/backups

# Configure firewall
echo "🔥 Configuring firewall..."
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw --force enable

# Install Certbot (for SSL)
read -p "Install Certbot for SSL? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "🔒 Installing Certbot..."
  sudo apt install -y certbot python3-certbot-nginx
fi

echo ""
echo "✅ Server setup complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Copy Nginx config: scp nginx/rxvxn.conf server:/etc/nginx/sites-available/"
echo "   2. Enable site: sudo ln -s /etc/nginx/sites-available/rxvxn.conf /etc/nginx/sites-enabled/"
echo "   3. Test config: sudo nginx -t"
echo "   4. Reload Nginx: sudo systemctl reload nginx"
echo "   5. Deploy site: ./scripts/deploy.sh"
echo "   6. (Optional) Setup SSL: sudo certbot --nginx -d rxvxn.com -d www.rxvxn.com"
echo ""
echo "🌐 Server is ready at: http://$(curl -s ifconfig.me)"
