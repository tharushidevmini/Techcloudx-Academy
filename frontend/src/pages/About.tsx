import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Cloud,
  Layers,
  Cpu,
  Shield,
  Server,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Send,
  Mail,
  User,
  Phone,
  MessageSquare,
  FileText,
  Target,
  Compass,
  Laptop,
  Check,
  Building2,
  ExternalLink,
} from 'lucide-react';

export const About: React.FC = () => {
  const location = useLocation();

  // Inquiry Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Academy Inquiry');
  const [message, setMessage] = useState('');

  // Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [errorToast, setErrorToast] = useState<string | null>(null);

  // Active Cloud Matrix Tab
  const [activeMatrixTech, setActiveMatrixTech] = useState<'azure' | 'aws' | 'm365' | 'kubernetes' | 'ai'>('azure');

  // Handle URL hash scrolling (e.g. /about#contact or /contact)
  useEffect(() => {
    if (location.hash === '#contact' || location.pathname === '/contact') {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        setTimeout(() => {
          contactEl.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [location]);

  // Subject quick-selectors
  const subjectOptions = [
    'Azure Enterprise Cohort',
    'AWS Cloud Practitioner Track',
    'DevOps & Kubernetes Live Batch',
    'Microsoft 365 Administration',
    'Corporate Team Training',
    'Other / Advisory',
  ];

  // Cloud Tech Matrix Data
  const techMatrix = [
    {
      id: 'azure',
      name: 'Microsoft Azure',
      badge: 'Core Cloud Pillar',
      color: 'from-sky-500 to-blue-600',
      tagline: 'Enterprise Cloud Infrastructure, Entra ID & DevOps',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path d="M12.5 3L4 18.5h5.5l3-5.5 3 5.5H21L12.5 3z" fill="#0078D4" />
          <path d="M14 13l-1.5 2.5 3 3H21L14 13z" fill="#50E6FF" />
        </svg>
      ),
      skills: [
        'Virtual Machine Scale Sets & Hub-Spoke VNets',
        'Azure Kubernetes Service (AKS) Enterprise Clusters',
        'Entra ID (Azure AD), Conditional Access & PIM',
        'Azure Monitor, Log Analytics & Sentinel SIEM',
        'Infrastructure as Code with Bicep & Terraform',
      ],
      certifications: ['AZ-900', 'AZ-104', 'AZ-305', 'AZ-400'],
    },
    {
      id: 'aws',
      name: 'Amazon Web Services',
      badge: 'Hyperscale Cloud',
      color: 'from-amber-500 to-orange-600',
      tagline: 'Multi-AZ High Availability, EKS & Serverless Architecture',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor" color="#FF9900">
          <path d="M12.9 14.5c-2.3 0-4.6-.7-6.5-2-.3-.2-.3-.6-.1-.9.2-.3.6-.3.9-.1 1.7 1.2 3.8 1.8 5.7 1.8 2.6 0 5-1 6.8-2.7.3-.2.7-.2.9.1.2.3.2.7-.1.9-2.1 2-4.9 2.9-7.7 2.9zm6.6-1.5c-.3 0-.6-.3-.6-.6 0-.2.1-.4.3-.5 1.5-.7 2.2-1.9 2.2-3.1 0-1.8-1.5-2.8-3.7-2.8-2.6 0-5.4 1.5-6.9 3.5-.2.3-.6.3-.9.1-.3-.2-.3-.6-.1-.9 1.8-2.3 4.9-4 8-4 2.9 0 5 1.5 5 4.1 0 1.7-1.1 3.2-3.3 4.2z" />
        </svg>
      ),
      skills: [
        'VPC Peering, Transit Gateways & Direct Connect',
        'Elastic Kubernetes Service (EKS) & Fargate',
        'AWS Lambda, API Gateway & EventBridge Microservices',
        'DynamoDB Global Tables & Aurora Multi-Master',
        'IAM Least Privilege, KMS Encryption & CloudTrail',
      ],
      certifications: ['CLF-C02', 'SAA-C03', 'DVA-C02', 'SAP-C02'],
    },
    {
      id: 'm365',
      name: 'Microsoft 365 & Security',
      badge: 'Modern Workplace',
      color: 'from-blue-600 to-indigo-700',
      tagline: 'Cloud Identity, Intune Device Management & Purview Governance',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <rect x="3" y="3" width="8" height="8" rx="1.5" fill="#F25022" />
          <rect x="13" y="3" width="8" height="8" rx="1.5" fill="#7FBA00" />
          <rect x="3" y="13" width="8" height="8" rx="1.5" fill="#00A4EF" />
          <rect x="13" y="13" width="8" height="8" rx="1.5" fill="#FFB900" />
        </svg>
      ),
      skills: [
        'Microsoft Intune MDM/MAM Endpoint Configuration',
        'Exchange Online Hybrid Mail Flow & Protection',
        'Microsoft Teams Voice & Direct Routing',
        'Information Protection, DLP & Purview Compliance',
        'Defender for Endpoint & Cloud App Security',
      ],
      certifications: ['MS-900', 'MD-102', 'MS-102', 'SC-300'],
    },
    {
      id: 'kubernetes',
      name: 'Kubernetes & GitOps',
      badge: 'Cloud Native',
      color: 'from-cyan-500 to-blue-600',
      tagline: 'Container Orchestration, CI/CD Pipelines & Cloud Native Infrastructure',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" color="#38bdf8">
          <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
        </svg>
      ),
      skills: [
        'Production Multi-Zone Kubernetes Cluster Lifecycle',
        'Helm Charts, Kustomize & Package Orchestration',
        'ArgoCD GitOps Continuous Automated Delivery',
        'Envoy, Istio Service Mesh & Zero-Trust Ingress',
        'Prometheus & Grafana Observability Dashboards',
      ],
      certifications: ['CKA', 'CKAD', 'CKS'],
    },
    {
      id: 'ai',
      name: 'Cloud AI & ML Platforms',
      badge: 'Next-Gen Intelligence',
      color: 'from-purple-500 to-pink-600',
      tagline: 'Enterprise Generative AI, LLM Orchestration & Cloud RAG Pipelines',
      icon: (
        <Cpu className="w-8 h-8 text-pink-500" />
      ),
      skills: [
        'Azure OpenAI Service Private Endpoints & Deployments',
        'AWS Bedrock & SageMaker Distributed Model Training',
        'Vector Embeddings with Pinecone & pgvector',
        'LangChain & Semantic Kernel Agentic Workflows',
        'Responsible AI, Content Safety & Cost Governance',
      ],
      certifications: ['AI-900', 'AI-102', 'AWS Certified AI Practitioner'],
    },
  ];

  // Submit Inquiry to Backend API
  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessToast(null);
    setErrorToast(null);

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';
      const response = await fetch(`${apiBase}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim() || undefined,
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit inquiry.');
      }

      setSuccessToast(data.message || 'Inquiry submitted successfully! A cloud advisor will reach out shortly.');
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      setErrorToast(err.message || 'Failed to connect to backend server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentTech = techMatrix.find((t) => t.id === activeMatrixTech) || techMatrix[0];

  return (
    <div className="space-y-20 lg:space-y-28 pb-20">
      {/* 1. ACADEMY INTRODUCTION HERO */}
      <section className="relative pt-8 pb-12 lg:pt-14 lg:pb-16 text-center max-w-5xl mx-auto px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 text-xs font-bold uppercase tracking-wider mb-4 border border-sky-300 dark:border-sky-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ABOUT TECHCLOUDX ACADEMY</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white font-['Outfit'] tracking-tight leading-tight">
          Empowering the World’s Next Generation of{' '}
          <span className="gradient-text">Cloud & DevOps Architects</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          TechCloudX Academy was founded by veteran enterprise Cloud Architects who saw a critical gap between
          traditional online video tutorials and the actual complexity of production cloud infrastructure.
          We bridge that gap through cohort-based live learning, real cloud sandboxes, and architectural mentorship.
        </p>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 dark:text-sky-400 font-['Outfit']">50K+</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Alumni Worldwide</div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-['Outfit']">98.4%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Exam Pass Rate</div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 font-['Outfit']">100%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Hands-On Cloud Labs</div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-500 font-['Outfit']">24/7</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Dedicated Sandboxes</div>
          </div>
        </div>
      </section>

      {/* 2. MISSION & VISION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
              OUR MISSION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] mt-1">
              Industrial Mastery Over Passive Memorization
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              We empower software engineers, IT administrators, and platform architects to build resilient,
              secure, and highly available multi-cloud architectures. We believe engineering confidence is forged
              by debugging real production failure scenarios in live sandboxes, not watching slides.
            </p>
          </div>

          {/* Vision Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              OUR VISION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] mt-1">
              The Gold Standard for Enterprise Cloud Training
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              To be the premier global ecosystem where forward-thinking enterprises and ambitious individual engineers
              converge to master emerging cloud, DevOps, and AI technologies through rigorous hands-on validation and
              mentor-backed excellence.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HANDS-ON LABS OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider">
                <Laptop className="w-4 h-4" />
                <span>STATE-OF-THE-ART LAB ARCHITECTURE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
                Isolated Cloud Sandboxes for Every Learner
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Every TechCloudX student receives dedicated access to personal Azure and AWS tenant accounts with
                pre-provisioned cloud credits. Practice VPC peering, Kubernetes autoscaling, and disaster recovery
                without the fear of accidental billing surprises.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Real Azure & AWS Subscriptions</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Zero Credit-Card Required for Sandboxes</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Automated Lab Cleanup & Grading</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Production Topology Architecture Templates</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-inner w-full max-w-sm space-y-3 font-mono text-xs text-sky-300">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] border-b border-slate-700 pb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-2">techcloudx-sandbox-topology.sh</span>
                </div>
                <p className="text-slate-400">$ az group create --name tc-aks-rg</p>
                <p className="text-emerald-400">[OK] Resource Group deployed</p>
                <p className="text-slate-400">$ terraform apply -auto-approve</p>
                <p className="text-sky-400">Plan: 18 to add, 0 to change, 0 to destroy.</p>
                <p className="text-emerald-400">Apply complete! Resources: 18 added.</p>
                <p className="text-slate-400">$ kubectl get nodes -o wide</p>
                <p className="text-white">aks-nodepool1-vmss000000 Ready</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLOUD TECH MATRIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>INTERACTIVE PLATFORM DOMAINS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
            Cloud Tech Matrix
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            Explore our 5 enterprise curriculum pillars designed for real production readiness.
          </p>
        </div>

        {/* Tech Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {techMatrix.map((tech) => (
            <button
              key={tech.id}
              type="button"
              onClick={() => setActiveMatrixTech(tech.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 border ${
                activeMatrixTech === tech.id
                  ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-500/20 scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-sky-400'
              }`}
            >
              <span>{tech.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Tech Card Display */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 p-2.5 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  {currentTech.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                    {currentTech.badge}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
                    {currentTech.name}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {currentTech.tagline}
              </p>

              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Target Certification Codes:
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentTech.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-sky-100 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-500/20"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3 bg-slate-50 dark:bg-slate-950/60 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Curriculum Core Capabilities & Hands-On Labs
              </h4>
              <div className="space-y-2.5">
                {currentTech.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                    <Check className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT & INQUIRY FORM */}
      <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-xl mx-auto space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" />
              <span>DIRECT ADVISORY INQUIRIES</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              Speak with a Cloud Advisor
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Have questions regarding upcoming cohort dates, syllabus prerequisites, or corporate licensing?
              Submit your inquiry below and an architect will respond within 24 hours.
            </p>
          </div>

          {/* Feedback Toast Alerts */}
          {successToast && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-start gap-3 text-emerald-800 dark:text-emerald-300 text-sm animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-500 mt-0.5" />
              <div>
                <p className="font-bold">Inquiry Transmitted Successfully</p>
                <p className="text-xs mt-0.5">{successToast}</p>
              </div>
            </div>
          )}

          {errorToast && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-start gap-3 text-rose-800 dark:text-rose-300 text-sm animate-in fade-in">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-500 mt-0.5" />
              <div>
                <p className="font-bold">Submission Issue</p>
                <p className="text-xs mt-0.5">{errorToast}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmitInquiry} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-sky-500" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-300 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-sky-500" />
                  <span>Email Address *</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.morgan@company.com"
                  className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-300 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-sky-500" />
                  <span>Phone Number</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 012-3456"
                  className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-300 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-sky-500" />
                  <span>Inquiry Subject</span>
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  {subjectOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-sky-500" />
                <span>Message or Questions *</span>
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your learning goals, current technical background, or any specific questions about our cloud cohorts..."
                className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-300 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-500/25 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting Inquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
