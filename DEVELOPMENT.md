# Development Guide - rxvxn.com

Complete step-by-step guide for developing and deploying rxvxn.com.

---

## 🏁 Phase 1: Initial Setup (WSL2/Local)

### 1.1 Clone and Setup

```bash
cd ~/project
git clone https://github.com/kxmmxnjx/rxvxn.com.git
cd rxvxn.com
```

### 1.2 Verify Structure

```bash
tree -L 3
# Should show all directories: src/, scripts/, nginx/, etc.
```

### 1.3 Start Development Server

```bash
./scripts/dev.sh        # Default port 8000
# or
./scripts/dev.sh 3000   # Custom port
```

Open browser: `http://localhost:8000`

---

## 🎨 Phase 2: Frontend Development

### 2.1 Core Files Priority Order

#### Week 1: Foundation

1. ✅ CSS System (`base.css`, `theme.css`, `layout.css`)
2. ✅ HTML Template (`index.html`)
3. ✅ Utilities (`utils/dom.js`, `utils/router.js`)

#### Week 2: Components (Atomic Design)

1. ✅ Atoms (`Button.js`, `Card.js`)
2. ✅ Molecules (`ProjectCard.js`)
3. ✅ Organisms (`Navigation.js`, `Header.js`, `Sidebar.js`)
4. ✅ Features (`ProjectGrid.js`)

#### Week 3: Pages & Integration

1. ✅ Main App (`main.js` - routing, page logic)
2. ✅ Additional Pages (`pages/demos.html`, `pages/art.html`)
3. ✅ Data (`data/projects.json`)

### 2.2 Development Workflow

#### Adding a New Component

```bash
# Create component file
touch src/assets/js/components/atoms/NewComponent.js
```

```javascript
// src/assets/js/components/atoms/NewComponent.js
class RxNewComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        /* Component styles */
      </style>
      <div>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('rx-new-component', RxNewComponent);
```

#### Register in HTML

```html
<script type="module" src="/assets/js/components/atoms/NewComponent.js"></script>
```

#### Use in Page

```html
<rx-new-component>Content here</rx-new-component>
```

### 2.3 Testing Locally

#### Browser DevTools Checklist

- ✅ No console errors
- ✅ All components render correctly
- ✅ Responsive design works (toggle device toolbar)
- ✅ Client-side routing works
- ✅ Data loads from JSON

#### Responsive Testing

```bash
# Desktop: 1120px+
# Tablet:  768px - 1119px
# Mobile:  < 768px
```

---

## 🏗️ Phase 3: Build & Deploy

### 3.1 Build for Production

```bash
./scripts/build.sh
```

#### What the build does

- Cleans `public/` directory
- Copies all files from `src/` to `public/`
- Removes comments from CSS/JS (basic optimization)
- Creates `build-info.json`
- Generates file list

#### Verify build

```bash
ls -la public/
# Should contain: index.html, assets/, pages/, etc.
```

### 3.2 Server Setup (OCI - One Time)

#### On OCI Server

```bash
# SSH into server
ssh ubuntu@your-oci-ip

# Run setup script (transferred from local)
chmod +x setup-server.sh
./setup-server.sh
```

#### Manual Steps After Setup

1. **Copy Nginx Config:**

```bash
# From local (WSL2)
scp nginx/rxvxn.conf ubuntu@your-oci-ip:/tmp/

# On server
sudo mv /tmp/rxvxn.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/rxvxn.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

1. **Configure SSH Key (if needed):**

```bash
# On local
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
ssh-copy-id ubuntu@your-oci-ip
```

### 3.3 Deploy to Production

#### From Local (WSL2)

1. **Update deploy.sh configuration:**

```bash
nano scripts/deploy.sh
# Update: SERVER_HOST, SERVER_USER, SSH_KEY
```

1. **Run deployment:**

```bash
./scripts/deploy.sh
```

#### What the deploy does

- Creates backup on server
- Syncs `public/` to `/var/www/rxvxn.com`
- Sets correct permissions
- Reloads Nginx
- Tests deployment

1. **Verify:**

```bash
curl -I http://your-server-ip
# Should return: HTTP/1.1 200 OK
```

---

## 🔧 Phase 4: Backend (Optional)

### 4.1 Local Backend Development

```bash
# Start backend server
cd server
node index.js

# Server runs on http://localhost:3000
# Endpoints:
#   GET    /api/health
#   GET    /api/previews
#   POST   /api/previews
#   PUT    /api/previews/:subdomain
#   DELETE /api/previews/:subdomain
```

#### Test API

```bash
# Health check
curl http://localhost:3000/api/health

# Get previews
curl http://localhost:3000/api/previews

# Create preview
curl -X POST http://localhost:3000/api/previews \
  -H "Content-Type: application/json" \
  -d '{"subdomain":"test","name":"Test Preview"}'
```

### 4.2 Deploy Backend to Server

1. **Transfer server files:**

```bash
scp -r server ubuntu@your-oci-ip:/var/www/rxvxn.com/
```

1. **Setup systemd service:**

```bash
# On server
sudo cp /var/www/rxvxn.com/systemd/rxvxn.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable rxvxn
sudo systemctl start rxvxn
sudo systemctl status rxvxn
```

1. **Update Nginx config:**

```bash
# Uncomment API proxy section in /etc/nginx/sites-available/rxvxn.conf
sudo nano /etc/nginx/sites-available/rxvxn.conf
# Uncomment lines 45-57 (location /api block)
sudo nginx -t
sudo systemctl reload nginx
```

1. **Test:**

```bash
curl http://your-server-ip/api/health
```

---

## 🗄️ Phase 5: Database (Optional)

### 5.1 PostgreSQL Setup

#### On Server (Previews)

```bash
# Create database
sudo -u postgres psql
CREATE DATABASE rxvxn;
\q

