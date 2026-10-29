import { pool } from '../config/db';
import { SEED_COURSES, SEED_BATCHES } from '../data/seedData';

export async function runSeeding() {
  console.log('[SEED] Starting 6-Pillar Enterprise Course & Cohort Batch seeding...');

  try {
    for (const course of SEED_COURSES) {
      await pool.query(
        `INSERT INTO courses (
          id, title, slug, certification_code, category, category_slug, description,
          price_cents, price_usd, price_lkr, price_formatted, level, duration,
          schedule, mode, prerequisite, includes, status, installments, batch_start,
          badge_text, technologies, syllabus, is_published
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7,
          $8, $9, $10, $11, $12, $13,
          $14, $15, $16, $17, $18, $19, $20,
          $21, $22, $23, $24
        )
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          certification_code = EXCLUDED.certification_code,
          category = EXCLUDED.category,
          category_slug = EXCLUDED.category_slug,
          description = EXCLUDED.description,
          price_cents = EXCLUDED.price_cents,
          price_usd = EXCLUDED.price_usd,
          price_lkr = EXCLUDED.price_lkr,
          price_formatted = EXCLUDED.price_formatted,
          level = EXCLUDED.level,
          duration = EXCLUDED.duration,
          schedule = EXCLUDED.schedule,
          mode = EXCLUDED.mode,
          prerequisite = EXCLUDED.prerequisite,
          includes = EXCLUDED.includes,
          status = EXCLUDED.status,
          installments = EXCLUDED.installments,
          batch_start = EXCLUDED.batch_start,
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
          course.category_slug || null,
          course.description,
          course.price_cents,
          course.price_usd,
          course.price_lkr,
          course.price_formatted || null,
          course.level,
          course.duration,
          course.schedule || null,
          course.mode || null,
          course.prerequisite || null,
          course.includes || null,
          course.status || null,
          course.installments || null,
          course.batch_start || null,
          course.badge_text || null,
          JSON.stringify(course.technologies),
          JSON.stringify(course.syllabus),
          course.is_published,
        ]
      );
      console.log(`[SEED] Upserted course: [${course.certification_code}] ${course.title}`);
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

    console.log('[SEED SUCCESS] 6-Pillar enterprise courses & batches seeded successfully!');
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
