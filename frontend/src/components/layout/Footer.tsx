import React from 'react';
import { Link } from 'react-router-dom';
import { Cloud, Mail, MapPin, Phone, Github, Linkedin, Twitter, ShieldCheck } from 'lucide-react';
import logoImg from '../../assets/logo.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-sky-500/20 ring-1 ring-white/10">
                <img src={logoImg} alt="TechCloudX Academy" className="w-full h-full object-cover" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white font-['Outfit']">
                TechCloud<span className="text-sky-400">X</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Industrial-grade Cloud Training Management Platform (LMS). Master AWS, Azure, Google Cloud, and Cloud-Native DevOps through hands-on cohorts, live sandboxes, and industry certifications.
            </p>
            <div className="flex items-center gap-4 text-slate-400 pt-2">
              <a href="https://github.com/tharushidevmini/Techcloudx-Academy" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors p-2 rounded-lg hover:bg-slate-900">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-sky-400 transition-colors p-2 rounded-lg hover:bg-slate-900">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-sky-400 transition-colors p-2 rounded-lg hover:bg-slate-900">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Cloud Tracks */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white font-['Outfit']">
              Cloud Tracks
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/courses" className="hover:text-sky-400 transition-colors">AWS Solutions Architect</Link></li>
              <li><Link to="/courses" className="hover:text-sky-400 transition-colors">Azure DevOps Specialist</Link></li>
              <li><Link to="/courses" className="hover:text-sky-400 transition-colors">Google Cloud Engineer</Link></li>
              <li><Link to="/courses" className="hover:text-sky-400 transition-colors">Kubernetes & GitOps</Link></li>
              <li><Link to="/courses" className="hover:text-sky-400 transition-colors">Terraform Infrastructure</Link></li>
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white font-['Outfit']">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/courses" className="hover:text-sky-400 transition-colors">Live Cohort Batches</Link></li>
              <li><Link to="/#paths" className="hover:text-sky-400 transition-colors">Learning Paths</Link></li>
              <li><Link to="/dashboard" className="hover:text-sky-400 transition-colors">Student Sandbox</Link></li>
              <li><Link to="/#about" className="hover:text-sky-400 transition-colors">Certifications Guide</Link></li>
              <li><span className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"><ShieldCheck className="w-3.5 h-3.5" /> ISO 27001 Ready</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white font-['Outfit']">
              Headquarters
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 mt-1 flex-shrink-0" />
                <span>TechCloudX Global Training Center, Cloud District</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a href="mailto:support@techcloudx.academy" className="hover:text-sky-400 transition-colors">
                  support@techcloudx.academy
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>+1 (800) 555-CLOUD</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} TechCloudX Academy Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Security Disclosures</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
