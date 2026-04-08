import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, CreditCard, Bell, LogOut,
  Users, Box, FileText, CheckCircle, Info, AlertCircle,
  Sun, Moon, Menu, X
} from 'lucide-react';
import { mockUser, mockAdmin } from '@/data/mockData';
import rucsLogo from '@/assets/rucs-logo.png';

const NOTIFS = [
  { id: 1, type: "success", title: "Loan Approved", message: "Your loan request for MacBook Pro has been approved. Repayments begin in May.", time: "2 days ago", read: false },
  { id: 2, type: "info", title: "Repayment Due", message: "Your monthly installment of ₦161,875 for l1 is due on May 1, 2026.", time: "1 week ago", read: false },
  { id: 3, type: "warning", title: "Request Submitted", message: "Your loan request for LG Refrigerator is under review.", time: "2 weeks ago", read: true },
  { id: 4, type: "success", title: "Loan Cleared", message: "Congratulations! You have fully repaid Sony Headphones. Total paid: ₦367,500.", time: "3 months ago", read: true },
];

export const Layout = ({ role }: { role: 'member' | 'admin' }) => {
  const navigate = useNavigate();
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFS);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  
  const user = role === 'member' ? mockUser : mockAdmin;

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifs(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getNotifIcon = (type: string) => {
    switch(type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-orange-600" />;
      default: return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const memberLinks = [
    { name: 'Dashboard', path: '/member', icon: LayoutDashboard },
    { name: 'Cooperative Shop', path: '/member/shop', icon: ShoppingBag },
    { name: 'My Loans', path: '/member/loans', icon: CreditCard },
  ];

  const adminLinks = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Loan Requests', path: '/admin/loans', icon: CreditCard },
    { name: 'Products', path: '/admin/products', icon: Box },
    { name: 'Members', path: '/admin/members', icon: Users },
    { name: 'Audit Log', path: '/admin/audit', icon: FileText },
  ];

  const links = role === 'member' ? memberLinks : adminLinks;

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-[#0B0D12] font-sans text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 dark:bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#12141A] border-r border-slate-200 dark:border-[#222631] flex flex-col justify-between transition-transform duration-300 transform lg:relative lg:translate-x-0 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div>
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 dark:border-[#222631]">
            <div className="flex items-center gap-2">
              <img src={rucsLogo} alt="RUCS Logo" className="w-10 h-10 object-contain drop-shadow-sm" />
              <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100">RUCS Platform</span>
            </div>
            <button 
              className="lg:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="p-4 space-y-1 overflow-y-auto">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/member' || link.path === '/admin'}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#1A1D24] hover:text-slate-900 dark:hover:text-slate-100'
                  }`
                }
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-slate-100 dark:border-[#222631]">
          <button 
            onClick={() => navigate('/login')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-zinc-50 dark:bg-[#0B0D12] transition-colors duration-300">
        <header className="h-16 bg-white dark:bg-[#12141A] border-b border-slate-200 dark:border-[#222631] flex items-center justify-between px-4 md:px-8 shrink-0 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <button 
              className="lg:hidden p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#222631] rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 capitalize hidden sm:block">
              {role} Portal
            </h2>
          </div>
          <div className="flex items-center gap-2 sm:gap-6 relative" ref={notifRef}>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
            <button 
              onClick={() => setShowNotifs(!showNotifs)}
              className="relative p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#12141A]"></span>
              )}
            </button>
            
            {showNotifs && (
              <div className="absolute top-full right-0 mt-2 w-80 max-w-[calc(100vw-32px)] bg-white dark:bg-[#1A1D24] rounded-2xl shadow-xl border border-slate-100 dark:border-[#222631] z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-[#222631] flex items-center justify-between bg-slate-50/50 dark:bg-[#12141A]/80">
                  <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllRead}
                      className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-[360px] overflow-y-auto">
                  {notifications.map(notif => (
                    <div 
                      key={notif.id} 
                      className={`p-4 border-b border-slate-50 dark:border-[#222631]/50 last:border-0 hover:bg-slate-50/80 dark:hover:bg-[#222631]/80 transition-colors cursor-pointer ${!notif.read ? 'bg-slate-50/50 dark:bg-[#222631]/40' : 'bg-white dark:bg-transparent'}`}
                    >
                      <div className="flex gap-3">
                        <div className="mt-1">{getNotifIcon(notif.type)}</div>
                        <div>
                          <p className={`text-sm ${!notif.read ? 'font-bold text-slate-900 dark:text-white' : 'font-semibold text-slate-700 dark:text-slate-300'}`}>
                            {notif.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{notif.message}</p>
                          <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-2 uppercase tracking-wide">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 sm:gap-3 sm:ml-2 sm:border-l border-slate-200 dark:border-[#222631] sm:pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{user.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-200 dark:bg-[#222631] border-2 border-white dark:border-[#12141A] shadow-sm overflow-hidden flex items-center justify-center text-slate-500 dark:text-slate-300 font-bold shrink-0">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 w-full">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
