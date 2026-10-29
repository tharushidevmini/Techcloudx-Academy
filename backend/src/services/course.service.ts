import { query } from '../config/db';
import { Course, Batch, CourseFilters } from '../models/course.types';
import { SEED_COURSES, SEED_BATCHES } from '../data/seedData';

class CourseService {
  /**
   * Helper to format raw DB course row into typed Course object
   */
  private formatDbCourse(row: any, batches: Batch[] = []): Course {
    const rawSyllabus = typeof row.syllabus === 'string' ? JSON.parse(row.syllabus) : row.syllabus || [];
    const rawTech = typeof row.technologies === 'string' ? JSON.parse(row.technologies) : row.technologies || [];

    const upcomingBatches = batches.filter((b) => b.status === 'upcoming');
    const sortedBatches = [...upcomingBatches].sort(
      (a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    );
    const nextBatch = sortedBatches.length > 0 ? sortedBatches[0] : null;

    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      certification_code: row.certification_code || '',
      category: row.category || 'Azure Cloud',
      description: row.description || '',
      price_cents: Number(row.price_cents) || 0,
      price_usd: Number(row.price_usd) || Math.round((Number(row.price_cents) || 0) / 100),
      price_lkr: Number(row.price_lkr) || 35000,
      level: row.level,
      duration: row.duration || '6 Weeks',
      badge_text: row.badge_text || '',
      technologies: Array.isArray(rawTech) ? rawTech : [],
      syllabus: Array.isArray(rawSyllabus) ? rawSyllabus : [],
      is_published: row.is_published ?? true,
      active_batches_count: upcomingBatches.length,
      next_batch: nextBatch,
      batches: batches,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  /**
   * Helper to format raw DB batch row into typed Batch object
   */
  private formatDbBatch(row: any): Batch {
    const maxCapacity = Number(row.max_capacity) || 20;
    const enrolled = Number(row.enrolled_count) || 0;
    const seatsAvailable = Math.max(0, maxCapacity - enrolled);

    return {
      id: row.id,
      course_id: row.course_id,
      course_title: row.course_title,
      course_slug: row.course_slug,
      batch_code: row.batch_code,
      start_date: typeof row.start_date === 'string' ? row.start_date.split('T')[0] : new Date(row.start_date).toISOString().split('T')[0],
      end_date: row.end_date ? (typeof row.end_date === 'string' ? row.end_date.split('T')[0] : new Date(row.end_date).toISOString().split('T')[0]) : undefined,
      schedule: row.schedule || 'Weekends | 07:00 PM - 10:00 PM IST',
      max_capacity: maxCapacity,
      enrolled_count: enrolled,
      seats_available: seatsAvailable,
      seats_left: seatsAvailable,
      is_available: seatsAvailable > 0,
      meeting_link: row.meeting_link,
      status: row.status || 'upcoming',
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  /**
   * List courses with category, level, and keyword filtering
   */
  async getCourses(filters: CourseFilters = {}): Promise<Course[]> {
    const { category, level, search } = filters;

    try {
      // 1. Try querying PostgreSQL database
      let sql = `
        SELECT c.*, 
          COALESCE(json_agg(
            json_build_object(
              'id', b.id,
              'course_id', b.course_id,
              'batch_code', b.batch_code,
              'start_date', b.start_date,
              'end_date', b.end_date,
              'schedule', b.schedule,
              'max_capacity', b.max_capacity,
              'enrolled_count', b.enrolled_count,
              'meeting_link', b.meeting_link,
              'status', b.status
            )
          ) FILTER (WHERE b.id IS NOT NULL), '[]') as batches
        FROM courses c
        LEFT JOIN batches b ON b.course_id = c.id
        WHERE c.is_published = true
      `;
      const params: any[] = [];
      let paramIndex = 1;

      if (category && category.toLowerCase() !== 'all') {
        sql += ` AND LOWER(c.category) = LOWER($${paramIndex++})`;
        params.push(category);
      }

      if (level && level.toLowerCase() !== 'all') {
        sql += ` AND c.level = $${paramIndex++}`;
        params.push(level.toLowerCase());
      }

      if (search && search.trim() !== '') {
        const queryTerm = `%${search.trim().toLowerCase()}%`;
        sql += ` AND (
          LOWER(c.title) LIKE $${paramIndex} OR
          LOWER(c.description) LIKE $${paramIndex} OR
          LOWER(c.certification_code) LIKE $${paramIndex}
        )`;
        params.push(queryTerm);
        paramIndex++;
      }

      sql += ` GROUP BY c.id ORDER BY c.title ASC`;

      const result = await query(sql, params);

      if (result && result.rows && result.rows.length > 0) {
        return result.rows.map((row: any) => {
          const rawBatches = Array.isArray(row.batches) ? row.batches : JSON.parse(row.batches || '[]');
          const formattedBatches = rawBatches.map((b: any) => this.formatDbBatch(b));
          return this.formatDbCourse(row, formattedBatches);
        });
      }
    } catch (err: any) {
      console.warn('[CourseService] Database query unavailable or fallback needed:', err.message);
    }

    // 2. Resilient In-Memory Fallback using Seed Data
    return this.getSeededCourses(filters);
  }

  /**
   * Resilient fallback provider using structured seed data
   */
  private getSeededCourses(filters: CourseFilters = {}): Course[] {
    const { category, level, search } = filters;

    return SEED_COURSES.map((course) => {
      const courseBatches = SEED_BATCHES.filter((b) => b.course_id === course.id);
      const upcoming = courseBatches.filter((b) => b.status === 'upcoming');
      const sorted = [...upcoming].sort(
        (a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
      );
      const nextBatch = sorted.length > 0 ? sorted[0] : null;

      return {
        ...course,
        active_batches_count: upcoming.length,
        next_batch: nextBatch,
        batches: courseBatches,
      };
    }).filter((course) => {
      // Category filter
      if (category && category.toLowerCase() !== 'all') {
        if (course.category.toLowerCase() !== category.toLowerCase()) {
          return false;
        }
      }

      // Level filter
      if (level && level.toLowerCase() !== 'all') {
        if (course.level.toLowerCase() !== level.toLowerCase()) {
          return false;
        }
      }

      // Search keyword filter
      if (search && search.trim() !== '') {
        const q = search.toLowerCase().trim();
        const matchesTitle = course.title.toLowerCase().includes(q);
        const matchesDesc = course.description.toLowerCase().includes(q);
        const matchesCode = (course.certification_code || '').toLowerCase().includes(q);
        const matchesTech = course.technologies.some((t) => t.toLowerCase().includes(q));

        if (!matchesTitle && !matchesDesc && !matchesCode && !matchesTech) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Get single course details by slug with upcoming cohorts
   */
  async getCourseBySlug(slug: string): Promise<Course | null> {
    const cleanSlug = slug.trim().toLowerCase();

    try {
      const courseResult = await query(
        `SELECT * FROM courses WHERE LOWER(slug) = $1 AND is_published = true`,
        [cleanSlug]
      );

      if (courseResult && courseResult.rows && courseResult.rows.length > 0) {
        const courseRow = courseResult.rows[0];
        const batchesResult = await query(
          `SELECT * FROM batches WHERE course_id = $1 ORDER BY start_date ASC`,
          [courseRow.id]
        );

        const batches = (batchesResult?.rows || []).map((b: any) =>
          this.formatDbBatch({ ...b, course_title: courseRow.title, course_slug: courseRow.slug })
        );

        return this.formatDbCourse(courseRow, batches);
      }
    } catch (err: any) {
      console.warn('[CourseService] DB lookup failed, falling back to seed repository:', err.message);
    }

    // Fallback lookup
    const course = SEED_COURSES.find((c) => c.slug.toLowerCase() === cleanSlug);
    if (!course) return null;

    const batches = SEED_BATCHES.filter((b) => b.course_id === course.id);
    const upcoming = batches.filter((b) => b.status === 'upcoming');
    const sorted = [...upcoming].sort(
      (a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    );

    return {
      ...course,
      active_batches_count: upcoming.length,
      next_batch: sorted[0] || null,
      batches: batches,
    };
  }

  /**
   * Check batch availability by UUID or batch code
   */
  async getBatchById(idOrCode: string): Promise<Batch | null> {
    const cleanId = idOrCode.trim();

    try {
      const batchResult = await query(
        `SELECT b.*, c.title as course_title, c.slug as course_slug 
         FROM batches b
         JOIN courses c ON b.course_id = c.id
         WHERE b.id::text = $1 OR LOWER(b.batch_code) = LOWER($1)`,
        [cleanId]
      );

      if (batchResult && batchResult.rows && batchResult.rows.length > 0) {
        return this.formatDbBatch(batchResult.rows[0]);
      }
    } catch (err: any) {
      console.warn('[CourseService] DB batch check failed, using fallback repository:', err.message);
    }

    // Fallback lookup
    const batch = SEED_BATCHES.find(
      (b) => b.id === cleanId || b.batch_code.toLowerCase() === cleanId.toLowerCase()
    );

    if (!batch) return null;

    const course = SEED_COURSES.find((c) => c.id === batch.course_id);
    return {
      ...batch,
      course_title: course?.title || 'Microsoft Azure Certification',
      course_slug: course?.slug || 'azure-certification',
    };
  }

  /**
   * Get distinct categories
   */
  async getCategories(): Promise<string[]> {
    try {
      const result = await query(
        `SELECT DISTINCT category FROM courses WHERE is_published = true ORDER BY category ASC`
      );
      if (result && result.rows && result.rows.length > 0) {
        return result.rows.map((r: any) => r.category);
      }
    } catch {
      // Fallback
    }

    const categories = Array.from(new Set(SEED_COURSES.map((c) => c.category)));
    return categories;
  }
}

export const courseService = new CourseService();
