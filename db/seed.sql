-- Seed data for rxvxn.com database
-- Run after schema.sql:
--   psql -U postgres -d rxvxn -f db/seed.sql

-- Insert sample projects
INSERT INTO projects (title, slug, description, category, tags, github_url, demo_url, featured, published) VALUES
(
  'WebSocket Chat',
  'websocket-chat',
  'Real-time chat application using WebSocket protocol with room support and message history.',
  'demo',
  ARRAY['WebSocket', 'Real-time', 'JavaScript'],
  'https://github.com/kxmmxnjx/websocket-chat',
  '/demos/websocket-chat',
  true,
  true
),
(
  'WebAssembly Image Filter',
  'wasm-image-filter',
  'High-performance image processing using WebAssembly. Apply filters in real-time with C++ compiled to WASM.',
  'demo',
  ARRAY['WebAssembly', 'C++', 'Image Processing'],
  'https://github.com/kxmmxnjx/wasm-filter',
  '/demos/wasm-filter',
  true,
  true
),
(
  'Flow Field Particles',
  'flow-field-particles',
  'Generative art piece using flow fields and particle systems. Created with Canvas API.',
  'art',
  ARRAY['Generative Art', 'Canvas', 'Animation'],
  NULL,
  '/art/flow-field',
  false,
  true
),
(
  'Retro Space Shooter',
  'retro-space-shooter',
  'Classic space shooter game with pixel art graphics. Built with vanilla JavaScript and Canvas.',
  'game',
  ARRAY['Game', 'Canvas', 'Pixel Art'],
  'https://github.com/kxmmxnjx/space-shooter',
  '/demos/space-shooter',
  true,
  true
),
(
  'Neural Network Visualizer',
  'neural-network-viz',
  'Interactive visualization of a simple neural network learning XOR function.',
  'demo',
  ARRAY['Machine Learning', 'Visualization', 'Canvas'],
  NULL,
  '/demos/neural-viz',
  false,
  true
),
(
  'Fractal Explorer',
  'fractal-explorer',
  'Interactive Mandelbrot and Julia set explorer with zoom and color customization.',
  'art',
  ARRAY['Fractals', 'Mathematics', 'Canvas'],
  NULL,
  '/art/fractals',
  false,
  true
);

-- Insert sample previews
INSERT INTO previews (subdomain, name, description, target_url, owner_name, active) VALUES
(
  'demo',
  'Demo Preview',
  'Demo subdomain for testing preview functionality',
  'https://example.com',
  'Admin',
  true
);

-- Update view counts (simulate some traffic)
UPDATE projects SET view_count = floor(random() * 1000)::int WHERE published = true;

-- Verify data
SELECT COUNT(*) as project_count FROM projects;
SELECT COUNT(*) as preview_count FROM previews;

-- Display inserted projects
SELECT title, category, featured, published, created_at FROM projects ORDER BY created_at DESC;
