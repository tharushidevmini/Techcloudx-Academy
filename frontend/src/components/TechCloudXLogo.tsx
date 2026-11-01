import React from 'react';
import { Link } from 'react-router-dom';

interface TechCloudXLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const TechCloudXLogo: React.FC<TechCloudXLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const iconSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }[size];

  const titleSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size];

  return (
    <Link to="/" className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* Dynamic Graduation Cap Over Cloud Icon */}
      <div
        className={`relative ${iconSizeClasses} rounded-xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 p-0.5 shadow-md shadow-sky-500/20 group-hover:shadow-sky-500/40 group-hover:scale-105 transition-all duration-300 flex items-center justify-center`}
      >
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-1.5">
          <defs>
            <linearGradient id="cloudFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="capGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Cloud Base Body */}
          <path
            d="M14 36c-4.4 0-8-3.6-8-8 0-3.9 2.8-7.2 6.6-7.9C13.8 15.6 18.2 12 23.5 12c4.2 0 7.8 2.2 9.8 5.6 1.1-.4 2.3-.6 3.7-.6 5 0 9 4 9 9 0 5-4 9-9 9H14z"
            fill="url(#cloudFill)"
            opacity="0.95"
          />

          {/* Stylized Cloud Tech X Accent */}
          <path
            d="M21 26l6 6M27 26l-6 6"
            stroke="#0284c7"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Graduation Cap Perched Over Cloud */}
          {/* Mortarboard Diamond Top */}
          <polygon
            points="24,6 38,12 24,18 10,12"
            fill="#0f172a"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Skull Cap Base */}
          <path
            d="M15 15v4c0 3 4 5 9 5s9-2 9-5v-4"
            fill="#0f172a"
            stroke="#38bdf8"
            strokeWidth="1.2"
          />
          {/* Golden Tassel */}
          <path
            d="M32 14.5v6"
            stroke="url(#capGold)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="32" cy="21" r="1.5" fill="#f59e0b" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-extrabold ${titleSizeClasses} tracking-tight font-['Outfit'] text-slate-900 dark:text-white flex items-center transition-colors`}
        >
          TechCloud<span className="text-sky-500 dark:text-sky-400">X</span>
        </span>
        {showSubtitle && (
          <span className="text-[10px] tracking-[0.22em] font-bold uppercase text-sky-600 dark:text-sky-400/90 font-['Inter'] mt-0.5">
            ACADEMY
          </span>
        )}
      </div>
    </Link>
  );
};