# Run schema
sudo -u postgres psql -d rxvxn -f /var/www/rxvxn.com/db/schema.sql

# Run seed data
sudo -u postgres psql -d rxvxn -f /var/www/rxvxn.com/db/seed.sql

# Verify
sudo -u postgres psql -d rxvxn -c "SELECT COUNT(*) FROM projects;"
```

### 5.2 Connect Backend to Database

Install `pg` module (if using Node.js):

```bash
# This requires npm, which violates "no build tools" rule
# Alternative: Use native PostgreSQL client or keep using JSON files
```

---

## 🌐 Phase 6: Subdomain Previews

### 6.1 Publish a Preview

#### On Server

```bash
sudo /var/www/rxvxn.com/scripts/publish-preview.sh

# Follow prompts:
#   Subdomain: john
#   Owner: John Doe
#   Target: https://johndoe.com OR /var/www/previews/john
```

### 6.2 DNS Configuration

#### In your DNS provider (e.g., OCI DNS, Cloudflare)

Add A record:

```text
Type: A
Name: john (or *.rxvxn.com for wildcard)
Value: your-server-ip
TTL: 300
```

Wait for propagation (5 mins - 48 hours).

### 6.3 SSL for Subdomain

```bash
# On server
sudo certbot --nginx -d john.rxvxn.com
```

---

## 🚀 Quick Reference Commands

### Local Development

```bash
./scripts/dev.sh              # Start dev server
./scripts/build.sh            # Build for production
./scripts/deploy.sh           # Deploy to server
```

### Server Management

```bash
# Nginx
sudo systemctl status nginx
sudo systemctl reload nginx
sudo nginx -t

# Backend (if using)
sudo systemctl status rxvxn
sudo systemctl restart rxvxn
sudo journalctl -u rxvxn -f

# Database (if using)
sudo systemctl status postgresql
sudo -u postgres psql -d rxvxn
```

### Logs

```bash
# Nginx access logs
sudo tail -f /var/log/nginx/rxvxn.com-access.log

# Nginx error logs
sudo tail -f /var/log/nginx/rxvxn.com-error.log

# Backend logs
sudo journalctl -u rxvxn -f
```

---

## 📦 Project Checklist

### ✅ Phase 1: Foundation (Complete)

- [x] Directory structure
- [x] CSS system (base, theme, layout)
- [x] HTML template
- [x] Utilities (router, fetcher, DOM)

### ✅ Phase 2: Components (Complete)

- [x] Atoms (Button, Card)
- [x] Molecules (ProjectCard)
- [x] Organisms (Navigation, Header, Sidebar)
- [x] Features (ProjectGrid)
- [x] Main app logic

### ✅ Phase 3: Data & Pages (Complete)

- [x] Projects JSON data
- [x] Additional page templates
- [x] Client-side routing

### ✅ Phase 4: Build & Deploy (Complete)

- [x] Build script
- [x] Deploy script
- [x] Nginx configuration
- [x] Server setup script

### ⏳ Phase 5: Backend (Optional)

- [x] Node.js server
- [x] API endpoints
- [x] Systemd service
- [ ] Database integration (if needed)

### ⏳ Phase 6: Database (Optional)

- [x] PostgreSQL schema
- [x] Seed data
- [ ] Backend-DB connection (if needed)

### ⏳ Phase 7: Subdomain Previews (Optional)

- [x] Preview publish script
- [ ] DNS configuration (manual)
- [ ] SSL setup (manual)

### ⏳ Phase 8: Production

- [ ] Deploy to OCI
- [ ] Configure DNS
- [ ] Setup SSL (Let's Encrypt)
- [ ] Performance testing
- [ ] Mobile testing

---

## 🐛 Troubleshooting

### Issue: Component not rendering

#### Solution (Rendering)

1. Check browser console for errors
2. Verify component is imported in HTML
3. Check for typos in custom element name
4. Ensure `customElements.define()` is called

### Issue: Routing not working

#### Solution (Routing)

1. Verify Nginx `try_files` directive
2. Check router initialization in `main.js`
3. Test with browser DevTools Network tab

### Issue: Data not loading

#### Solution (Data)

1. Check `projects.json` path
2. Verify fetch URL in `ProjectGrid.js`
3. Check browser console for CORS errors
4. Use browser Network tab to inspect request

### Issue: Deployment fails

#### Solution (Deployment)

1. Verify SSH key is configured
2. Check server IP in `deploy.sh`
3. Ensure `build.sh` ran successfully
4. Check server disk space: `df -h`

---

## 📚 Additional Resources

- **Web Components:** <https://developer.mozilla.org/en-US/docs/Web/Web_Components>
- **Atomic Design:** <https://bradfrost.com/blog/post/atomic-web-design/>
- **Nginx Documentation:** <https://nginx.org/en/docs/>
- **Let's Encrypt:** <https://letsencrypt.org/getting-started/>
- **PostgreSQL:** <https://www.postgresql.org/docs/>

---

**Last Updated:** November 1, 2025
**Version:** 1.0.0
