-- Allow anon to do all operations on projects (protected by app-level auth)
DROP POLICY IF EXISTS "Allow authenticated all projects" ON projects;
CREATE POLICY "Allow anon all projects"
    ON projects FOR ALL
    TO anon
    USING (true)
    WITH CHECK (true);

-- Allow anon to read all contacts (protected by app-level auth)
DROP POLICY IF EXISTS "Allow authenticated read contacts" ON contacts;
CREATE POLICY "Allow anon read contacts"
    ON contacts FOR SELECT
    TO anon
    USING (true);

-- Allow anon to update contacts status (protected by app-level auth)
CREATE POLICY "Allow anon update contacts"
    ON contacts FOR UPDATE
    TO anon
    USING (true)
    WITH CHECK (true);
