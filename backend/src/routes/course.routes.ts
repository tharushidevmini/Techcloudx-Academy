import { Router, Request, Response } from 'express';
import { courseService } from '../services/course.service';

const router = Router();

/**
 * GET /api/v1/courses
 * List active courses with optional category, level, and keyword filters
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, level, search } = req.query;

    const courses = await courseService.getCourses({
      category: typeof category === 'string' ? category : undefined,
      level: typeof level === 'string' ? level : undefined,
      search: typeof search === 'string' ? search : undefined,
    });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error: any) {
    console.error('[COURSES API ERROR] Fetch courses failed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve course catalog.',
      error: error.message,
    });
  }
});

/**
 * GET /api/v1/courses/categories
 * Retrieve distinct course categories
 */
router.get('/categories', async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await courseService.getCategories();
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error: any) {
    console.error('[COURSES API ERROR] Fetch categories failed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve course categories.',
    });
  }
});

/**
 * GET /api/v1/courses/:slug
 * Retrieve detailed course syllabus outline and upcoming cohort batches
 */
router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const course = await courseService.getCourseBySlug(slug);

    if (!course) {
      res.status(404).json({
        success: false,
        message: `Course with slug '${slug}' not found.`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error: any) {
    console.error('[COURSES API ERROR] Fetch course details failed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve course details.',
      error: error.message,
    });
  }
});

export default router;
