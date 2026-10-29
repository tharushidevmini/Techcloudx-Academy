export type CourseLevel =
  | 'Beginner'
  | 'Associate'
  | 'Intermediate'
  | 'Expert'
  | 'Specialty'
  | 'Upcoming'
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | string;

export type BatchStatus = 'upcoming' | 'ongoing' | 'completed';

export interface SyllabusModule {
  module_number: number;
  title: string;
  topics: string[];
  lab?: string;
}

export interface Batch {
  id: string;
  course_id: string;
  course_title?: string;
  course_slug?: string;
  batch_code: string;
  start_date: string;
  end_date?: string;
  schedule: string;
  max_capacity: number;
  enrolled_count: number;
  seats_available: number;
  seats_left: number;
  is_available: boolean;
  meeting_link?: string;
  status: BatchStatus;
  created_at?: string;
  updated_at?: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  certification_code?: string;
  category: string;
  category_slug?: string;
  description: string;
  price_cents: number;
  price_usd: number;
  price_lkr: number;
  price_formatted?: string;
  level: CourseLevel;
  duration: string;
  schedule?: string;
  mode?: string;
  prerequisite?: string;
  includes?: string;
  status?: string;
  installments?: string;
  batch_start?: string;
  badge_text?: string;
  technologies: string[];
  syllabus: SyllabusModule[];
  is_published: boolean;
  active_batches_count?: number;
  batches?: Batch[];
  next_batch?: Batch | null;
  created_at?: string;
  updated_at?: string;
}

export interface CourseFilters {
  category?: string;
  level?: string;
  search?: string;
}
