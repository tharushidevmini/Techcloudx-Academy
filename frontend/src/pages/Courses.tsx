import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Clock,
  Users,
  CheckCircle,
  Calendar,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  price_cents: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  next_batch: string;
  seats_left: number;
  technologies: string[];
}

export const Courses: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const courses: Course[] = [
    {
      id: 'c-101',
      title: 'AWS Certified Solutions Architect Associate (SAA-C03)',
      slug: 'aws-solutions-architect-associate',
      description: 'Comprehensive deep dive into AWS foundational services, resilient multi-tier architectures, VPC design, IAM policies, and RDS databases.',
      price_cents: 49900,
      level: 'beginner',
      duration: '8 Weeks',
      next_batch: 'Nov 15, 2026',
      seats_left: 6,
      technologies: ['AWS VPC', 'EC2', 'S3', 'RDS', 'IAM', 'CloudFront'],
    },
    {
      id: 'c-102',
      title: 'Enterprise Kubernetes & GitOps Platform Engineering',
      slug: 'kubernetes-gitops-platform-engineering',
      description: 'Master production EKS/GKE cluster design, Helm charts, ArgoCD continuous deployment, Service Mesh (Istio), and Prometheus observability.',
      price_cents: 69900,
      level: 'intermediate',
      duration: '10 Weeks',
      next_batch: 'Dec 01, 2026',
      seats_left: 4,
      technologies: ['Kubernetes', 'ArgoCD', 'Helm', 'Docker', 'Prometheus', 'Istio'],
    },
    {
      id: 'c-103',
      title: 'Azure DevOps & Infrastructure as Code with Terraform',
      slug: 'azure-devops-terraform-iac',
      description: 'Automate enterprise Azure cloud infrastructure with Terraform modules, state locking, CI/CD pipelines in Azure DevOps, and security scanning.',
      price_cents: 54900,
      level: 'intermediate',
      duration: '6 Weeks',
      next_batch: 'Nov 20, 2026',
      seats_left: 8,
      technologies: ['Azure', 'Terraform', 'Azure DevOps', 'ARM', 'GitHub Actions'],
    },
    {
      id: 'c-104',
      title: 'Google Cloud Professional Cloud Architect (PCA)',
      slug: 'gcp-professional-cloud-architect',
      description: 'Design enterprise data pipelines with BigQuery, serverless Cloud Run, Google Kubernetes Engine (GKE), and zero-trust security postures.',
      price_cents: 59900,
      level: 'advanced',
      duration: '8 Weeks',
      next_batch: 'Dec 10, 2026',
      seats_left: 5,
      technologies: ['GCP', 'BigQuery', 'Cloud Run', 'GKE', 'Anthos'],
    },
    {
      id: 'c-105',
      title: 'Site Reliability Engineering (SRE) & Distributed Chaos Testing',
      slug: 'sre-chaos-engineering-production',
      description: 'Learn real-world incident management, SLI/SLO formulation, OpenTelemetry distributed tracing, and Chaos Mesh fault-injection experiments.',
      price_cents: 74900,
      level: 'advanced',
      duration: '8 Weeks',
      next_batch: 'Jan 05, 2027',
      seats_left: 10,
      technologies: ['OpenTelemetry', 'Grafana', 'Chaos Mesh', 'SLO/SLI', 'Linux Kernel'],
    },
    {
      id: 'c-106',
      title: 'Cloud Security Fundamentals & Compliance (Zero-Trust)',
      slug: 'cloud-security-zero-trust',
      description: 'Implement DevSecOps guardrails, AWS GuardDuty, CSPM posture management, and compliance standards (SOC2, ISO 27001, HIPAA).',
      price_cents: 44900,
      level: 'beginner',
      duration: '6 Weeks',
      next_batch: 'Nov 25, 2026',
      seats_left: 12,
      technologies: ['Trivy', 'Falco', 'AWS GuardDuty', 'HashiCorp Vault'],
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesQuery =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLevel && matchesQuery;
  });

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(0)}`;
  };

  const getLevelBadge = (level: string) => {
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
      {/* Catalog Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-extrabold tracking-widest text-sky-400">
          Industrial Cloud Curriculum
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-['Outfit']">
          Cohort-Based <span className="gradient-text">Cloud Certification Tracks</span>
        </h1>
        <p className="text-slate-300 text-base leading-relaxed">
          Every program is taught by Senior Principal Architects and includes live weekend cohort workshops, individual cloud sandbox subscriptions, and capstone architectural reviews.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by technology (AWS, Kubernetes, Terraform)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
          />
        </div>

        {/* Level Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <Filter className="w-4 h-4 text-slate-400 mr-1 hidden sm:block" />
          {['all', 'beginner', 'intermediate', 'advanced'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedLevel === lvl
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="glass-panel rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-800 hover:border-sky-500/40 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 group"
          >
            <div className="p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${getLevelBadge(
                    course.level
                  )}`}
                >
                  {course.level}
                </span>
                <span className="text-xl font-black text-white font-['Outfit']">
                  {formatPrice(course.price_cents)}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors font-['Outfit'] leading-snug">
                {course.title}
              </h2>

              <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                {course.description}
              </p>

              {/* Technologies Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {course.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Batch & Enrollment Footer */}
            <div className="p-7 pt-4 border-t border-slate-800/80 bg-slate-900/40 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  <span>Next: {course.next_batch}</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                  <Users className="w-4 h-4" />
                  <span>{course.seats_left} seats left</span>
                </div>
              </div>

              <Link
                to={`/register?course=${course.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-md shadow-sky-500/20 transition-all active:scale-95"
              >
                <span>Enroll in Cohort</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
