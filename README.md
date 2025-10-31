# rxvxn.com

Personal portfolio site showcasing technical demos (WebSocket, WebAssembly, web games) and computer art, with subdomain preview functionality.

## Design Concept

- White background, black text, 1px black borders (right angles)
- Font: Cascadia Code
- Desktop: 3-column layout (left nav / center content / right auxiliary)
- Responsive breakpoints: 1120px / 768px / 480px

## Tech Stack

- **Frontend**: Vanilla HTML/CSS/JS, Web Components (Atomic Design)
- **Backend**: Optional Node.js (http module) for `/api/previews`
- **Data**: Static JSON → PostgreSQL (future)
- **Server**: OCI Ubuntu + Nginx + systemd
- **Dev Environment**: WSL2 Ubuntu + VSCode

## Directory Structure

```bash
rxvxn.com/
├─ src/
│  ├─ index.html
│  ├─ pages/
│  └─ assets/
│      ├─ css/{base,theme,layout}.css
│      ├─ js/
│      │   ├─ main.js
│      │   ├─ utils/
│      │   └─ components/{atoms,molecules,organisms,features}
│      └─ data/projects.json
├─ public/                # Build output
├─ server/                # (Optional) Node server
├─ nginx/rxvxn.conf
├─ systemd/rxvxn.service
├─ db/{schema.sql,seed.sql}
└─ scripts/{build.sh,deploy.sh,publish-preview.sh}
```

## Development Flow

1. Local development (WSL2)
2. Build via `scripts/build.sh`
3. Deploy to OCI via `scripts/deploy.sh`

## Getting Started

```bash
# Local development
cd src
python3 -m http.server 8000

# Build
./scripts/build.sh

# Deploy
./scripts/deploy.sh
```
