import { Router, Request, Response } from 'express';
import { courseService } from '../services/course.service';

const router = Router();

/**
 * GET /api/v1/batches/:id
 * Check batch availability, schedule, max capacity, and remaining seats
 */
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const batch = await courseService.getBatchById(id);

    if (!batch) {
      res.status(404).json({
        success: false,
        message: `Batch '${id}' not found.`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        id: batch.id,
        batch_code: batch.batch_code,
        course_id: batch.course_id,
        course_title: batch.course_title,
        course_slug: batch.course_slug,
        start_date: batch.start_date,
        end_date: batch.end_date,
        schedule: batch.schedule,
        max_capacity: batch.max_capacity,
        enrolled_count: batch.enrolled_count,
        seats_available: batch.seats_available,
        seats_left: batch.seats_left,
        is_available: batch.is_available,
        status: batch.status,
      },
    });
  } catch (error: any) {
    console.error('[BATCHES API ERROR] Check batch availability failed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check batch availability.',
      error: error.message,
    });
  }
});

export default router;
