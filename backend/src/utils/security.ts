import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY || 'generate_a_super_secret_64_character_hex_key_here_for_security';
const JWT_EXPIRES_IN = `${process.env.ACCESS_TOKEN_EXPIRE_MINUTES || 1440}m`;

export interface TokenPayload {
  id: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  full_name?: string;
  [key: string]: any;
}

/**
 * Hash plain password using bcryptjs with 10 salt rounds
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * Compare plain password against bcrypt hash
 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

/**
 * Generate signed JWT access token
 */
export const generateToken = (payload: TokenPayload, expiresIn: string = JWT_EXPIRES_IN): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: expiresIn as jwt.SignOptions['expiresIn'],
  });
};

/**
 * Verify and decode JWT token
 */
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
};
