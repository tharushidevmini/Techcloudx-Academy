-- ==============================================================================
-- TechCloudX Academy - Migration 002: Course Catalog & Batch Enhancements
-- Architecture: Industrial-grade Cloud Training Management Platform (LMS)
-- Database Engine: PostgreSQL 16+
-- ==============================================================================

-- 1. Enhance courses table with certification code, categories, dual pricing, syllabus & technologies
ALTER TABLE courses 
    ADD COLUMN IF NOT EXISTS certification_code VARCHAR(50),
    ADD COLUMN IF NOT EXISTS category VARCHAR(100) NOT NULL DEFAULT 'Azure Cloud',
    ADD COLUMN IF NOT EXISTS price_lkr INTEGER NOT NULL DEFAULT 0 CHECK (price_lkr >= 0),
    ADD COLUMN IF NOT EXISTS price_usd INTEGER NOT NULL DEFAULT 0 CHECK (price_usd >= 0),
    ADD COLUMN IF NOT EXISTS duration VARCHAR(100) DEFAULT '6 Weeks',
    ADD COLUMN IF NOT EXISTS syllabus JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS technologies JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS badge_text VARCHAR(100);

-- 2. Enhance batches table with schedules, end dates, and enrolled counts
ALTER TABLE batches
    ADD COLUMN IF NOT EXISTS schedule VARCHAR(255) NOT NULL DEFAULT 'Weekends | 07:00 PM - 10:00 PM IST',
    ADD COLUMN IF NOT EXISTS end_date DATE,
    ADD COLUMN IF NOT EXISTS enrolled_count INTEGER NOT NULL DEFAULT 0 CHECK (enrolled_count >= 0);

-- 3. Add Indexes for Catalog & Filter Queries
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_cert_code ON courses(certification_code);
CREATE INDEX IF NOT EXISTS idx_batches_schedule ON batches(schedule);
