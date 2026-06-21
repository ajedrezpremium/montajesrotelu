-- Fix RLS: anon solo puede leer datos públicos e insertar contactos.
-- Admin usa service_role key (bypass RLS), no anon.

-- Projects: anon solo lectura
DROP POLICY IF EXISTS "Allow anon all projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated all projects" ON projects;
CREATE POLICY "Allow anon select projects"
    ON projects FOR SELECT
    TO anon
    USING (published = true);

-- Contacts: anon solo insert, no read/update/delete
DROP POLICY IF EXISTS "Allow anon read contacts" ON contacts;
DROP POLICY IF EXISTS "Allow anon update contacts" ON contacts;
DROP POLICY IF EXISTS "Allow anonymous insert to contacts" ON contacts;
DROP POLICY IF EXISTS "Allow authenticated read contacts" ON contacts;
CREATE POLICY "Allow anon insert contacts"
    ON contacts FOR INSERT
    TO anon
    WITH CHECK (true);

-- Team members: anon solo lectura
DROP POLICY IF EXISTS "Allow anon all team_members" ON team_members;
CREATE POLICY "Allow anon select team_members"
    ON team_members FOR SELECT
    TO anon
    USING (published = true);

-- Testimonials: anon solo lectura
DROP POLICY IF EXISTS "Allow anon select testimonials" ON testimonials;
CREATE POLICY "Allow anon select testimonials"
    ON testimonials FOR SELECT
    TO anon
    USING (published = true);
