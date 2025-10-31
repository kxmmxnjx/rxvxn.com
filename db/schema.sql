-- Database schema for rxvxn.com
-- PostgreSQL 14+
-- 
-- Create database:
--   CREATE DATABASE rxvxn;
--   \c rxvxn
--
-- Run this schema:
--   psql -U postgres -d rxvxn -f db/schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  content TEXT,
  image_url VARCHAR(512),
  category VARCHAR(50) NOT NULL CHECK (category IN ('demo', 'art', 'game', 'experiment')),
  tags TEXT[], -- Array of tags
  github_url VARCHAR(512),
  demo_url VARCHAR(512),
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Previews table (for subdomain previews)
CREATE TABLE IF NOT EXISTS previews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subdomain VARCHAR(63) UNIQUE NOT NULL, -- DNS label max 63 chars
  name VARCHAR(255) NOT NULL,
  description TEXT,
  target_url VARCHAR(512),
  owner_name VARCHAR(255),
  owner_email VARCHAR(255),
  active BOOLEAN DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Page views tracking (optional analytics)
CREATE TABLE IF NOT EXISTS page_views (
  id BIGSERIAL PRIMARY KEY,
  path VARCHAR(512) NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  user_agent TEXT,
  ip_address INET,
  referrer VARCHAR(512),
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_tags ON projects USING GIN(tags);

CREATE INDEX IF NOT EXISTS idx_previews_subdomain ON previews(subdomain);
CREATE INDEX IF NOT EXISTS idx_previews_active ON previews(active) WHERE active = true;

CREATE INDEX IF NOT EXISTS idx_page_views_project_id ON page_views(project_id);
CREATE INDEX IF NOT EXISTS idx_page_views_viewed_at ON page_views(viewed_at DESC);

-- Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_previews_updated_at
  BEFORE UPDATE ON previews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comments
COMMENT ON TABLE projects IS 'Portfolio projects, demos, and artworks';
COMMENT ON TABLE previews IS 'Subdomain preview configurations for friends';
COMMENT ON TABLE page_views IS 'Page view analytics';

-- Grant permissions (adjust user as needed)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO rxvxn_user;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO rxvxn_user;
