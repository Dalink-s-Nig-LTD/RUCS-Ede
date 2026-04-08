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

export const MemberDashboard = () => {
  const navigate = useNavigate();
  const activeLoans = mockLoans.filter(l => l.status === 'active' || l.status === 'pending');
  const totalOutstanding = activeLoans.reduce((sum, loan) => sum + (loan.total_repayment_amount - loan.amount_paid), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-8 w-full">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Good morning, {mockUser.name.split(' ')[0]}!</h1>
          <p className="text-slate-500 mt-1">Here is a summary of your cooperative savings and standing.</p>
        </div>
        <button 
          onClick={() => navigate('/member/shop')}
          className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium shadow-sm transition-colors text-center"
        >
          Request New Loan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Savings</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{formatCurrency(mockUser.savings_balance)}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <PiggyBank className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-emerald-600 font-medium flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />+5% from last year
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Monthly Contribution</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{formatCurrency(mockUser.monthly_savings)}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-slate-500">Auto-deducted monthly</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Dividends</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{formatCurrency(85000)}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Receipt className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-slate-500">Earned in 2025</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:border-emerald-200 transition-colors" onClick={() => navigate('/member/loans')}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Outstanding Loans</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{formatCurrency(totalOutstanding)}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-emerald-600 font-medium">View loan details →</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Savings Growth History</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%" minHeight={300}>
              <AreaChart data={savingsData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} tickFormatter={(val) => `₦${val / 1000}k`} />
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="balance" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Recent Transactions</h3>
          </div>
          <div className="space-y-5">
            {[
              { id: 1, title: 'Monthly Savings Deposit', date: 'May 1, 2026', amount: 50000, type: 'credit' },
              { id: 2, title: 'Loan Repayment Deduction', date: 'May 1, 2026', amount: -161875, type: 'debit' },
              { id: 3, title: 'Monthly Savings Deposit', date: 'Apr 1, 2026', amount: 50000, type: 'credit' },
              { id: 4, title: 'Loan Repayment Deduction', date: 'Apr 1, 2026', amount: -161875, type: 'debit' },
              { id: 5, title: 'Monthly Savings Deposit', date: 'Mar 1, 2026', amount: 50000, type: 'credit' },
            ].map((tx) => (
              <div key={tx.id} className="flex items-center justify-between pb-5 border-b border-slate-50 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${tx.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                    {tx.type === 'credit' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{tx.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${tx.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {tx.type === 'credit' ? '+' : ''}{formatCurrency(tx.amount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
