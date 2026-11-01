import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, ShieldCheck } from 'lucide-react';
import { TechCloudXLogo } from '../TechCloudXLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <TechCloudXLogo size="lg" />
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Industrial-grade Cloud Training Management Platform (LMS). Master AWS, Azure, Google Cloud, and Cloud-Native DevOps through hands-on cohorts, live sandboxes, and industry certifications.
            </p>
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 pt-2">
              <a
                href="https://github.com/tharushidevmini/Techcloudx-Academy"
                target="_blank"
                rel="noreferrer"
                className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
                aria-label="Twitter Profile"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Cloud Tracks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-['Outfit']">
              Cloud Tracks
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/courses?search=Azure" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  Microsoft Azure Solutions
                </Link>
              </li>
              <li>
                <Link to="/courses?search=AWS" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  AWS Cloud Architecture
                </Link>
              </li>
              <li>
                <Link to="/courses?search=DevOps" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  DevOps & Kubernetes
                </Link>
              </li>
              <li>
                <Link to="/courses?search=365" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  Microsoft 365 Enterprise
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  All Certification Cohorts
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-['Outfit']">
              Platform & About
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/about" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  About Academy
                </Link>
              </li>
              <li>
                <Link to="/about#contact" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  Direct Inquiries
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  Student Sandboxes
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  Register for Next Batch
                </Link>
              </li>
              <li className="pt-1">
                <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" /> ISO 27001 Certified
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-['Outfit']">
              Headquarters
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />
                <span>TechCloudX Global Training Center, Cloud District</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-500 flex-shrink-0" />
                <a href="mailto:support@techcloudx.academy" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  support@techcloudx.academy
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-500 flex-shrink-0" />
                <span>+1 (800) 555-CLOUD</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} TechCloudX Academy Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 text-slate-500 dark:text-slate-400">
            <Link to="/about" className="hover:text-sky-600 dark:hover:text-slate-200 transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-sky-600 dark:hover:text-slate-200 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-sky-600 dark:hover:text-slate-200 transition-colors">Advisory Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
