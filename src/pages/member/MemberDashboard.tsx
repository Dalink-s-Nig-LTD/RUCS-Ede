import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency, mockUser, mockLoans, mockTransactions } from '@/data/mockData';
import { TrendingDown, TrendingUp, Wallet, PiggyBank, Receipt, CreditCard, Plus, Target, ArrowRight, X } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const savingsData = [
  { name: 'Oct', balance: 1100000 },
  { name: 'Nov', balance: 1150000 },
  { name: 'Dec', balance: 1200000 },
  { name: 'Jan', balance: 1250000 },
  { name: 'Feb', balance: 1300000 },
  { name: 'Mar', balance: 1350000 },
  { name: 'Apr', balance: 1400000 },
  { name: 'May', balance: 1450000 },
];

export const MemberDashboard = () => {
  const navigate = useNavigate();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [depositType, setDepositType] = useState<'mandatory' | 'voluntary'>('voluntary');

  const activeLoans = mockLoans.filter(l => l.status === 'active' || l.status === 'pending');
  const totalOutstanding = activeLoans.reduce((sum, loan) => sum + (loan.total_repayment_amount - loan.amount_paid), 0);
  const nextEMI = mockLoans.find(l => l.status === 'active');
  const contributionProgress = (mockUser.mandatory_actual / mockUser.mandatory_target) * 100;

  const handleDeposit = () => {
    alert(`Deposit of ₦${depositAmount} recorded as ${depositType} savings!`);
    setShowDepositModal(false);
    setDepositAmount('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-foreground">Good morning, {mockUser.name.split(' ')[0]}!</h1>
          <p className="text-muted-foreground text-sm mt-1">Here's a summary of your cooperative account.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button onClick={() => setShowDepositModal(true)} className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-card border border-border text-foreground rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
            <Plus className="w-4 h-4" /> Deposit
          </button>
          <button onClick={() => navigate('/member/apply-loan')} className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-all">
            <CreditCard className="w-4 h-4" /> Apply for Loan
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-card p-4 rounded-xl border border-border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Total Savings</p>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground mt-1.5">{formatCurrency(mockUser.savings_balance)}</h3>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-success bg-success/10"><PiggyBank className="w-4 h-4" /></div>
          </div>
          <div className="mt-2 text-xs"><span className="text-success font-medium flex items-center"><TrendingUp className="w-3.5 h-3.5 mr-1" />+5% from last year</span></div>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Voluntary Savings</p>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground mt-1.5">{formatCurrency(mockUser.voluntary_savings)}</h3>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-primary bg-primary/10"><Wallet className="w-4 h-4" /></div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Additional contributions</div>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Interest Earned YTD</p>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground mt-1.5">{formatCurrency(mockUser.interest_earned_ytd)}</h3>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-purple-600 bg-purple-500/10"><Receipt className="w-4 h-4" /></div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">At 5% annual rate</div>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border cursor-pointer hover:border-primary/40 transition-colors" onClick={() => navigate('/member/loans')}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Outstanding Loans</p>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground mt-1.5">{formatCurrency(totalOutstanding)}</h3>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-warning bg-warning/10"><TrendingDown className="w-4 h-4" /></div>
          </div>
          <div className="mt-2 text-xs text-primary font-medium">View details →</div>
        </div>
      </div>

      {/* Active Loan + Next EMI */}
      {nextEMI && (
        <div className="bg-ocean-deep rounded-xl p-4 sm:p-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ocean-accent/10" />
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="text-white/50 text-xs font-medium uppercase tracking-wider">Next EMI Due</p>
              <p className="text-2xl font-heading font-bold mt-1">{formatCurrency(nextEMI.monthly_installment)}</p>
              <p className="text-white/50 text-xs mt-1">{nextEMI.product.name} · Due {nextEMI.next_emi_date ? new Date(nextEMI.next_emi_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}</p>
            </div>
            <button onClick={() => navigate(`/member/loans/${nextEMI.id}`)} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5">
              View Schedule <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Contribution Tracker */}
      <div className="bg-card p-4 sm:p-5 rounded-xl border border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-heading font-semibold text-foreground">Monthly Contribution Target</h3>
          </div>
          <span className="text-xs font-bold text-primary">{Math.round(contributionProgress)}%</span>
        </div>
        <div className="w-full h-3 bg-secondary rounded-full overflow-hidden mb-2">
          <div className={`h-full rounded-full transition-all duration-1000 ${contributionProgress >= 100 ? 'bg-success' : 'bg-primary'}`} style={{ width: `${Math.min(100, contributionProgress)}%` }} />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Paid: {formatCurrency(mockUser.mandatory_actual)}</span>
          <span>Target: {formatCurrency(mockUser.mandatory_target)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Savings Growth Chart */}
        <div className="lg:col-span-2 bg-card p-4 sm:p-5 rounded-xl border border-border">
          <h3 className="text-sm font-heading font-semibold text-foreground mb-4">Savings Growth</h3>
          <div className="h-[220px] sm:h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={savingsData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(200, 55%, 39%)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="hsl(200, 55%, 39%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(210,18%,45%)', fontSize: 11 }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(210,18%,45%)', fontSize: 11 }} dx={-5} tickFormatter={v => `₦${v / 1000000}M`} />
                <CartesianGrid vertical={false} stroke="hsl(210,24%,90%)" />
                <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(210,24%,87%)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: 12 }} />
                <Area type="monotone" dataKey="balance" stroke="hsl(200, 55%, 39%)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorBal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-card p-4 sm:p-5 rounded-xl border border-border">
          <h3 className="text-sm font-heading font-semibold text-foreground mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {mockTransactions.slice(0, 6).map(tx => (
              <div key={tx.id} className="flex items-center justify-between pb-3 border-b border-border last:border-0 last:pb-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${tx.amount > 0 ? 'bg-success/10 text-success' : 'bg-secondary text-muted-foreground'}`}>
                    {tx.amount > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{tx.title}</p>
                    <p className="text-[10px] text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <p className={`text-xs font-semibold shrink-0 ml-2 ${tx.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                  {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 bg-foreground/40 backdrop-blur-sm">
          <div className="bg-card rounded-xl border border-border w-full max-w-md shadow-xl animate-fade-in">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h3 className="font-heading font-bold text-foreground">Make a Deposit</h3>
              <button onClick={() => setShowDepositModal(false)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Deposit Type</label>
                <div className="flex gap-2">
                  {(['mandatory', 'voluntary'] as const).map(t => (
                    <button key={t} onClick={() => setDepositType(t)} className={`flex-1 py-2.5 rounded-lg text-sm font-medium capitalize transition-colors ${depositType === t ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Amount (₦)</label>
                <input type="number" placeholder="e.g. 50000" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} className="w-full px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              </div>
              <button onClick={handleDeposit} disabled={!depositAmount || Number(depositAmount) <= 0} className="w-full py-3 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-all disabled:opacity-40">
                Confirm Deposit
              </button>
              <p className="text-[10px] text-center text-muted-foreground">Payment processing will be via Paystack (test mode).</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
