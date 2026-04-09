import { useNavigate } from 'react-router-dom';
import { formatCurrency, mockLoans, mockUser } from '@/data/mockData';
import { TrendingDown, TrendingUp, Wallet, PiggyBank, Receipt } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const savingsData = [
  { name: 'Jan', balance: 1250000 },
  { name: 'Feb', balance: 1300000 },
  { name: 'Mar', balance: 1350000 },
  { name: 'Apr', balance: 1400000 },
  { name: 'May', balance: 1450000 },
];

const statCards = [
  { label: 'Total Savings', value: mockUser.savings_balance, icon: PiggyBank, color: 'text-success bg-success/10', sub: <span className="text-success font-medium flex items-center"><TrendingUp className="w-3.5 h-3.5 mr-1" />+5% from last year</span> },
  { label: 'Monthly Contribution', value: mockUser.monthly_savings, icon: Wallet, color: 'text-primary bg-primary/10', sub: <span className="text-muted-foreground">Auto-deducted monthly</span> },
  { label: 'Total Dividends', value: 85000, icon: Receipt, color: 'text-purple-600 bg-purple-500/10', sub: <span className="text-muted-foreground">Earned in 2025</span> },
];

export const MemberDashboard = () => {
  const navigate = useNavigate();
  const activeLoans = mockLoans.filter(l => l.status === 'active' || l.status === 'pending');
  const totalOutstanding = activeLoans.reduce((sum, loan) => sum + (loan.total_repayment_amount - loan.amount_paid), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Good morning, {mockUser.name.split(' ')[0]}!</h1>
          <p className="text-muted-foreground text-sm mt-1">Here's a summary of your cooperative account.</p>
        </div>
        <button onClick={() => navigate('/member/shop')} className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm shadow-sm hover:opacity-90 transition-all">
          Request New Loan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color, sub }) => (
          <div key={label} className="bg-card p-5 rounded-xl border border-border">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
                <h3 className="text-xl font-heading font-bold text-foreground mt-2">{formatCurrency(value)}</h3>
              </div>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-xs">{sub}</div>
          </div>
        ))}
        <div className="bg-card p-5 rounded-xl border border-border cursor-pointer hover:border-primary/40 transition-colors" onClick={() => navigate('/member/loans')}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Outstanding Loans</p>
              <h3 className="text-xl font-heading font-bold text-foreground mt-2">{formatCurrency(totalOutstanding)}</h3>
            </div>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-warning bg-warning/10">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-xs text-primary font-medium">View loan details →</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card p-5 rounded-xl border border-border">
          <h3 className="text-sm font-heading font-semibold text-foreground mb-4">Savings Growth</h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={savingsData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(200, 55%, 39%)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="hsl(200, 55%, 39%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(210,18%,45%)', fontSize: 12 }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(210,18%,45%)', fontSize: 12 }} dx={-5} tickFormatter={v => `₦${v / 1000}k`} />
                <CartesianGrid vertical={false} stroke="hsl(210,24%,90%)" />
                <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(210,24%,87%)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: 13 }} />
                <Area type="monotone" dataKey="balance" stroke="hsl(200, 55%, 39%)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorBal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card p-5 rounded-xl border border-border">
          <h3 className="text-sm font-heading font-semibold text-foreground mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {[
              { id: 1, title: 'Monthly Savings Deposit', date: 'May 1, 2026', amount: 50000, type: 'credit' },
              { id: 2, title: 'Loan Repayment', date: 'May 1, 2026', amount: -161875, type: 'debit' },
              { id: 3, title: 'Monthly Savings Deposit', date: 'Apr 1, 2026', amount: 50000, type: 'credit' },
              { id: 4, title: 'Loan Repayment', date: 'Apr 1, 2026', amount: -161875, type: 'debit' },
              { id: 5, title: 'Monthly Savings Deposit', date: 'Mar 1, 2026', amount: 50000, type: 'credit' },
            ].map(tx => (
              <div key={tx.id} className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${tx.type === 'credit' ? 'bg-success/10 text-success' : 'bg-secondary text-muted-foreground'}`}>
                    {tx.type === 'credit' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{tx.title}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <p className={`text-sm font-semibold ${tx.type === 'credit' ? 'text-success' : 'text-foreground'}`}>
                  {tx.type === 'credit' ? '+' : ''}{formatCurrency(tx.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
