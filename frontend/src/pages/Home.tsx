import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Laptop,
  Award,
  Users,
  Headphones,
  ArrowRight,
  Play,
  X,
  Star,
  Video,
  CheckCircle2,
  Sparkles,
  Clock,
  ShieldCheck,
  Check,
  Flame,
  Volume2,
  VolumeX,
  ChevronRight,
} from 'lucide-react';
import heroStudentImg from '../assets/hero_student_cloud.jpg';

export const Home: React.FC = () => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // 5 Feature Pillars for the floating white card strip
  const pillars = [
    {
      id: 'expert-led',
      title: 'Expert-Led Courses',
      subtitle: 'Learn from Principal Architects',
      icon: GraduationCap,
      color: 'text-sky-500 bg-sky-50 dark:bg-sky-500/10',
    },
    {
      id: 'hands-on',
      title: 'Hands-On Practice',
      subtitle: 'Dedicated Cloud Sandboxes',
      icon: Laptop,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10',
    },
    {
      id: 'certificates',
      title: 'Certificates',
      subtitle: 'Industry-Recognized Badges',
      icon: Award,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10',
    },
    {
      id: 'community',
      title: 'Active Community',
      subtitle: 'Global Discord & Alumni',
      icon: Users,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
    },
    {
      id: 'support',
      title: 'Dedicated Support',
      subtitle: '24/7 Mentor Assistance',
      icon: Headphones,
      color: 'text-violet-500 bg-violet-50 dark:bg-violet-500/10',
    },
  ];

  // 3 Popular Courses specified in Requirement 3
  const popularCourses = [
    {
      id: 'az-900',
      title: 'Microsoft Azure Fundamentals',
      code: 'AZ-900',
      slug: 'microsoft-azure-fundamentals-az-900',
      tag: 'Beginner',
      tagColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      duration: '8h',
      learners: '12K+',
      rating: '4.9',
      reviews: '1,420',
      platform: 'Azure',
      platformLogo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
          <path d="M12.5 3L4 18.5h5.5l3-5.5 3 5.5H21L12.5 3z" fill="#0078D4" />
          <path d="M14 13l-1.5 2.5 3 3H21L14 13z" fill="#50E6FF" />
        </svg>
      ),
      glowColor: 'group-hover:border-sky-500/50 group-hover:shadow-sky-500/15',
      accentGradient: 'from-sky-500 to-blue-600',
      description: 'Master core cloud computing concepts, security, privacy, compliance, and Azure pricing architectures.',
    },
    {
      id: 'aws-clf-c02',
      title: 'AWS Cloud Practitioner',
      code: 'CLF-C02',
      slug: 'aws-certified-cloud-practitioner-clf-c02',
      tag: 'Intermediate',
      tagColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      duration: '12h',
      learners: '15K+',
      rating: '4.9',
      reviews: '2,180',
      platform: 'AWS',
      platformLogo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" color="#FF9900">
          <path d="M12.9 14.5c-2.3 0-4.6-.7-6.5-2-.3-.2-.3-.6-.1-.9.2-.3.6-.3.9-.1 1.7 1.2 3.8 1.8 5.7 1.8 2.6 0 5-1 6.8-2.7.3-.2.7-.2.9.1.2.3.2.7-.1.9-2.1 2-4.9 2.9-7.7 2.9zm6.6-1.5c-.3 0-.6-.3-.6-.6 0-.2.1-.4.3-.5 1.5-.7 2.2-1.9 2.2-3.1 0-1.8-1.5-2.8-3.7-2.8-2.6 0-5.4 1.5-6.9 3.5-.2.3-.6.3-.9.1-.3-.2-.3-.6-.1-.9 1.8-2.3 4.9-4 8-4 2.9 0 5 1.5 5 4.1 0 1.7-1.1 3.2-3.3 4.2z" />
        </svg>
      ),
      glowColor: 'group-hover:border-amber-500/50 group-hover:shadow-amber-500/15',
      accentGradient: 'from-amber-500 to-orange-600',
      description: 'Acquire high-demand AWS cloud computing skills, IAM security, EC2, S3, and billing management.',
    },
    {
      id: 'devops-essentials',
      title: 'DevOps Essentials',
      code: 'DEV-101',
      slug: 'devops-essentials-ci-cd-docker-kubernetes',
      tag: 'Advanced',
      tagColor: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
      duration: '15h',
      learners: '10K+',
      rating: '4.8',
      reviews: '980',
      platform: 'DevOps',
      platformLogo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" color="#38bdf8">
          <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
        </svg>
      ),
      glowColor: 'group-hover:border-violet-500/50 group-hover:shadow-violet-500/15',
      accentGradient: 'from-indigo-500 to-violet-600',
      description: 'Master CI/CD automated pipelines, Docker containerization, Kubernetes clustering, and Terraform GitOps.',
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 pb-12 lg:pt-12 lg:pb-20">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-400/15 dark:bg-sky-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-blue-500/10 dark:bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline & CTA Group */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/90 dark:bg-sky-950/60 border border-sky-300/80 dark:border-sky-500/30 text-sky-800 dark:text-sky-300 text-xs font-bold tracking-wider uppercase shadow-sm">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                <span>LEARN • PRACTICE • GET CERTIFIED</span>
              </div>

              {/* Bold Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12] font-['Outfit']">
                Master Cloud Technologies with{' '}
                <span className="gradient-text drop-shadow-sm">TechCloudX Academy</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
                Accelerate your cloud architecture career with hands-on Azure, AWS, and DevOps cohort training.
                Gain production confidence with dedicated sandboxes, industry blueprints, and 1-on-1 mentorship.
              </p>

              {/* CTA Group */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                {/* Gradient Pill Button */}
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm sm:text-base text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/35 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>

                {/* Circular Bordered "Watch Video" Play Button */}
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(true)}
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-full text-sm font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 border-2 border-slate-300 dark:border-slate-700/80 shadow-md hover:shadow-lg transition-all duration-200 group"
                  aria-label="Watch academy introduction video"
                >
                  <span className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-sky-400 transition-all shadow-md shadow-sky-500/30">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </span>
                  <span>Watch Video</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Exam Pass Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-sky-500" />
                  <span>Real Cloud Sandboxes</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  <span>Lifetime Access</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Graphic with Floating Badges */}
            <div className="lg:col-span-5 relative flex items-center justify-center pt-6 lg:pt-0">
              {/* Circular Ambient Glow Frame */}
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 via-blue-500/10 to-indigo-500/20 rounded-3xl blur-2xl -z-10" />

              {/* Main Student Graphic Container */}
              <div className="relative w-full max-w-md sm:max-w-lg aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800/80 bg-slate-100 dark:bg-slate-900">
                <img
                  src={heroStudentImg}
                  alt="TechCloudX Academy Student mastering cloud architecture"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle Inner Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Badge 1: Microsoft Azure (Azure blue logo + text) */}
              <div className="absolute -top-3 sm:-top-5 -left-3 sm:-left-6 px-3.5 py-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-900/10 dark:shadow-sky-500/10 flex items-center gap-2.5 animate-bounce [animation-duration:4s]">
                <div className="w-8 h-8 rounded-xl bg-sky-500/10 flex items-center justify-center p-1.5">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                    <path d="M12.5 3L4 18.5h5.5l3-5.5 3 5.5H21L12.5 3z" fill="#0078D4" />
                    <path d="M14 13l-1.5 2.5 3 3H21L14 13z" fill="#50E6FF" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                    Certification
                  </div>
                  <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                    Microsoft Azure
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: AWS (authentic AWS logo) */}
              <div className="absolute top-1/2 -right-3 sm:-right-6 -translate-y-1/2 px-3.5 py-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-900/10 dark:shadow-amber-500/10 flex items-center gap-2.5 animate-bounce [animation-duration:5s] [animation-delay:1s]">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center p-1.5">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" color="#FF9900">
                    <path d="M12.9 14.5c-2.3 0-4.6-.7-6.5-2-.3-.2-.3-.6-.1-.9.2-.3.6-.3.9-.1 1.7 1.2 3.8 1.8 5.7 1.8 2.6 0 5-1 6.8-2.7.3-.2.7-.2.9.1.2.3.2.7-.1.9-2.1 2-4.9 2.9-7.7 2.9zm6.6-1.5c-.3 0-.6-.3-.6-.6 0-.2.1-.4.3-.5 1.5-.7 2.2-1.9 2.2-3.1 0-1.8-1.5-2.8-3.7-2.8-2.6 0-5.4 1.5-6.9 3.5-.2.3-.6.3-.9.1-.3-.2-.3-.6-.1-.9 1.8-2.3 4.9-4 8-4 2.9 0 5 1.5 5 4.1 0 1.7-1.1 3.2-3.3 4.2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                    Official Track
                  </div>
                  <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                    AWS Practitioner
                  </div>
                </div>
              </div>

              {/* Floating Badge 3: DevOps (Infinity loop logo + DevOps text) */}
              <div className="absolute -bottom-4 sm:-bottom-6 -left-2 sm:-left-4 px-3.5 py-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-900/10 dark:shadow-violet-500/10 flex items-center gap-2.5 animate-bounce [animation-duration:4.5s] [animation-delay:0.5s]">
                <div className="w-8 h-8 rounded-xl bg-violet-500/10 flex items-center justify-center p-1.5">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                    Live CI/CD
                  </div>
                  <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                    DevOps & K8s
                  </div>
                </div>
              </div>

              {/* "Your Cloud Learning Partner" Playful Script Accent */}
              <div className="absolute -bottom-9 right-2 sm:right-6 select-none pointer-events-none transform rotate-[-4deg]">
                <div className="flex items-center gap-1.5 text-sky-600 dark:text-sky-300 font-['Caveat',cursive] text-2xl sm:text-3xl font-bold drop-shadow">
                  <span>Your Cloud Learning Partner ✨</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURE HIGHLIGHTS STRIP (Floating White Card with 5 Pillars) */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        <div className="bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xl shadow-slate-200/70 dark:shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800/80">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="flex items-center gap-3.5 pt-4 sm:pt-0 lg:px-4 first:pt-0 first:pl-0 last:pr-0 group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${pillar.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight font-['Outfit']">
                      {pillar.title}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      {pillar.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. POPULAR COURSES SECTION ("Start Your Cloud Journey") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>POPULAR PLATFORM TRACKS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] tracking-tight">
              Start Your Cloud Journey
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
              Comprehensive industry curriculum designed and maintained by active Cloud Architects.
            </p>
          </div>

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 group"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Interactive Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {popularCourses.map((course) => (
            <div
              key={course.id}
              className={`group rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between relative overflow-hidden ${course.glowColor}`}
            >
              {/* Subtle top accent bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${course.accentGradient}`}
              />

              <div className="space-y-4">
                {/* Header row: Platform logo + Level Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-sm">
                    {course.platformLogo}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${course.tagColor}`}
                  >
                    {course.tag}
                  </span>
                </div>

                {/* Course Title & Code */}
                <div>
                  <div className="text-[11px] font-bold text-sky-600 dark:text-sky-400 tracking-wider uppercase">
                    {course.code}
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] mt-1 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {course.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {course.description}
                </p>

                {/* Meta details: Duration, Learners & Rating */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-sky-500" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Users className="w-3.5 h-3.5 text-blue-500" />
                    <span>{course.learners} Learners</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{course.rating}</span>
                  </div>
                </div>
              </div>

              {/* Bottom CTA Arrow Action */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Live Cohort & Labs
                </span>
                <Link
                  to={`/courses?search=${encodeURIComponent(course.title)}`}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 group-hover:underline"
                >
                  <span>Explore Syllabus</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BOTTOM METRICS & VALUE PROPOSITION STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Dark Rounded Banner with Live Metrics */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-slate-800">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Live Metrics on the left */}
            <div className="md:col-span-6 grid grid-cols-3 gap-4 border-b md:border-b-0 md:border-r border-slate-800/80 pb-8 md:pb-0 md:pr-8">
              {/* 50K+ Students */}
              <div className="text-center md:text-left space-y-1">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto md:mx-0 mb-2">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-['Outfit']">
                  50K+
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Students Trained
                </div>
              </div>

              {/* 200+ Courses */}
              <div className="text-center md:text-left space-y-1">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto md:mx-0 mb-2">
                  <Video className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-sky-400 font-['Outfit']">
                  200+
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Live Cloud Modules
                </div>
              </div>

              {/* 4.8/5 Rating */}
              <div className="text-center md:text-left space-y-1">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto md:mx-0 mb-2">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-400 font-['Outfit']">
                  4.8/5
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Learner Rating
                </div>
              </div>
            </div>

            {/* "Why Choose Us?" Section with Checkmark Bullets */}
            <div className="md:col-span-6 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
                  THE TECHCLOUDX ADVANTAGE
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mt-1">
                  Why Choose Us?
                </h3>
              </div>

              <div className="space-y-3 pt-1">
                {/* Bullet 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Industry-Relevant Skills</h4>
                    <p className="text-xs text-slate-400">
                      Curriculum aligned with current enterprise architectural patterns and hiring standards.
                    </p>
                  </div>
                </div>

                {/* Bullet 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Flexible Learning</h4>
                    <p className="text-xs text-slate-400">
                      Weekend live interactive cohorts combined with 24/7 on-demand cloud lab access.
                    </p>
                  </div>
                </div>

                {/* Bullet 3 */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Career Support</h4>
                    <p className="text-xs text-slate-400">
                      Resume architectural audits, 1-on-1 mock technical interviews, and alumni referrals.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 hover:text-sky-300"
                >
                  <span>Read our full mission & advisory framework</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE VIDEO MODAL (Watch Video CTA) */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-3xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-['Outfit']">
                    TechCloudX Academy — Platform Overview & Cloud Labs
                  </h4>
                  <p className="text-[11px] text-slate-400">Inside our enterprise cloud sandbox architecture</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close video modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Mockup / Stream */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img
                src={heroStudentImg}
                alt="Video preview background"
                className="w-full h-full object-cover opacity-40 filter blur-xs"
              />

              {/* Video Overlay Center Controls */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 rounded-full bg-sky-500/90 hover:bg-sky-400 text-white flex items-center justify-center shadow-2xl shadow-sky-500/50 transform hover:scale-110 transition-all cursor-pointer"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? (
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-6 bg-white rounded-full" />
                      <span className="w-2 h-6 bg-white rounded-full" />
                    </div>
                  ) : (
                    <Play className="w-8 h-8 fill-current ml-1" />
                  )}
                </button>

                <div className="space-y-1">
                  <p className="text-white font-bold text-lg font-['Outfit']">
                    Hands-On Azure, AWS & Kubernetes Lab Tour
                  </p>
                  <p className="text-xs text-slate-300 max-w-md">
                    Watch how students deploy production clusters, Terraform pipelines, and secure cloud microservices.
                  </p>
                </div>
              </div>

              {/* Bottom Video Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:text-white"
                  >
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                  <span>02:45 / 05:20</span>
                </div>
                <div className="flex-1 mx-4 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                  <div className="w-[52%] h-full bg-sky-500 rounded-full" />
                </div>
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1 hover:text-white"
                  aria-label="Toggle mute"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Modal Footer with Action */}
            <div className="p-4 sm:p-5 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Ready to join the next batch?</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Close Preview
                </button>
                <Link
                  to="/courses"
                  onClick={() => setVideoModalOpen(false)}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-md"
                >
                  Browse All Cohorts →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
