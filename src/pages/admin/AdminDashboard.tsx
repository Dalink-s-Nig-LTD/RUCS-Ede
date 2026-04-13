import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency, mockLoans, mockMembers, mockSettings } from '@/data/mockData';
import { Users, FileText, CheckCircle, Clock, AlertCircle, Settings, Download, TrendingUp, Shield } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Mon', value: 4000 }, { name: 'Tue', value: 3000 }, { name: 'Wed', value: 2000 },
  { name: 'Thu', value: 2780 }, { name: 'Fri', value: 1890 }, { name: 'Sat', value: 2390 }, { name: 'Sun', value: 3490 },
];

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'reports'>('overview');
  const [settings, setSettings] = useState({ ...mockSettings });

  const pendingLoans = mockLoans.filter(l => l.status === 'pending');
  const activeLoans = mockLoans.filter(l => l.status === 'active');
  const totalOutstanding = activeLoans.reduce((sum, loan) => sum + (loan.total_repayment_amount - loan.amount_paid), 0);
  const totalSavings = mockMembers.reduce((sum, m) => sum + (m.savings_balance || 0), 0);

  const stats = [
    { label: 'Pending Requests', value: pendingLoans.length, icon: AlertCircle, color: 'text-warning bg-warning/10', badge: pendingLoans.length > 0 ? `${pendingLoans.length} Action Needed` : undefined },
    { label: 'Active Loans', value: activeLoans.length, icon: FileText, color: 'text-primary bg-primary/10' },
    { label: 'Total Members', value: mockMembers.length, icon: Users, color: 'text-success bg-success/10' },
    { label: 'Total Outstanding', value: formatCurrency(totalOutstanding), icon: Clock, color: 'text-purple-600 bg-purple-500/10' },
  ];

  const handleSaveSettings = () => alert('Settings saved successfully!');

  const handleDownloadCSV = () => {
    const headers = ['Name', 'Email', 'Role', 'Status', 'Savings Balance', 'Loan Balance'];
    const rows = mockMembers.map(m => [m.name, m.email, m.role, m.status, m.savings_balance, m.total_loan_balance]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rucs_members.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Platform-wide statistics, settings, and reports.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button onClick={() => navigate('/admin/members')} className="flex-1 sm:flex-none px-4 py-2 bg-card border border-border text-foreground rounded-lg text-xs sm:text-sm font-medium hover:bg-secondary transition-colors text-center">Members</button>
          <button onClick={() => navigate('/admin/loans')} className="flex-1 sm:flex-none px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm font-medium hover:opacity-90 transition-all text-center">Review Loans</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card rounded-lg border border-border p-0.5 flex w-full sm:w-max">
        {[
          { key: 'overview' as const, label: 'Overview', icon: TrendingUp },
          { key: 'settings' as const, label: 'Financial Settings', icon: Settings },
          { key: 'reports' as const, label: 'Reports', icon: Download },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${activeTab === tab.key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
            <tab.icon className="w-3.5 h-3.5" />{tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map(({ label, value, icon: Icon, color, badge }) => (
              <div key={label} className="bg-card p-4 rounded-xl border border-border">
                <div className="flex justify-between items-start mb-2">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}><Icon className="w-4 h-4" /></div>
                  {badge && <span className="text-[10px] font-bold px-2 py-0.5 bg-warning/10 text-warning rounded-full hidden sm:inline">{badge}</span>}
                </div>
                <h3 className="text-base sm:text-xl font-heading font-bold text-foreground">{value}</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-card p-4 sm:p-5 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-heading font-semibold text-foreground">Loan Request Activity</h3>
                <select className="bg-secondary border-none text-xs font-medium text-muted-foreground rounded-md outline-none py-1.5 px-2">
                  <option>This Week</option><option>Last Week</option><option>This Month</option>
                </select>
              </div>
              <div className="h-[220px] sm:h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(210,24%,90%)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(210,18%,45%)', fontSize: 11 }} dy={8} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(210,18%,45%)', fontSize: 11 }} dx={-5} />
                    <RechartsTooltip cursor={{ fill: 'hsl(210,33%,96%)' }} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(210,24%,87%)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: 12 }} />
                    <Bar dataKey="value" fill="hsl(200, 55%, 39%)" radius={[4, 4, 0, 0]} barSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card p-4 sm:p-5 rounded-xl border border-border flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-heading font-semibold text-foreground">Pending Approvals</h3>
                <button onClick={() => navigate('/admin/loans')} className="text-xs font-medium text-primary hover:underline">View all</button>
              </div>
              <div className="space-y-3 flex-1 overflow-y-auto">
                {pendingLoans.length > 0 ? pendingLoans.map(loan => (
                  <div key={loan.id} className="p-3 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className="flex justify-between items-start mb-1.5">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{new Date(loan.created_at).toLocaleDateString()}</span>
                      <span className="text-[10px] font-bold text-warning bg-warning/10 px-1.5 py-0.5 rounded uppercase">Pending</span>
                    </div>
                    <h4 className="font-semibold text-foreground text-sm line-clamp-1">{loan.product.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">Req by: {loan.member_name}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-heading font-bold text-foreground text-sm">{formatCurrency(loan.total_loan_amount)}</span>
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
        </>
      )}

      {activeTab === 'settings' && (
        <div className="max-w-xl">
          <div className="bg-card rounded-xl border border-border p-5 sm:p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              <h2 className="font-heading font-bold text-foreground">Financial Settings</h2>
            </div>
            <p className="text-sm text-muted-foreground">Configure cooperative-wide financial parameters.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Mandatory Monthly Savings (₦)</label>
                <input type="number" value={settings.mandatory_savings_amount} onChange={e => setSettings({ ...settings, mandatory_savings_amount: Number(e.target.value) })} className="w-full px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Savings Interest Rate (%)</label>
                  <input type="number" step="0.1" value={settings.savings_interest_rate} onChange={e => setSettings({ ...settings, savings_interest_rate: Number(e.target.value) })} className="w-full px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Loan Interest Rate (%)</label>
                  <input type="number" step="0.1" value={settings.loan_interest_rate} onChange={e => setSettings({ ...settings, loan_interest_rate: Number(e.target.value) })} className="w-full px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Max Loan Multiplier (× savings)</label>
                  <input type="number" step="0.5" value={settings.max_loan_multiplier} onChange={e => setSettings({ ...settings, max_loan_multiplier: Number(e.target.value) })} className="w-full px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Max Repayment (months)</label>
                  <input type="number" value={settings.max_repayment_months} onChange={e => setSettings({ ...settings, max_repayment_months: Number(e.target.value) })} className="w-full px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <button onClick={handleSaveSettings} className="w-full py-3 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-all">Save Settings</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-4 max-w-2xl">
          {/* Balance Sheet */}
          <div className="bg-card rounded-xl border border-border p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="font-heading font-bold text-foreground">Balance Sheet Summary</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                <p className="text-[10px] text-success font-medium uppercase tracking-wider">Total Savings</p>
                <p className="text-lg font-heading font-bold text-foreground mt-1">{formatCurrency(totalSavings)}</p>
              </div>
              <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                <p className="text-[10px] text-warning font-medium uppercase tracking-wider">Total Outstanding</p>
                <p className="text-lg font-heading font-bold text-foreground mt-1">{formatCurrency(totalOutstanding)}</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-[10px] text-primary font-medium uppercase tracking-wider">Net Position</p>
                <p className="text-lg font-heading font-bold text-foreground mt-1">{formatCurrency(totalSavings - totalOutstanding)}</p>
              </div>
            </div>
          </div>

          {/* CSV Export */}
          <div className="bg-card rounded-xl border border-border p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-2">
              <Download className="w-5 h-5 text-primary" />
              <h2 className="font-heading font-bold text-foreground">Export Data</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Download member data as a CSV file for record keeping.</p>
            <button onClick={handleDownloadCSV} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-all">
              <Download className="w-4 h-4" /> Download Members CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
