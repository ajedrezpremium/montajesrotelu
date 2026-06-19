-- Create contacts table for the contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    company TEXT,
    country TEXT,
    sector TEXT,
    description TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    status TEXT DEFAULT 'new'
);

-- Create projects table for portfolio
CREATE TABLE IF NOT EXISTS projects (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    title TEXT NOT NULL,
    client TEXT,
    sector TEXT,
    country TEXT,
    year TEXT,
    description TEXT,
    dimensions TEXT,
    weight TEXT,
    material TEXT,
    highlights JSONB DEFAULT '[]',
    images JSONB DEFAULT '[]',
    published BOOLEAN DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies (only authenticated users can read)
CREATE POLICY "Allow anonymous insert to contacts"
    ON contacts FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "Allow authenticated read contacts"
    ON contacts FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated all projects"
    ON projects FOR ALL
    TO authenticated
    USING (true);

-- Create index for faster queries
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX idx_projects_published ON projects(published) WHERE published = true;
