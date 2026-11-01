import React from 'react';
import {
  Calendar,
  Clock,
  Terminal,
  ExternalLink,
  Award,
  Video,
  CheckCircle2,
  AlertCircle,
  FileText,
  Play,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const displayName = user?.name || user?.full_name || 'Alex Rivera';
  const firstName = displayName.split(' ')[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-500/10 border border-sky-300 dark:border-sky-500/20 text-xs font-semibold text-sky-700 dark:text-sky-400">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
            <span>Active Cohort In Progress</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
            Welcome back, {firstName}!
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Your live cohort session for <span className="text-sky-600 dark:text-sky-300 font-semibold">AWS Solutions Architect (Batch SAA-2601)</span> starts this Saturday at 10:00 AM EST.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <a
            href="https://meet.google.com"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-500/25 transition-all"
          >
            <Video className="w-4 h-4" />
            <span>Join Live Cohort Room</span>
          </a>
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-all">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span>Open Sandbox Lab</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Enrolled Cohort', value: 'AWS SAA-C03', sub: 'Week 4 of 8', icon: Calendar, color: 'text-sky-500' },
          { title: 'Lab Sandbox Hours', value: '38.5 hrs', sub: '12 hrs remaining', icon: Terminal, color: 'text-emerald-500' },
          { title: 'Lab Assignments', value: '7 / 8 Done', sub: 'Next due Sunday', icon: FileText, color: 'text-amber-500' },
          { title: 'Cohort Attendance', value: '100%', sub: 'Perfect record', icon: CheckCircle2, color: 'text-indigo-500' },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.title} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">{metric.title}</span>
                <Icon className={`w-5 h-5 ${metric.color}`} />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-['Outfit']">{metric.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{metric.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Main Dashboard Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Live Syllabus Progress */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit']">Cohort Curriculum Progress</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">AWS Certified Solutions Architect (Associate SAA-C03)</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300">
              Module 4 / 8 Active
            </span>
          </div>

          <div className="space-y-4">
            {[
              { num: 1, title: 'Cloud Fundamentals, IAM & Security Governance', status: 'Completed', date: 'Oct 05' },
              { num: 2, title: 'VPC Architecture, Subnetting & Transit Gateways', status: 'Completed', date: 'Oct 12' },
              { num: 3, title: 'EC2 Auto Scaling, ALB/NLB & High Availability', status: 'Completed', date: 'Oct 19' },
              { num: 4, title: 'S3 Storage Classes, Lifecycle Rules & KMS Encryption', status: 'In Progress', date: 'Oct 26' },
              { num: 5, title: 'EKS Kubernetes Clusters, Fargate & Microservices', status: 'Upcoming', date: 'Nov 02' },
              { num: 6, title: 'Database Resilience: RDS Multi-AZ, DynamoDB Global', status: 'Upcoming', date: 'Nov 09' },
            ].map((mod) => (
              <div
                key={mod.num}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                      mod.status === 'Completed'
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                        : mod.status === 'In Progress'
                        ? 'bg-sky-500/15 text-sky-600 dark:text-sky-400'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {mod.num}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">{mod.title}</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Live Cohort Date: {mod.date}</p>
                  </div>
                </div>

                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                    mod.status === 'Completed'
                      ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                      : mod.status === 'In Progress'
                      ? 'bg-sky-100 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 animate-pulse'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {mod.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Active Sandboxes & Live Mentorship */}
        <div className="space-y-6">
          {/* Cloud Sandbox Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">Active Sandbox Tenant</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">AWS Production Mock</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/70 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Account ID:</span>
                <span className="font-bold text-slate-900 dark:text-white">9482-1049-5501</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">IAM Role:</span>
                <span className="text-sky-600 dark:text-sky-400 font-bold">CloudEngineerAdmin</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Expiry:</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">12 Days</span>
              </div>
            </div>

            <button className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all flex items-center justify-center gap-2">
              <span>Launch AWS Console</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Mentorship Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-4 h-4" />
              <span>1-on-1 Mentor Office Hours</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">
              Book Architecture Review
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Schedule a 30-minute private architectural audit with a Principal Cloud Architect to review your capstone terraform code.
            </p>
            <button className="w-full py-2.5 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all">
              Schedule with Mentor →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
