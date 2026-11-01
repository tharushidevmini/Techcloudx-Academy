import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { inquiryService } from '../services/inquiry.service';

const router = Router();

const InquirySchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().max(50).optional().nullable(),
  subject: z.string().max(200).optional().nullable(),
  message: z.string().min(5, 'Message must be at least 5 characters long').max(2000),
});

/**
 * POST /api/v1/inquiries
 * Submit an inquiry or contact lead
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = InquirySchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        message: 'Validation failed. Please verify form fields.',
        errors: parseResult.error.errors,
      });
      return;
    }

    const { name, email, phone, subject, message } = parseResult.data;
    const inquiry = await inquiryService.createInquiry({
      name,
      email,
      phone: phone || undefined,
      subject: subject || undefined,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your inquiry has been submitted successfully. A cloud advisor will reach out within 24 hours.',
      data: inquiry,
    });
  } catch (error: any) {
    console.error('[INQUIRY API ERROR]', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process inquiry submission. Please try again.',
      error: error.message,
    });
  }
});

/**
 * GET /api/v1/inquiries
 * Retrieve existing inquiries
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const list = await inquiryService.getInquiries();
    res.status(200).json({
      success: true,
      count: list.length,
      data: list,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve inquiries.',
      error: error.message,
    });
  }
});

export default router;
