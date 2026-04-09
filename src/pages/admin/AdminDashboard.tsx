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
  const pendingLoans = mockLoans.filter(l => l.status === 'pending');
  const activeLoans = mockLoans.filter(l => l.status === 'active');
  const totalOutstanding = activeLoans.reduce((sum, loan) => sum + (loan.total_repayment_amount - loan.amount_paid), 0);

  const stats = [
    { label: 'Pending Requests', value: pendingLoans.length, icon: AlertCircle, color: 'text-warning bg-warning/10', badge: pendingLoans.length > 0 ? `${pendingLoans.length} Action Needed` : undefined },
    { label: 'Active Loans', value: activeLoans.length, icon: FileText, color: 'text-primary bg-primary/10' },
    { label: 'Total Members', value: '1,245', icon: Users, color: 'text-success bg-success/10' },
    { label: 'Total Outstanding', value: formatCurrency(totalOutstanding), icon: Clock, color: 'text-purple-600 bg-purple-500/10' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Overview</h1>
          <p className="text-muted-foreground text-sm mt-1">Platform-wide statistics and pending actions.</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button onClick={() => navigate('/admin/products')} className="flex-1 md:flex-none px-4 py-2 bg-card border border-border text-foreground rounded-lg text-sm font-medium hover:bg-secondary transition-colors text-center">
            Manage Products
          </button>
          <button onClick={() => navigate('/admin/loans')} className="flex-1 md:flex-none px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-all text-center">
            Review Requests
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, badge }) => (
          <div key={label} className="bg-card p-5 rounded-xl border border-border">
            <div className="flex justify-between items-start mb-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}><Icon className="w-4 h-4" /></div>
              {badge && <span className="text-[10px] font-bold px-2 py-0.5 bg-warning/10 text-warning rounded-full">{badge}</span>}
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground">{typeof value === 'number' ? value : value}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card p-5 rounded-xl border border-border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-heading font-semibold text-foreground">Loan Request Activity</h3>
            <select className="bg-secondary border-none text-xs font-medium text-muted-foreground rounded-md outline-none focus:ring-0 py-1.5 px-2">
              <option>This Week</option><option>Last Week</option><option>This Month</option>
            </select>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(210,24%,90%)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(210,18%,45%)', fontSize: 12 }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(210,18%,45%)', fontSize: 12 }} dx={-5} />
                <RechartsTooltip cursor={{ fill: 'hsl(210,33%,96%)' }} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(210,24%,87%)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: 13 }} />
                <Bar dataKey="value" fill="hsl(200, 55%, 39%)" radius={[4, 4, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card p-5 rounded-xl border border-border flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-heading font-semibold text-foreground">Pending Approvals</h3>
            <button onClick={() => navigate('/admin/loans')} className="text-xs font-medium text-primary hover:underline">View all</button>
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto">
            {pendingLoans.length > 0 ? pendingLoans.map(loan => (
              <div key={loan.id} className="p-3.5 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex justify-between items-start mb-1.5">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{new Date(loan.created_at).toLocaleDateString()}</span>
                  <span className="text-[10px] font-bold text-warning bg-warning/10 px-1.5 py-0.5 rounded uppercase">Pending</span>
                </div>
                <h4 className="font-semibold text-foreground text-sm line-clamp-1">{loan.product.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">Req by: Chidi Okafor</p>
                <div className="flex justify-between items-center">
                  <span className="font-heading font-bold text-foreground text-sm">{formatCurrency(loan.total_loan_amount)}</span>
                  <div className="flex gap-1.5">
                    <button className="w-7 h-7 rounded-md bg-card border border-border text-destructive flex items-center justify-center hover:bg-destructive/10 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <button className="w-7 h-7 rounded-md bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-all">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-8">
                <CheckCircle className="w-10 h-10 mb-2 text-success/30" />
                <p className="text-sm font-medium text-foreground">All caught up!</p>
                <p className="text-xs text-muted-foreground text-center mt-0.5">No pending requests.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
