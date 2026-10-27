import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../config/db';
import { hashPassword, comparePassword, generateToken } from '../utils/security';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// Zod schemas for input validation
const RegisterSchema = z.object({
  full_name: z.string().min(2, 'Full name must have at least 2 characters').max(100),
  email: z.string().email('Valid email address is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['student', 'instructor']).default('student'),
});

const LoginSchema = z.object({
  email: z.string().email('Valid email address is required'),
  password: z.string().min(1, 'Password is required'),
});

/**
 * POST /register
 * Create a new user (student or instructor)
 */
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = RegisterSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: parseResult.error.errors,
      });
      return;
    }

    const { full_name, email, password, role } = parseResult.data;
    const cleanEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await query('SELECT id FROM users WHERE email = $1', [cleanEmail]);
    if (existingUser.rows.length > 0) {
      res.status(400).json({
        success: false,
        message: 'A user with this email address already exists.',
      });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const insertResult = await query(
      `INSERT INTO users (full_name, email, password_hash, role, is_active)
       VALUES ($1, $2, $3, $4, true)
       RETURNING id, full_name, email, role, is_active, created_at`,
      [full_name.trim(), cleanEmail, hashedPassword, role]
    );

    const createdUser = insertResult.rows[0];

    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      data: createdUser,
    });
  } catch (error: any) {
    console.error('[AUTH ERROR] Register failed:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while registering user.',
    });
  }
});

/**
 * POST /login
 * Authenticate credentials and return JWT access token
 */
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = LoginSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: parseResult.error.errors,
      });
      return;
    }

    const { email, password } = parseResult.data;
    const cleanEmail = email.trim().toLowerCase();

    const userResult = await query(
      `SELECT id, full_name, email, password_hash, role, is_active, created_at 
       FROM users WHERE email = $1`,
      [cleanEmail]
    );

    if (userResult.rows.length === 0) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials.',
      });
      return;
    }

    const user = userResult.rows[0];

    if (!user.is_active) {
      res.status(403).json({
        success: false,
        message: 'Your account is deactivated. Please contact administrator.',
      });
      return;
    }

    const isPasswordValid = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials.',
      });
      return;
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      full_name: user.full_name,
    });

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: {
        token,
        token_type: 'bearer',
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
          is_active: user.is_active,
          created_at: user.created_at,
        },
      },
    });
  } catch (error: any) {
    console.error('[AUTH ERROR] Login failed:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while authenticating user.',
    });
  }
});

/**
 * GET /me
 * Return current logged-in user profile
 */
router.get('/me', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const userResult = await query(
      `SELECT id, full_name, email, role, is_active, created_at, updated_at 
       FROM users WHERE id = $1`,
      [userId]
    );

    if (userResult.rows.length === 0) {
      res.status(404).json({ success: false, message: 'User not found.' });
      return;
    }

    res.status(200).json({
      success: true,
      data: userResult.rows[0],
    });
  } catch (error: any) {
    console.error('[AUTH ERROR] Fetch /me failed:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching user profile.',
    });
  }
});

export default router;
