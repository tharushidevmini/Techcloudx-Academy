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
  RefreshCw,
  X,
  Award,
  Zap,
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
  description: string;
  price_cents: number;
  price_usd: number;
  price_lkr: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  badge_text?: string;
  technologies: string[];
  syllabus: SyllabusModule[];
  is_published: boolean;
  active_batches_count?: number;
  next_batch?: Batch | null;
  batches?: Batch[];
}

export const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Filters & UI state
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

        // Derive distinct categories if not already fetched
        const distinctCategories = Array.from(
          new Set(resData.data.map((c: Course) => c.category).filter(Boolean))
        ) as string[];
        setCategories(distinctCategories);
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

  // Handle Search on Submit or Debounced
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCourses();
  };

  // Open Enrollment Modal
  const handleOpenEnrollModal = async (course: Course) => {
    setEnrollModalCourse(course);
    setBatchAvailability(null);

    // Fetch full course details if batches aren't fully loaded
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
      // Fallback to existing course batches
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

  // Format Price in LKR or USD
  const formatPrice = (course: Course) => {
    if (currency === 'LKR') {
      return `LKR ${course.price_lkr.toLocaleString()}`;
    }
    return `$${course.price_usd}`;
  };

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'intermediate':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      case 'advanced':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Official Microsoft Azure Certification Cohorts</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-['Outfit'] tracking-tight">
          Master Enterprise Azure with <span className="gradient-text">Live Cohort Labs</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          Production-grade curriculum designed by Senior Principal Cloud Architects. Live weekend workshops, individual cloud sandbox subscriptions, real-world capstone reviews, and 100% exam pass assurance.
        </p>

        {/* Feature Highlights Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>MCT Certified Trainers</span>
          </span>
          <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
            <Zap className="w-4 h-4 text-sky-400" />
            <span>Interactive Sandbox Labs</span>
          </span>
          <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Official Microsoft Alignment</span>
          </span>
        </div>
      </div>

      {/* Control Bar: Search, Category Filters, Level Filters & Currency Toggle */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800/80 shadow-2xl space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-lg">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Azure tracks (AZ-900, AZ-104, AZ-700, VNets, Terraform)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl pl-11 pr-24 py-3 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-all"
            >
              Search
            </button>
          </form>

          {/* Right Tools: Currency Toggle & Refresh */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            {/* Currency Selector */}
            <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-700/70">
              <button
                type="button"
                onClick={() => setCurrency('LKR')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  currency === 'LKR'
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                LKR (Rs)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  currency === 'USD'
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
            </div>

            {/* Refresh Button */}
            <button
              type="button"
              onClick={fetchCourses}
              disabled={isLoading}
              className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/70 transition-all disabled:opacity-50"
              title="Refresh live catalog"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-sky-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Filter Pills Row */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
              Category:
            </span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Tracks
            </button>
            {(categories.length > 0 ? categories : ['Azure Cloud', 'Infrastructure & SysOps', 'Cloud Networking & Security']).map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                      : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>

          {/* Level Filters */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400 mr-1 hidden sm:block" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
              Level:
            </span>
            {['all', 'beginner', 'intermediate', 'advanced'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedLevel === lvl
                    ? 'bg-slate-700 text-white border border-slate-600'
                    : 'bg-transparent text-slate-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error State Banner */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-amber-300 text-sm">
          <div className="flex items-center gap-3">
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

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="glass-panel rounded-3xl p-7 border border-slate-800 space-y-5 animate-pulse"
            >
              <div className="flex justify-between items-center">
                <div className="h-6 w-24 bg-slate-800 rounded-full" />
                <div className="h-7 w-20 bg-slate-800 rounded-lg" />
              </div>
              <div className="h-7 w-3/4 bg-slate-800 rounded-lg" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-slate-800/80 rounded" />
                <div className="h-4 w-5/6 bg-slate-800/80 rounded" />
              </div>
              <div className="flex gap-2 pt-2">
                <div className="h-5 w-16 bg-slate-800 rounded" />
                <div className="h-5 w-20 bg-slate-800 rounded" />
                <div className="h-5 w-16 bg-slate-800 rounded" />
              </div>
              <div className="h-16 bg-slate-900/80 rounded-2xl border border-slate-800/80" />
              <div className="h-12 bg-sky-500/20 rounded-xl" />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && courses.length === 0 && (
        <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-4 max-w-md mx-auto">
          <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-xl font-bold text-white font-['Outfit']">No Certification Tracks Found</h3>
          <p className="text-sm text-slate-400">
            No active courses match your chosen filter criteria. Try resetting filters or search terms.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedLevel('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-sky-500 text-white text-xs font-bold hover:bg-sky-400 transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Course Catalog Grid */}
      {!isLoading && courses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const nextBatch = course.next_batch;
            const seatsLeft = nextBatch?.seats_left ?? nextBatch?.seats_available ?? 6;
            const maxCapacity = nextBatch?.max_capacity ?? 20;
            const isFillingFast = seatsLeft <= 7;
            const isSyllabusOpen = expandedSyllabusSlug === course.slug;

            return (
              <div
                key={course.id || course.slug}
                className="glass-panel rounded-3xl overflow-hidden flex flex-col justify-between border border-slate-800 hover:border-sky-500/50 hover:shadow-2xl hover:shadow-sky-500/15 transition-all duration-300 group relative"
              >
                {/* Glow accent */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-sky-500/15 via-transparent to-transparent pointer-events-none rounded-tr-3xl" />

                <div className="p-7 space-y-5">
                  {/* Top Badges & Pricing */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {course.certification_code && (
                        <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-lg bg-sky-500 text-white shadow-sm shadow-sky-500/30">
                          {course.certification_code}
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${getLevelBadgeClass(
                          course.level
                        )}`}
                      >
                        {course.level}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-black text-white font-['Outfit']">
                        {formatPrice(course)}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {currency === 'LKR' ? `or $${course.price_usd} USD` : `or LKR ${course.price_lkr.toLocaleString()}`}
                      </div>
                    </div>
                  </div>

                  {/* Course Title & Duration */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-sky-400" />
                      <span>{course.duration}</span>
                      <span>•</span>
                      <span className="text-slate-300 font-medium">{course.category}</span>
                    </div>
                    <h2 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors font-['Outfit'] leading-snug">
                      {course.title}
                    </h2>
                  </div>

                  {/* Course Description */}
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {course.description}
                  </p>

                  {/* Technologies Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {course.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-slate-700/60 group-hover:border-slate-600 transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                    {course.technologies.length > 6 && (
                      <span className="text-[11px] font-medium px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        +{course.technologies.length - 6} more
                      </span>
                    )}
                  </div>

                  {/* Syllabus Toggle Drawer */}
                  {course.syllabus && course.syllabus.length > 0 && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedSyllabusSlug(isSyllabusOpen ? null : course.slug)
                        }
                        className="w-full flex items-center justify-between text-xs font-semibold py-2 px-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 text-sky-400 border border-slate-800 transition-all"
                      >
                        <span className="flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5" />
                          <span>Curriculum Outline ({course.syllabus.length} Modules)</span>
                        </span>
                        {isSyllabusOpen ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      {/* Expandable Syllabus Detail */}
                      {isSyllabusOpen && (
                        <div className="mt-3 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3 max-h-60 overflow-y-auto text-xs text-slate-300">
                          {course.syllabus.map((mod) => (
                            <div key={mod.module_number} className="space-y-1">
                              <div className="font-bold text-sky-300 flex items-center gap-1.5">
                                <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 inline-flex items-center justify-center text-[10px]">
                                  {mod.module_number}
                                </span>
                                <span>{mod.title}</span>
                              </div>
                              <ul className="list-disc list-inside text-slate-400 pl-6 space-y-0.5 text-[11px]">
                                {mod.topics.map((t, idx) => (
                                  <li key={idx}>{t}</li>
                                ))}
                              </ul>
                              {mod.lab && (
                                <div className="ml-6 mt-1 p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300">
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

                {/* Batch & Enrollment Footer */}
                <div className="p-7 pt-4 border-t border-slate-800/80 bg-slate-900/60 space-y-4 rounded-b-3xl">
                  {/* Next Batch Info & Seat Limits */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                        <Calendar className="w-4 h-4 text-sky-400" />
                        <span>
                          Next Cohort: {nextBatch ? nextBatch.start_date : 'Nov 2026'}
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-1.5 font-bold ${
                          isFillingFast ? 'text-amber-400' : 'text-emerald-400'
                        }`}
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>{seatsLeft} seats left</span>
                      </div>
                    </div>

                    {/* Schedule Snippet */}
                    <p className="text-[11px] text-slate-400">
                      {nextBatch?.schedule || 'Weekends | 09:00 AM - 01:00 PM IST'}
                    </p>

                    {/* Capacity Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isFillingFast ? 'bg-amber-400' : 'bg-sky-500'
                        }`}
                        style={{
                          width: `${Math.min(
                            100,
                            Math.round(((maxCapacity - seatsLeft) / maxCapacity) * 100)
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* "Enroll Now" Action Trigger */}
                  <button
                    type="button"
                    onClick={() => handleOpenEnrollModal(course)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:via-blue-500 hover:to-indigo-500 shadow-lg shadow-sky-500/25 transition-all active:scale-98"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cohort Batch Selection & Enrollment Modal */}
      {enrollModalCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel w-full max-w-2xl rounded-3xl border border-slate-700/80 shadow-2xl p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
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
            <div className="space-y-2 pr-8">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-sky-500 text-white">
                  {enrollModalCourse.certification_code || 'Azure'}
                </span>
                <span className="text-xs text-sky-400 font-semibold uppercase tracking-wider">
                  Cohort Enrollment
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-white font-['Outfit']">
                {enrollModalCourse.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Choose your preferred live weekend cohort schedule. Each batch includes 1-on-1 mentor guidance, Azure sandbox accounts, and recording access.
              </p>
            </div>

            {/* Price Badge */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider">Tuition Fee</span>
                <div className="text-2xl font-black text-white font-['Outfit']">
                  {formatPrice(enrollModalCourse)}
                </div>
              </div>
              <div className="text-right text-xs text-slate-400">
                <div>Includes Azure Sandbox Pass</div>
                <div className="text-emerald-400 font-medium">Exam Voucher Included</div>
              </div>
            </div>

            {/* Active Batches Selection */}
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
                    const isAvailable = batch.is_available ?? (seats > 0);

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

                        {/* Batch Availability Badge */}
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
                              Max {batch.max_capacity} students
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
