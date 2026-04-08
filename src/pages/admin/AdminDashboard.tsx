import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency, mockLoans } from '@/data/mockData';
import { Users, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', value: 4000 }, { name: 'Tue', value: 3000 }, { name: 'Wed', value: 2000 },
  { name: 'Thu', value: 2780 }, { name: 'Fri', value: 1890 }, { name: 'Sat', value: 2390 }, { name: 'Sun', value: 3490 },
];

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') setIsDark(document.documentElement.classList.contains('dark'));
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const pendingLoans = mockLoans.filter(l => l.status === 'pending');
  const activeLoans = mockLoans.filter(l => l.status === 'active');
  const totalOutstanding = activeLoans.reduce((sum, loan) => sum + (loan.total_repayment_amount - loan.amount_paid), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 md:mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-slate-500 mt-1">Platform-wide statistics and pending actions.</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <button onClick={() => navigate('/admin/products')} className="flex-1 md:flex-none px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-medium shadow-sm transition-colors text-center">Manage Products</button>
          <button onClick={() => navigate('/admin/loans')} className="flex-1 md:flex-none px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium shadow-sm transition-colors text-center">Review Requests</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600"><AlertCircle className="w-5 h-5" /></div>
            <span className="text-xs font-bold px-2 py-1 bg-orange-100 text-orange-700 rounded-full">{pendingLoans.length} Action Needed</span>
          </div>
          <div><h3 className="text-2xl font-bold text-slate-900">{pendingLoans.length}</h3><p className="text-sm font-medium text-slate-500">Pending Requests</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4"><div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><FileText className="w-5 h-5" /></div></div>
          <div><h3 className="text-2xl font-bold text-slate-900">{activeLoans.length}</h3><p className="text-sm font-medium text-slate-500">Active Loans</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4"><div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600"><Users className="w-5 h-5" /></div></div>
          <div><h3 className="text-2xl font-bold text-slate-900">1,245</h3><p className="text-sm font-medium text-slate-500">Total Members</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4"><div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600"><Clock className="w-5 h-5" /></div></div>
          <div><h3 className="text-2xl font-bold text-slate-900">{formatCurrency(totalOutstanding)}</h3><p className="text-sm font-medium text-slate-500">Total Outstanding</p></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Loan Request Activity</h3>
            <select className="bg-slate-50 border-none text-sm font-medium text-slate-600 rounded-lg outline-none focus:ring-0 py-1.5 px-3">
              <option>This Week</option><option>Last Week</option><option>This Month</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%" minHeight={300}>
              <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#222631' : '#f1f5f9'} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                <RechartsTooltip cursor={{fill: isDark ? '#12141A' : '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: isDark ? '#1A1D24' : '#fff', color: isDark ? '#fff' : '#000' }} />
                <Bar dataKey="value" fill={isDark ? '#059669' : '#0f172a'} radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Pending Approvals</h3>
            <button onClick={() => navigate('/admin/loans')} className="text-sm font-medium text-emerald-600 hover:text-emerald-700">View all</button>
          </div>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2">
            {pendingLoans.length > 0 ? pendingLoans.map(loan => (
              <div key={loan.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100/80 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{new Date(loan.created_at).toLocaleDateString()}</span>
                  <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded uppercase tracking-wider">Pending</span>
                </div>
                <h4 className="font-bold text-slate-900 line-clamp-1">{loan.product.name}</h4>
                <p className="text-sm text-slate-600 mb-3">Req by: Chidi Okafor</p>
                <div className="flex justify-between items-center">
                  <span className="font-black text-slate-900">{formatCurrency(loan.total_loan_amount)}</span>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-red-600 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition-colors shadow-sm">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 py-10">
                <CheckCircle className="w-12 h-12 mb-3 text-emerald-100" />
                <p className="text-sm font-medium text-slate-600">All caught up!</p>
                <p className="text-xs text-slate-400 text-center mt-1">No pending requests require your attention.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
