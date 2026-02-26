-- Applications table for Pre-incubación START Lima
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Personal Information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  age INTEGER NOT NULL CHECK (age >= 18 AND age <= 25),
  city TEXT NOT NULL,
  institution TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Program Questions
  motivation TEXT NOT NULL,
  business_idea TEXT,
  availability_confirmed BOOLEAN NOT NULL,
  weekly_hours TEXT NOT NULL CHECK (weekly_hours IN ('2-5h', '5-10h', '10+h')),
  previous_experience TEXT,
  community TEXT,
  
  -- Status tracking
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'accepted', 'rejected')),
  
  -- Email validation constraint
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

-- Index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);

-- Index for status filtering
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);

-- Enable Row Level Security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit an application
CREATE POLICY "Anyone can submit application"
  ON applications
  FOR INSERT
  WITH CHECK (true);

-- Policy: Only authenticated users can view applications (for admin panel later)
CREATE POLICY "Admins can view applications"
  ON applications
  FOR SELECT
  USING (auth.role() = 'authenticated');
