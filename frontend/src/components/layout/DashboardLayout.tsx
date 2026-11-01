import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  LayoutDashboard,
  Users,
  Calendar,
  CreditCard,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  Sparkles,
  ShieldAlert,
  ChevronRight,
  Terminal,
} from 'lucide-react';
import { TechCloudXLogo } from '../TechCloudXLogo';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { useAuth } from '../../context/AuthContext';

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  role?: 'student' | 'instructor' | 'admin' | 'all';
}

export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const currentRole = user?.role || 'student';
  const userName = user?.name || user?.full_name || 'Cloud Architect';
  const userInitials = userName.slice(0, 2).toUpperCase();

  const navItems: NavItem[] = [
    { name: 'Dashboard Overview', path: '/dashboard', icon: LayoutDashboard, role: 'all' },
    { name: 'Enrolled Batches', path: '/dashboard/batches', icon: Calendar, role: 'all' },
    { name: 'Courses Catalog', path: '/courses', icon: BookOpen, role: 'all' },
    { name: 'Cloud Lab Sandboxes', path: '/dashboard/labs', icon: Terminal, role: 'all' },
    { name: 'Payments & Billing', path: '/dashboard/billing', icon: CreditCard, role: 'all' },
    // Admin specific items
    { name: 'User Management', path: '/dashboard/users', icon: Users, role: 'admin' },
    { name: 'Batch Administration', path: '/dashboard/admin-batches', icon: ShieldAlert, role: 'admin' },
    { name: 'Platform Settings', path: '/dashboard/settings', icon: Settings, role: 'all' },
  ];

  const filteredNavItems = navItems.filter(
    (item) => item.role === 'all' || item.role === currentRole || currentRole === 'admin'
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080d1d] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-[#0c1530] border-r border-slate-200 dark:border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800/80">
          <TechCloudXLogo size="md" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Role Badge */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-sm font-bold text-white shadow-md">
              {userInitials}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{userName}</p>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-sky-500/15 text-sky-600 dark:text-sky-300 border border-sky-500/30">
                {currentRole}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-sky-50 dark:bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-500/30 font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400'}`} />
                <span>{item.name}</span>
                {active && <ChevronRight className="w-4 h-4 ml-auto text-sky-500" />}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Logout */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs text-slate-400">Theme</span>
            <ThemeSwitcher />
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-72">
        {/* Top Header Bar */}
        <header className="h-20 bg-white/80 dark:bg-[#0c1530]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-['Outfit']">
              Learner Portal
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <Link
              to="/courses"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 hover:scale-105 transition-transform"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Browse Catalog</span>
            </Link>
          </div>
        </header>

        {/* Page Outlet */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
