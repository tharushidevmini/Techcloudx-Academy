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
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const userString = localStorage.getItem('user');
  const user = userString
    ? JSON.parse(userString)
    : {
        full_name: 'Alex Rivera',
        email: 'alex.rivera@techcloudx.com',
        role: 'student',
      };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span>Active Cohort In Progress</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
            Welcome back, {user.full_name.split(' ')[0]}!
          </h1>
          <p className="text-sm text-slate-400">
            Your live cohort session for <span className="text-sky-300 font-semibold">AWS Solutions Architect (Batch SAA-2601)</span> starts this Saturday at 10:00 AM EST.
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
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-300 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-all">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Open Sandbox Lab</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Enrolled Cohort', value: 'AWS SAA-C03', sub: 'Week 4 of 8', icon: Calendar, color: 'text-sky-400' },
          { title: 'Lab Sandbox Hours', value: '38.5 hrs', sub: '12 hrs remaining', icon: Terminal, color: 'text-emerald-400' },
          { title: 'Lab Assignments', value: '7 / 8 Done', sub: 'Next due Sunday', icon: FileText, color: 'text-amber-400' },
          { title: 'Cohort Attendance', value: '100%', sub: 'Perfect record', icon: CheckCircle2, color: 'text-indigo-400' },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.title} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {metric.title}
                </span>
                <Icon className={`w-5 h-5 ${metric.color}`} />
              </div>
              <p className="text-2xl font-black text-white font-['Outfit']">{metric.value}</p>
              <p className="text-xs text-slate-400">{metric.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Current Cohort Curriculum & Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white font-['Outfit']">Cohort Live Schedule & Modules</h2>
              <p className="text-xs text-slate-400">Mastering Multi-AZ VPCs, Load Balancing, and EKS clusters</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Module 4 In Progress
            </span>
          </div>

          <div className="space-y-4">
            {[
              {
                week: 'Week 1',
                title: 'Cloud Foundations & Identity Access Management (IAM)',
                status: 'Completed',
                date: 'Completed Oct 05',
              },
              {
                week: 'Week 2',
                title: 'High Availability Multi-Tier VPCs & Transit Gateways',
                status: 'Completed',
                date: 'Completed Oct 12',
              },
              {
                week: 'Week 3',
                title: 'Elastic Compute (EC2), Auto-Scaling, and ALB Routing',
                status: 'Completed',
                date: 'Completed Oct 19',
              },
              {
                week: 'Week 4',
                title: 'Production Kubernetes (EKS) & Microservices Containerization',
                status: 'Current Live',
                date: 'Saturday, 10:00 AM EST',
              },
              {
                week: 'Week 5',
                title: 'Database Resiliency (RDS Multi-AZ, DynamoDB Global Tables)',
                status: 'Upcoming',
                date: 'Next Saturday',
              },
            ].map((module) => (
              <div
                key={module.week}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold ${
                      module.status === 'Completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : module.status === 'Current Live'
                        ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 animate-pulse'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {module.week.split(' ')[1]}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{module.title}</h4>
                    <p className="text-xs text-slate-400">{module.date}</p>
                  </div>
                </div>

                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    module.status === 'Completed'
                      ? 'text-emerald-400 bg-emerald-500/10'
                      : module.status === 'Current Live'
                      ? 'text-sky-300 bg-sky-500/20'
                      : 'text-slate-400 bg-slate-800'
                  }`}
                >
                  {module.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cloud Sandbox Sandbox Widget */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white font-['Outfit']">Your Dedicated Lab Sandbox</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Temporary AWS Sandbox environment provisioned for Batch SAA-2601. Credentials reset every 24 hours.
            </p>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Account ID:</span>
                <span className="text-sky-400">9284-1849-0129</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Region:</span>
                <span>us-east-1 (N. Virginia)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Role:</span>
                <span>TechCloudX-Student-Sandbox</span>
              </div>
            </div>

            <button className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-md shadow-emerald-500/20 transition-all">
              <span>Launch AWS Console</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white font-['Outfit']">Instructor Office Hours</h3>
            <p className="text-xs text-slate-400">
              Need architectural guidance? 1-on-1 slots available Wednesdays & Thursdays.
            </p>
            <button className="w-full py-2.5 rounded-xl border border-slate-700 hover:border-slate-600 text-xs font-semibold text-slate-200 hover:text-white transition-colors">
              Schedule 1-on-1 Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
