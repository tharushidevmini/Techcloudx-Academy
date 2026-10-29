import { pool } from '../config/db';
import { SEED_COURSES, SEED_BATCHES } from '../data/seedData';

export async function runSeeding() {
  console.log('[SEED] Starting Azure Course & Cohort Batch seeding...');

  try {
    for (const course of SEED_COURSES) {
      await pool.query(
        `INSERT INTO courses (
          id, title, slug, certification_code, category, description,
          price_cents, price_usd, price_lkr, level, duration, badge_text,
          technologies, syllabus, is_published
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          certification_code = EXCLUDED.certification_code,
          category = EXCLUDED.category,
          description = EXCLUDED.description,
          price_cents = EXCLUDED.price_cents,
          price_usd = EXCLUDED.price_usd,
          price_lkr = EXCLUDED.price_lkr,
          level = EXCLUDED.level,
          duration = EXCLUDED.duration,
          badge_text = EXCLUDED.badge_text,
          technologies = EXCLUDED.technologies,
          syllabus = EXCLUDED.syllabus,
          is_published = EXCLUDED.is_published,
          updated_at = CURRENT_TIMESTAMP`,
        [
          course.id,
          course.title,
          course.slug,
          course.certification_code,
          course.category,
          course.description,
          course.price_cents,
          course.price_usd,
          course.price_lkr,
          course.level,
          course.duration,
          course.badge_text,
          JSON.stringify(course.technologies),
          JSON.stringify(course.syllabus),
          course.is_published,
        ]
      );
      console.log(`[SEED] Upserted course: ${course.title} (${course.certification_code})`);
    }

    for (const batch of SEED_BATCHES) {
      await pool.query(
        `INSERT INTO batches (
          id, course_id, batch_code, start_date, end_date, schedule,
          max_capacity, enrolled_count, meeting_link, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (batch_code) DO UPDATE SET
          start_date = EXCLUDED.start_date,
          end_date = EXCLUDED.end_date,
          schedule = EXCLUDED.schedule,
          max_capacity = EXCLUDED.max_capacity,
          enrolled_count = EXCLUDED.enrolled_count,
          meeting_link = EXCLUDED.meeting_link,
          status = EXCLUDED.status,
          updated_at = CURRENT_TIMESTAMP`,
        [
          batch.id,
          batch.course_id,
          batch.batch_code,
          batch.start_date,
          batch.end_date || null,
          batch.schedule,
          batch.max_capacity,
          batch.enrolled_count,
          batch.meeting_link || null,
          batch.status,
        ]
      );
      console.log(`[SEED] Upserted cohort batch: ${batch.batch_code}`);
    }

    console.log('[SEED SUCCESS] Azure certification courses & batches seeded successfully!');
  } catch (error: any) {
    console.error('[SEED ERROR] Seeding failed:', error.message);
  }
}

if (require.main === module) {
  runSeeding()
    .then(() => pool.end())
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
