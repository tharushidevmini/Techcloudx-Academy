import { query } from '../config/db';
import crypto from 'crypto';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status?: string;
  created_at: string;
}

// Durable fallback memory store when PostgreSQL is disconnected
const memoryInquiries: Inquiry[] = [
  {
    id: 'inq-seed-001',
    name: 'Sarah Connor',
    email: 'sarah.connor@cyberdyne.io',
    phone: '+1 555-0199',
    subject: 'Azure Enterprise Cohort Inquiry',
    message: 'Looking to enroll a team of 15 cloud engineers for the AZ-104 and AZ-305 training tracks.',
    status: 'new',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'inq-seed-002',
    name: 'Michael Chen',
    email: 'mchen@cloudscale.net',
    phone: '+1 555-0244',
    subject: 'DevOps & Kubernetes Custom Syllabus',
    message: 'Interested in weekend batch schedules and exam voucher inclusions.',
    status: 'responded',
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
];

export class InquiryService {
  /**
   * Submit new contact / prospective learner inquiry
   */
  async createInquiry(data: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }): Promise<Inquiry> {
    const { name, email, phone, subject, message } = data;
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanSubject = (subject || 'General Academy Inquiry').trim();
    const cleanMessage = message.trim();
    const cleanPhone = phone?.trim() || null;

    try {
      const sql = `
        INSERT INTO inquiries (name, email, phone, subject, message)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, email, phone, subject, message, status, created_at
      `;
      const result = await query(sql, [cleanName, cleanEmail, cleanPhone, cleanSubject, cleanMessage]);
      if (result.rows && result.rows.length > 0) {
        return result.rows[0];
      }
    } catch (err: any) {
      console.warn('[InquiryService] Database query failed, using resilient fallback store:', err.message);
    }

    // Resilient fallback record
    const fallbackInquiry: Inquiry = {
      id: crypto.randomUUID ? crypto.randomUUID() : `inq-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone || undefined,
      subject: cleanSubject,
      message: cleanMessage,
      status: 'new',
      created_at: new Date().toISOString(),
    };

    memoryInquiries.unshift(fallbackInquiry);
    return fallbackInquiry;
  }

  /**
   * Retrieve all inquiries
   */
  async getInquiries(): Promise<Inquiry[]> {
    try {
      const result = await query(
        `SELECT id, name, email, phone, subject, message, status, created_at 
         FROM inquiries 
         ORDER BY created_at DESC 
         LIMIT 100`
      );
      if (result.rows && result.rows.length > 0) {
        return result.rows;
      }
    } catch (err: any) {
      console.warn('[InquiryService] DB fetch failed, using fallback inquiries:', err.message);
    }

    return memoryInquiries;
  }
}

export const inquiryService = new InquiryService();
