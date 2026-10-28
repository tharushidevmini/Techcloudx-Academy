import React from 'react';
import { Link } from 'react-router-dom';
import {
  Cloud,
  Terminal,
  Shield,
  Award,
  ArrowRight,
  CheckCircle2,
  Users,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import heroBg from '../assets/background.png';

export const Home: React.FC = () => {
  const tracks = [
    {
      title: 'AWS Certified Solutions Architect',
      level: 'Associate & Professional',
      description: 'Master VPC peering, EKS orchestration, DynamoDB global tables, and fault-tolerant cloud architecture.',
      icon: Cloud,
      badge: 'Bestseller',
      color: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30',
    },
    {
      title: 'Azure Cloud DevOps & Platform',
      level: 'Expert',
      description: 'Implement enterprise CI/CD pipelines with Azure Repos, Terraform ARM templates, and AKS clusters.',
      icon: Layers,
      badge: 'High Demand',
      color: 'from-sky-500/20 to-blue-500/10 text-sky-400 border-sky-500/30',
    },
    {
      title: 'Google Cloud Professional Architect',
      level: 'Intermediate',
      description: 'Design distributed BigQuery data warehouses, Anthos hybrid clouds, and GKE microservices.',
      icon: Cpu,
      badge: 'Trending',
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 bg-cover bg-center bg-no-repeat border-b border-slate-800/60"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Sleek Dark Multi-gradient & Backdrop Overlay for High Contrast */}
        <div className="absolute inset-0 bg-slate-950/75 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b132b]/95 via-slate-950/85 to-[#0b132b] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-950/90 pointer-events-none" />
        <div className="absolute inset-0 backdrop-blur-[1px] pointer-events-none" />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-sky-500/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs font-semibold text-sky-300 border border-sky-500/30 shadow-lg shadow-sky-500/10 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Cohort 2026 Live Cohort Admissions Now Open</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight font-['Outfit'] drop-shadow-md">
            Master Industrial Cloud Architecture & <span className="gradient-text">DevOps at Scale</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-200 font-normal leading-relaxed drop-shadow-sm">
            TechCloudX Academy delivers production-grade cloud training for engineers. Hands-on live cohorts, dedicated cloud sandboxes, and enterprise architectural blueprints.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/courses"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-xl shadow-sky-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Cohort Courses</span>
              <ArrowRight className="w-5 h-5 text-sky-200" />
            </Link>
            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-slate-100 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all backdrop-blur-sm"
            >
              <span>Enroll as Student</span>
            </Link>
          </div>

          {/* Social Proof Stats */}
          <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-slate-800/80">
            <div className="p-3 rounded-xl bg-slate-950/40 backdrop-blur-sm border border-white/5">
              <p className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">98.4%</p>
              <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">Exam Pass Rate</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/40 backdrop-blur-sm border border-white/5">
              <p className="text-3xl sm:text-4xl font-extrabold text-sky-400 font-['Outfit']">12,000+</p>
              <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">Engineers Trained</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/40 backdrop-blur-sm border border-white/5">
              <p className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">100%</p>
              <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">Hands-on Labs</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/40 backdrop-blur-sm border border-white/5">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-['Outfit']">4.9 / 5</p>
              <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">Student Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tracks */}
      <section id="paths" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Outfit']">
            Featured Cloud Learning Paths
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Curated curriculum aligned with real-world enterprise cloud standards and certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tracks.map((track) => {
            const Icon = track.icon;
            return (
              <div
                key={track.title}
                className="glass-panel p-8 rounded-2xl flex flex-col justify-between hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-slate-800/80 text-sky-400 ring-1 ring-white/10 group-hover:ring-sky-500/40">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border bg-gradient-to-r ${track.color}`}>
                      {track.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors font-['Outfit']">
                    {track.title}
                  </h3>
                  <p className="text-xs font-semibold text-sky-400/90 uppercase tracking-wider">
                    {track.level}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {track.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400">8 Weeks Cohort</span>
                  <Link
                    to="/courses"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-400 hover:text-sky-300"
                  >
                    <span>View Curriculum</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why TechCloudX Academy */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="inline-block text-xs uppercase font-extrabold tracking-widest text-sky-400">
                Architectural Pedigree
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Outfit'] leading-tight">
                Built by Cloud Architects for Future Cloud Leaders
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Most platforms teach theory. TechCloudX Academy is engineered as an industrial LMS with live PostgreSQL relational tracking, containerized microservice architectures, and dedicated multi-cloud lab sandboxes.
              </p>
              <div className="space-y-3">
                {[
                  'Live Cohorts with Principal Solutions Architects',
                  'Dedicated Cloud Sandbox accounts with zero unexpected bills',
                  'Enterprise capstone projects evaluated with production standards',
                  'Direct certification vouchers and alumni job referrals',
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-slate-200">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl bg-slate-950 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">cloud-orchestrator.sh</span>
                </div>
                <div className="font-mono text-xs text-sky-300 space-y-2 leading-relaxed">
                  <p><span className="text-slate-500"># Initializing AWS Multi-AZ Cluster</span></p>
                  <p><span className="text-emerald-400">$</span> terraform apply -auto-approve</p>
                  <p className="text-slate-400">&gt; aws_vpc.techcloudx: Creating...</p>
                  <p className="text-slate-400">&gt; aws_eks_cluster.production: 3 worker nodes healthy [OK]</p>
                  <p className="text-emerald-400">&gt; PostgreSQL Connection Pool: Active (20 idle clients)</p>
                  <p className="text-sky-400">&gt; TechCloudX Academy Sandbox Ready: https://sandbox.techcloudx.academy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
