import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Clock,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Layers,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  X,
  Award,
  Zap,
  Server,
  Cloud,
  Network,
  GitBranch,
  Cpu,
  Shield,
  GraduationCap,
  Check,
} from 'lucide-react';

interface SyllabusModule {
  module_number: number;
  title: string;
  topics: string[];
  lab?: string;
}

interface Batch {
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
  status: 'upcoming' | 'ongoing' | 'completed';
}

interface Course {
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
  level: string;
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
  next_batch?: Batch | null;
  batches?: Batch[];
}

interface CategoryPillar {
  slug: string;
  name: string;
  shortName: string;
  icon: React.ElementType;
}

const PILLARS: CategoryPillar[] = [
  { slug: 'all', name: 'All Pillars', shortName: 'All Tracks', icon: GraduationCap },
  { slug: 'm365', name: 'Microsoft 365 Administration', shortName: 'M365', icon: Server },
  { slug: 'cloud-infra', name: 'Cloud & Infrastructure', shortName: 'Cloud & Infra', icon: Cloud },
  { slug: 'networking', name: 'Cloud Networking', shortName: 'Networking', icon: Network },
  { slug: 'devops', name: 'DevOps & Cloud Development', shortName: 'DevOps', icon: GitBranch },
  { slug: 'ai', name: 'Artificial Intelligence (AI)', shortName: 'AI', icon: Cpu },
  { slug: 'security', name: 'Cybersecurity & Identity Management', shortName: 'Security', icon: Shield },
];

