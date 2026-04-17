import { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ShoppingBag, CreditCard, Bell, LogOut,
  Users, Box, FileText, CheckCircle, Info, AlertCircle,
  Sun, Moon, Menu, X, ClipboardCheck, DollarSign, AlertTriangle
} from 'lucide-react';
import { mockUser, mockAdmin, mockOfficer } from '@/data/mockData';
import rucsLogo from '@/assets/rucs-logo.png';

const NOTIFS = [
  { id: 1, type: "success", title: "Loan Approved", message: "Your loan request for MacBook Pro has been approved.", time: "2 days ago", read: false },
  { id: 2, type: "info", title: "Repayment Due", message: "Your monthly installment of ₦161,875 is due on May 1.", time: "1 week ago", read: false },
  { id: 3, type: "warning", title: "Request Submitted", message: "Your loan request for LG Refrigerator is under review.", time: "2 weeks ago", read: true },
  { id: 4, type: "success", title: "Loan Cleared", message: "You have fully repaid Sony Headphones. Total: ₦367,500.", time: "3 months ago", read: true },
];

export const Layout = ({ role }: { role: 'member' | 'admin' | 'officer' }) => {
  const navigate = useNavigate();
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFS);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const user = role === 'member' ? mockUser : role === 'officer' ? mockOfficer : mockAdmin;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifs(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;
  const markAllRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));

  const getNotifIcon = (type: string) => {
    if (type === 'success') return <CheckCircle className="w-4 h-4 text-success" />;
    if (type === 'warning') return <AlertCircle className="w-4 h-4 text-warning" />;
    return <Info className="w-4 h-4 text-primary" />;
  };

  const memberLinks = [
    { name: 'Dashboard', path: '/member', icon: LayoutDashboard },
    { name: 'Shop', path: '/member/shop', icon: ShoppingBag },
    { name: 'Apply for Loan', path: '/member/apply-loan', icon: CreditCard },
    { name: 'My Loans', path: '/member/loans', icon: FileText },
  ];
  const officerLinks = [
    { name: 'Dashboard', path: '/officer', icon: LayoutDashboard },
    { name: 'Loan Approvals', path: '/officer', icon: ClipboardCheck },
    { name: 'Record Deposit', path: '/officer', icon: DollarSign },
    { name: 'Overdue Loans', path: '/officer', icon: AlertTriangle },
  ];
  const adminLinks = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Loan Requests', path: '/admin/loans', icon: CreditCard },
    { name: 'Products', path: '/admin/products', icon: Box },
    { name: 'Members', path: '/admin/members', icon: Users },
    { name: 'Audit Log', path: '/admin/audit', icon: FileText },
  ];

  const links = role === 'member' ? memberLinks : role === 'officer' ? officerLinks : adminLinks;
  const portalLabel = role === 'member' ? 'Member Portal' : role === 'officer' ? 'Officer Portal' : 'Admin Portal';

  return (
    <div className="flex h-screen bg-background font-body text-foreground overflow-hidden transition-colors duration-200">
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-sidebar flex flex-col justify-between transition-transform duration-300 lg:relative lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          <div className="h-16 flex items-center justify-between px-5 border-b border-sidebar-border">
            <div className="flex items-center gap-2.5">
              <img src={rucsLogo} alt="RUNSMSL" className="w-8 h-8 object-contain" />
              <span className="font-heading font-bold text-base text-sidebar-foreground tracking-tight">RUNSMSL</span>
            </div>
            <button className="lg:hidden text-sidebar-foreground/60 hover:text-sidebar-foreground" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="p-3 space-y-0.5 mt-2">
            {links.map((link, i) => (
              <NavLink
                key={`${link.path}-${i}`}
                to={link.path}
                end={link.path === '/member' || link.path === '/admin' || link.path === '/officer'}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-primary'
                      : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                  }`
                }
              >
                <link.icon className="w-[18px] h-[18px]" />
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/50 hover:text-red-400 hover:bg-sidebar-accent/50 w-full transition-colors"
          >
            <LogOut className="w-[18px] h-[18px]" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4 md:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-1.5 text-muted-foreground hover:text-foreground rounded-md" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-sm font-heading font-semibold text-foreground hidden sm:block">
              {portalLabel}
            </h2>
          </div>
          <div className="flex items-center gap-1 sm:gap-3" ref={notifRef}>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 text-muted-foreground hover:text-foreground rounded-md transition-colors">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setShowNotifs(!showNotifs)} className="relative p-2 text-muted-foreground hover:text-foreground rounded-md transition-colors">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />}
            </button>

            {showNotifs && (
              <div className="absolute top-14 right-4 md:right-6 w-80 max-w-[calc(100vw-32px)] bg-card rounded-xl shadow-xl border border-border z-50 overflow-hidden animate-fade-in">
                <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                  <h3 className="font-heading font-bold text-sm text-foreground">Notifications</h3>
                  {unreadCount > 0 && <button onClick={markAllRead} className="text-xs font-semibold text-primary hover:underline">Mark all read</button>}
                </div>
                <div className="max-h-[320px] overflow-y-auto divide-y divide-border">
                  {notifications.map(n => (
                    <div key={n.id} className={`p-3.5 hover:bg-secondary/50 transition-colors cursor-pointer ${!n.read ? 'bg-secondary/30' : ''}`}>
                      <div className="flex gap-3">
                        <div className="mt-0.5">{getNotifIcon(n.type)}</div>
                        <div>
                          <p className={`text-sm ${!n.read ? 'font-bold text-foreground' : 'font-medium text-muted-foreground'}`}>{n.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.message}</p>
                          <p className="text-[10px] font-medium text-muted-foreground/60 mt-1.5 uppercase tracking-wide">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 sm:gap-3 ml-1 sm:ml-3 sm:border-l border-border sm:pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-foreground leading-tight">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary/15 text-primary font-heading font-bold text-sm flex items-center justify-center shrink-0">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 w-full">
          <div className="max-w-6xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