export const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Active filters
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [selectedLevel, setSelectedLevel] = useState<string>(searchParams.get('level') || 'all');
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '');
  const [currency, setCurrency] = useState<'LKR' | 'USD'>('LKR');
  const [expandedSyllabusSlug, setExpandedSyllabusSlug] = useState<string | null>(null);

  // Modal State for "Enroll Now"
  const [enrollModalCourse, setEnrollModalCourse] = useState<Course | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [batchLoading, setBatchLoading] = useState<boolean>(false);
  const [batchAvailability, setBatchAvailability] = useState<{
    seats_left: number;
    is_available: boolean;
    max_capacity: number;
  } | null>(null);

  const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

  // Fetch courses from backend API
  const fetchCourses = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (selectedLevel !== 'all') params.append('level', selectedLevel);
      if (searchQuery.trim() !== '') params.append('search', searchQuery.trim());

      const url = `${apiBase}/courses?${params.toString()}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const resData = await response.json();
      if (resData.success && Array.isArray(resData.data)) {
        setCourses(resData.data);
      } else {
        throw new Error(resData.message || 'Invalid course catalog response format');
      }
    } catch (err: any) {
      console.error('[Courses API] Fetch error:', err);
      setErrorMsg(
        'Could not synchronize live course catalog from backend API. Please verify server status at ' +
          apiBase
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [selectedCategory, selectedLevel]);

  // Handle Search on Submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCourses();
  };

  // Switch category tab
  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    const newParams = new URLSearchParams(searchParams);
    if (slug === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', slug);
    }
    setSearchParams(newParams);
  };

  // Open Enrollment Modal
  const handleOpenEnrollModal = async (course: Course) => {
    setEnrollModalCourse(course);
    setBatchAvailability(null);

    try {
      const response = await fetch(`${apiBase}/courses/${course.slug}`);
      const data = await response.json();
      if (data.success && data.data) {
        setEnrollModalCourse(data.data);
        const batches = data.data.batches || [];
        if (batches.length > 0) {
          const firstUpcoming = batches.find((b: Batch) => b.status === 'upcoming') || batches[0];
          setSelectedBatch(firstUpcoming);
          checkBatchAvailability(firstUpcoming.id);
        }
        return;
      }
    } catch {
      // Fallback to local course batches
    }

    const availableBatches = course.batches || [];
    if (availableBatches.length > 0) {
      const firstUpcoming = availableBatches.find((b) => b.status === 'upcoming') || availableBatches[0];
      setSelectedBatch(firstUpcoming);
      checkBatchAvailability(firstUpcoming.id);
    } else {
      setSelectedBatch(null);
    }
  };

  // Check specific batch availability via GET /api/v1/batches/:id
  const checkBatchAvailability = async (batchId: string) => {
    setBatchLoading(true);
    try {
      const res = await fetch(`${apiBase}/batches/${batchId}`);
      const result = await res.json();
      if (result.success && result.data) {
        setBatchAvailability({
          seats_left: result.data.seats_left,
          is_available: result.data.is_available,
          max_capacity: result.data.max_capacity,
        });
      }
    } catch (e) {
      console.warn('Batch check error:', e);
    } finally {
      setBatchLoading(false);
    }
  };

  // Format Price display
  const getDisplayPrice = (course: Course) => {
    if (course.price_formatted) {
      if (currency === 'USD' && course.price_usd > 0) {
        return `$${course.price_usd} USD`;
      }
      return course.price_formatted;
    }

    if (currency === 'USD') {
      return course.price_usd > 0 ? `$${course.price_usd}` : 'Free';
    }
    return course.price_lkr > 0 ? `${course.price_lkr.toLocaleString()} LKR` : 'Free';
  };

  // Format level badge
  const getLevelBadgeClass = (level: string) => {
    const lvl = level.toLowerCase();
    if (lvl.includes('beginner')) {
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
    if (lvl.includes('associate') || lvl.includes('intermediate')) {
      return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
    }
    if (lvl.includes('expert') || lvl.includes('advanced')) {
      return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    }
    return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
  };

  // Check if course has a mandatory prerequisite
  const isMandatoryPrereq = (prereq?: string) => {
    if (!prereq) return false;
    const p = prereq.toLowerCase();
    return p !== 'none' && !p.includes('none');
  };

  // Count courses in each pillar
  const getPillarCount = (pillarSlug: string) => {
    if (pillarSlug === 'all') return courses.length;
    return courses.filter((c) => {
      const cat = c.category.toLowerCase();
      const slug = (c.category_slug || '').toLowerCase();
      if (slug === pillarSlug) return true;
      if (pillarSlug === 'm365') return cat.includes('365');
      if (pillarSlug === 'cloud-infra') return cat.includes('infra') || cat.includes('cloud & infrastructure');
      if (pillarSlug === 'networking') return cat.includes('network');
      if (pillarSlug === 'devops') return cat.includes('devops') || cat.includes('development');
      if (pillarSlug === 'ai') return cat.includes('intelligence') || cat.includes('ai');
      if (pillarSlug === 'security') return cat.includes('security') || cat.includes('identity');
      return false;
    }).length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Hero Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Official 6-Pillar Enterprise Curriculum</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-['Outfit'] tracking-tight">
          Enterprise Cloud & AI <span className="gradient-text">Certification Catalog</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          Industrial live cohort bootcamps taught by Senior Principal Architects. Fully aligned with official Microsoft certification blueprints, cloud sandbox subscriptions, and capstone labs.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 bg-slate-900/70 px-3 py-1.5 rounded-xl border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>MCT Certified Master Trainers</span>
          </span>
          <span className="flex items-center gap-1.5 bg-slate-900/70 px-3 py-1.5 rounded-xl border border-slate-800">
            <Zap className="w-4 h-4 text-sky-400" />
            <span>100% Hands-On Production Labs</span>
          </span>
          <span className="flex items-center gap-1.5 bg-slate-900/70 px-3 py-1.5 rounded-xl border border-slate-800">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Weekend Live Interactive Classes</span>
          </span>
        </div>
      </div>

      {/* 6-Pillar Category Tabs */}
      <div className="glass-panel p-2.5 rounded-3xl border border-slate-800/80 shadow-2xl">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 px-1">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = selectedCategory === pillar.slug;
            const count = getPillarCount(pillar.slug);

            return (
              <button
                key={pillar.slug}
                type="button"
                onClick={() => handleCategoryChange(pillar.slug)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap group ${
                  isSelected
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 ring-1 ring-sky-400/40'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400 group-hover:text-sky-400'}`} />
                <span>{pillar.shortName}</span>
                {count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by code (AZ-104, MS-102, AZ-700) or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-20 py-2.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-[11px] font-bold transition-all"
          >
            Find
          </button>
        </form>

        {/* Level Filters & Currency Switcher */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-3">
          {/* Level Filter Chips */}
          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-1 mr-1 hidden sm:block" />
            {['all', 'beginner', 'associate', 'expert', 'specialty'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-all ${
                  selectedLevel === lvl
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lvl === 'all' ? 'All' : lvl}
              </button>
            ))}
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setCurrency('LKR')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                currency === 'LKR' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              LKR (Rs)
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                currency === 'USD' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
          </div>

          {/* Refresh */}
          <button
            type="button"
            onClick={fetchCourses}
            disabled={isLoading}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all"
            title="Refresh Catalog"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-sky-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-amber-300 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-400" />
            <span>{errorMsg}</span>
          </div>
          <button
            onClick={fetchCourses}
            className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-bold"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 animate-pulse">
              <div className="flex justify-between items-center">
                <div className="h-6 w-20 bg-slate-800 rounded-lg" />
                <div className="h-6 w-24 bg-slate-800 rounded-lg" />
              </div>
              <div className="h-6 w-3/4 bg-slate-800 rounded" />
              <div className="h-12 w-full bg-slate-800/60 rounded" />
              <div className="h-16 w-full bg-slate-900 rounded-2xl" />
              <div className="h-11 w-full bg-sky-500/20 rounded-xl" />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && courses.length === 0 && (
        <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-4 max-w-md mx-auto">
          <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-xl font-bold text-white font-['Outfit']">No Matching Tracks Found</h3>
          <p className="text-xs text-slate-400">
            No courses match your selected filter criteria. Reset your filters to explore all 6 pillars.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedLevel('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-sky-500 text-white text-xs font-bold hover:bg-sky-400 transition-all"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Course Cards Grid */}
      {!isLoading && courses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const isSyllabusOpen = expandedSyllabusSlug === course.slug;
            const isUpcomingOnly =
              course.status?.toLowerCase().includes('upcoming') ||
              course.status?.toLowerCase().includes('announced') ||
              course.level?.toLowerCase() === 'specialty';
            const hasPrereq = isMandatoryPrereq(course.prerequisite);

            return (
              <div
                key={course.id || course.slug}
                className="glass-panel rounded-3xl overflow-hidden flex flex-col justify-between border border-slate-800/90 hover:border-sky-500/50 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 group relative"
              >
                {/* Glow subtle highlight */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-sky-500/10 via-transparent to-transparent pointer-events-none rounded-tr-3xl" />

                <div className="p-6 space-y-4">
                  {/* Top Header: Code Badge, Level, Category & Price */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {course.certification_code && (
                          <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded-lg bg-sky-500 text-white shadow-md shadow-sky-500/30">
                            {course.certification_code}
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getLevelBadgeClass(
                            course.level
                          )}`}
                        >
                          {course.level}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium block">
                        {course.category}
                      </span>
                    </div>

                    {/* Price Badge */}
                    <div className="text-right">
                      <div className="text-lg font-black text-white font-['Outfit'] leading-tight">
                        {getDisplayPrice(course)}
                      </div>
                      {course.installments && (
                        <span className="text-[10px] text-emerald-400 font-medium block">
                          {course.installments}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Course Title */}
                  <h2 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors font-['Outfit'] leading-snug line-clamp-2">
                    {course.title}
                  </h2>

                  {/* Course Description */}
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {course.description}
                  </p>

                  {/* Schedule & Duration Pills */}
                  <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800">
                      <Clock className="w-3.5 h-3.5 text-sky-400" />
                      <span>{course.duration}</span>
                    </span>
                    {course.schedule && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>{course.schedule}</span>
                      </span>
                    )}
                    {course.batch_start && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-semibold">
                        <span>Cohort: {course.batch_start}</span>
                      </span>
                    )}
                  </div>

                  {/* Mandatory Prerequisite Warning Banner */}
                  {hasPrereq && (
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2 text-amber-300 text-[11px]">
                      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 text-amber-400 mt-0.5" />
                      <div>
                        <strong className="font-bold">Prerequisite:</strong> {course.prerequisite}
                      </div>
                    </div>
                  )}

                  {/* Includes Perk Pill */}
                  {course.includes && (
                    <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-300 text-[11px]">
                      <Check className="w-3.5 h-3.5 flex-shrink-0 text-emerald-400" />
                      <span className="font-semibold">{course.includes}</span>
                    </div>
                  )}

                  {/* Technologies Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {course.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-900/80 text-slate-400 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                    {course.technologies.length > 5 && (
                      <span className="text-[10px] text-slate-500 font-medium">
                        +{course.technologies.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Syllabus Accordion Toggle */}
                  {course.syllabus && course.syllabus.length > 0 && (
                    <div className="pt-1">
                      {isSyllabusOpen && (
                        <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2.5 max-h-56 overflow-y-auto text-xs text-slate-300 mb-2">
                          {course.syllabus.map((mod) => (
                            <div key={mod.module_number} className="space-y-1">
                              <div className="font-bold text-sky-300 flex items-center gap-1.5">
                                <span className="w-4 h-4 rounded-full bg-sky-500/20 text-sky-400 inline-flex items-center justify-center text-[10px]">
                                  {mod.module_number}
                                </span>
                                <span>{mod.title}</span>
                              </div>
                              <ul className="list-disc list-inside text-slate-400 pl-5 space-y-0.5 text-[11px]">
                                {mod.topics.map((t, idx) => (
                                  <li key={idx}>{t}</li>
                                ))}
                              </ul>
                              {mod.lab && (
                                <div className="ml-5 mt-1 p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300">
                                  <strong>Lab:</strong> {mod.lab}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Actions Footer */}
                <div className="p-6 pt-3 border-t border-slate-800/80 bg-slate-900/50 space-y-3 rounded-b-3xl">
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* View Details / Syllabus Toggle Button */}
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedSyllabusSlug(isSyllabusOpen ? null : course.slug)
                      }
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-all"
                    >
                      <Layers className="w-3.5 h-3.5 text-sky-400" />
                      <span>{isSyllabusOpen ? 'Hide Outline' : 'View Syllabus'}</span>
                    </button>

                    {/* Enroll Now Button */}
                    {isUpcomingOnly ? (
                      <button
                        type="button"
                        onClick={() => navigate(`/register?course=${course.slug}&type=waitlist`)}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 transition-all"
                      >
                        <span>Pre-Register</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpenEnrollModal(course)}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:via-blue-500 hover:to-indigo-500 shadow-md shadow-sky-500/20 transition-all active:scale-95"
                      >
                        <span>Enroll Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cohort Batch Selection & Enrollment Modal */}
      {enrollModalCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel w-full max-w-2xl rounded-3xl border border-slate-700/80 shadow-2xl p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            {/* Close */}
            <button
              onClick={() => {
                setEnrollModalCourse(null);
                setSelectedBatch(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1.5 pr-8">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-sky-500 text-white">
                  {enrollModalCourse.certification_code || 'Certified Track'}
                </span>
                <span className="text-xs text-sky-400 font-semibold uppercase tracking-wider">
                  Live Cohort Enrollment
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-white font-['Outfit']">
                {enrollModalCourse.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                {enrollModalCourse.description}
              </p>
            </div>

            {/* Tuition & Prerequisite Warning Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-0.5">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider">Tuition Fee</span>
                <div className="text-2xl font-black text-white font-['Outfit']">
                  {getDisplayPrice(enrollModalCourse)}
                </div>
                {enrollModalCourse.installments && (
                  <span className="text-[11px] text-emerald-400 font-semibold block">
                    {enrollModalCourse.installments}
                  </span>
                )}
              </div>

              {enrollModalCourse.prerequisite && isMandatoryPrereq(enrollModalCourse.prerequisite) && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1 text-xs text-amber-200">
                  <div className="flex items-center gap-1.5 font-bold text-amber-400 uppercase tracking-wider text-[11px]">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Mandatory Prerequisite</span>
                  </div>
                  <p>{enrollModalCourse.prerequisite}</p>
                </div>
              )}
            </div>

            {/* Batches Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center justify-between">
                <span>Select Cohort Batch Schedule</span>
                <span className="text-sky-400 font-normal">Live Instructor-Led</span>
              </label>

              {(!enrollModalCourse.batches || enrollModalCourse.batches.length === 0) ? (
                <div className="p-4 rounded-xl bg-slate-900/60 text-center text-xs text-slate-400">
                  No open batches available at the moment. Please contact admissions.
                </div>
              ) : (
                <div className="space-y-3">
                  {enrollModalCourse.batches.map((batch) => {
                    const isSelected = selectedBatch?.id === batch.id;
                    const seats = batch.seats_left ?? batch.seats_available ?? 5;

                    return (
                      <div
                        key={batch.id || batch.batch_code}
                        onClick={() => {
                          setSelectedBatch(batch);
                          checkBatchAvailability(batch.id);
                        }}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-sky-500/15 border-sky-500 text-white shadow-lg shadow-sky-500/10'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">
                              {batch.batch_code}
                            </span>
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                              Starts {batch.start_date}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-sky-400" />
                            <span>{batch.schedule}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
                          <div className="text-right">
                            <span
                              className={`text-xs font-bold ${
                                seats <= 5 ? 'text-amber-400' : 'text-emerald-400'
                              }`}
                            >
                              {seats} seats left
                            </span>
                            <div className="text-[10px] text-slate-500">
                              Capacity {batch.max_capacity}
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              isSelected
                                ? 'border-sky-500 bg-sky-500 text-white'
                                : 'border-slate-600'
                            }`}
                          >
                            {isSelected && <CheckCircle2 className="w-4 h-4" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setEnrollModalCourse(null);
                  setSelectedBatch(null);
                }}
                className="w-full sm:w-1/3 py-3 rounded-2xl font-bold text-xs text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!selectedBatch || (batchAvailability ? !batchAvailability.is_available : false)}
                onClick={() => {
                  const targetUrl = `/register?course=${enrollModalCourse.slug}${
                    selectedBatch ? `&batch=${selectedBatch.batch_code}` : ''
                  }`;
                  navigate(targetUrl);
                }}
                className="w-full sm:w-2/3 inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-98"
              >
                <span>Confirm Batch & Proceed to Register</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
