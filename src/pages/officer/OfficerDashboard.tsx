import { useState } from 'react';
import { mockLoans, mockOverdueLoans, mockMembers, formatCurrency } from '@/data/mockData';
import { CheckCircle, XCircle, Clock, AlertTriangle, Search, DollarSign, Users, FileText } from 'lucide-react';

export const OfficerDashboard = () => {
  const [activeTab, setActiveTab] = useState<'approvals' | 'deposits' | 'overdue'>('approvals');
  const pendingLoans = mockLoans.filter(l => l.status === 'pending');
  const activeLoans = mockLoans.filter(l => l.status === 'active');
  const [approvalDialog, setApprovalDialog] = useState<{ loan: typeof mockLoans[0]; action: 'approve' | 'reject' } | null>(null);
  const [depositForm, setDepositForm] = useState({ member_id: '', amount: '', payment_method: 'cash', reference: '' });
  const [interestRate, setInterestRate] = useState('12');
  const [rejectionReason, setRejectionReason] = useState('');

  const stats = [
    { label: 'Pending Requests', value: pendingLoans.length, icon: Clock, color: 'text-warning bg-warning/10' },
    { label: 'Active Loans', value: activeLoans.length, icon: FileText, color: 'text-primary bg-primary/10' },
    { label: 'Overdue EMIs', value: mockOverdueLoans.length, icon: AlertTriangle, color: 'text-destructive bg-destructive/10' },
    { label: 'Total Members', value: mockMembers.length, icon: Users, color: 'text-success bg-success/10' },
  ];

  const handleApproval = () => { alert(`Loan ${approvalDialog?.action === 'approve' ? 'approved' : 'rejected'} successfully!`); setApprovalDialog(null); };
  const handleDeposit = () => { alert('Deposit recorded successfully!'); setDepositForm({ member_id: '', amount: '', payment_method: 'cash', reference: '' }); };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-heading font-bold text-foreground">Loan Officer Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Review applications, record deposits, and manage overdue loans.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-card p-4 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}><Icon className="w-4 h-4" /></div>
              <div>
                <p className="text-lg font-heading font-bold text-foreground">{value}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-card rounded-lg border border-border p-0.5 flex w-full sm:w-max">
        {[
          { key: 'approvals' as const, label: 'Pending Approvals', count: pendingLoans.length },
          { key: 'deposits' as const, label: 'Record Deposit' },
          { key: 'overdue' as const, label: 'Overdue Loans', count: mockOverdueLoans.length },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${activeTab === tab.key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span className={`ml-1.5 px-1 py-0.5 rounded text-[9px] font-bold ${activeTab === tab.key ? 'bg-primary-foreground/20' : 'bg-warning/10 text-warning'}`}>{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Pending Approvals Tab */}
      {activeTab === 'approvals' && (
        <div className="space-y-3">
          {pendingLoans.length === 0 ? (
            <div className="bg-card rounded-xl border border-border p-12 text-center">
              <CheckCircle className="w-12 h-12 text-success/30 mx-auto mb-3" />
              <p className="font-heading font-semibold text-foreground">All caught up!</p>
              <p className="text-sm text-muted-foreground mt-1">No pending loan requests.</p>
            </div>
          ) : (
            <>
              {/* Mobile */}
              <div className="space-y-3 md:hidden">
                {pendingLoans.map(loan => (
                  <div key={loan.id} className="bg-card rounded-xl border border-border p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{loan.member_name}</p>
                        <p className="text-[10px] text-muted-foreground">{loan.member_email}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-warning/10 text-warning border border-warning/20">Pending</span>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 bg-secondary/30 rounded-lg mb-3">
                      <div className="w-9 h-9 rounded-lg bg-secondary overflow-hidden shrink-0">
                        <img src={loan.product.image_url} alt={loan.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{loan.product.name}</p>
                        <p className="text-[10px] text-muted-foreground">{loan.purpose} · {loan.repayment_duration_months} months</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-base font-heading font-bold text-foreground">{formatCurrency(loan.total_loan_amount)}</p>
                      <div className="flex gap-1.5">
                        <button onClick={() => setApprovalDialog({ loan, action: 'reject' })} className="p-2 bg-card border border-border text-destructive hover:bg-destructive/10 rounded-md transition-colors"><XCircle className="w-4 h-4" /></button>
                        <button onClick={() => setApprovalDialog({ loan, action: 'approve' })} className="p-2 bg-primary text-primary-foreground hover:opacity-90 rounded-md transition-all"><CheckCircle className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Desktop */}
              <div className="bg-card rounded-xl border border-border overflow-hidden hidden md:block">
                <table className="w-full text-left">
                  <thead><tr className="bg-secondary/50 border-b border-border">
                    <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Member</th>
                    <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Product</th>
                    <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Purpose</th>
                    <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Amount</th>
                    <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Duration</th>
                    <th className="px-5 py-3 text-right text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr></thead>
                  <tbody className="divide-y divide-border">
                    {pendingLoans.map(loan => (
                      <tr key={loan.id} className="hover:bg-secondary/30 transition-colors">
                        <td className="px-5 py-4">
                          <p className="text-sm font-semibold text-foreground">{loan.member_name}</p>
                          <p className="text-[10px] text-muted-foreground">{loan.member_email}</p>
                        </td>
                        <td className="px-5 py-4 text-sm font-medium text-foreground">{loan.product.name}</td>
                        <td className="px-5 py-4 text-xs text-muted-foreground capitalize">{loan.purpose}</td>
                        <td className="px-5 py-4 text-sm font-semibold text-foreground">{formatCurrency(loan.total_loan_amount)}</td>
                        <td className="px-5 py-4 text-xs text-muted-foreground">{loan.repayment_duration_months} Mo</td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex justify-end gap-1.5">
                            <button onClick={() => setApprovalDialog({ loan, action: 'reject' })} className="p-1.5 bg-card border border-border text-destructive hover:bg-destructive/10 rounded-md transition-colors"><XCircle className="w-4 h-4" /></button>
                            <button onClick={() => setApprovalDialog({ loan, action: 'approve' })} className="p-1.5 bg-primary text-primary-foreground hover:opacity-90 rounded-md transition-all"><CheckCircle className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {/* Record Deposit Tab */}
      {activeTab === 'deposits' && (
        <div className="bg-card rounded-xl border border-border p-5 sm:p-6 max-w-xl">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-bold text-foreground">Record Member Deposit</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5">Manually record a cash or bank transfer deposit for a member.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Select Member</label>
              <select value={depositForm.member_id} onChange={e => setDepositForm({ ...depositForm, member_id: e.target.value })} className="w-full px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none">
                <option value="">Choose a member...</option>
                {mockMembers.filter(m => m.role === 'member').map(m => <option key={m.id} value={m.id}>{m.name} — {m.email}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Amount (₦)</label>
                <input type="number" placeholder="e.g. 50000" value={depositForm.amount} onChange={e => setDepositForm({ ...depositForm, amount: e.target.value })} className="w-full px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Payment Method</label>
                <select value={depositForm.payment_method} onChange={e => setDepositForm({ ...depositForm, payment_method: e.target.value })} className="w-full px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none">
                  <option value="cash">Cash</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="pos">POS</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Reference / Receipt No (Optional)</label>
              <input type="text" placeholder="e.g. REC-0041" value={depositForm.reference} onChange={e => setDepositForm({ ...depositForm, reference: e.target.value })} className="w-full px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <button onClick={handleDeposit} disabled={!depositForm.member_id || !depositForm.amount || Number(depositForm.amount) <= 0} className="w-full py-3 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-all disabled:opacity-40">
              Record Deposit
            </button>
          </div>
        </div>
      )}

      {/* Overdue Loans Tab */}
      {activeTab === 'overdue' && (
        <div className="space-y-3">
          {mockOverdueLoans.length === 0 ? (
            <div className="bg-card rounded-xl border border-border p-12 text-center">
              <CheckCircle className="w-12 h-12 text-success/30 mx-auto mb-3" />
              <p className="font-heading font-semibold text-foreground">No overdue loans!</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 md:hidden">
                {mockOverdueLoans.map(loan => (
                  <div key={loan.id} className="bg-card rounded-xl border border-destructive/20 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{loan.member_name}</p>
                        <p className="text-[10px] text-muted-foreground">{loan.email}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-destructive/10 text-destructive border border-destructive/20">
                        {loan.days_overdue}d overdue
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground">{loan.loan_product}</p>
                        <p className="text-sm font-heading font-bold text-foreground">{formatCurrency(loan.emi_amount)}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Due: {new Date(loan.due_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-card rounded-xl border border-border overflow-hidden hidden md:block">
                <table className="w-full text-left">
                  <thead><tr className="bg-secondary/50 border-b border-border">
                    <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Member</th>
                    <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Product</th>
                    <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">EMI Amount</th>
                    <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Due Date</th>
                    <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Days Overdue</th>
                  </tr></thead>
                  <tbody className="divide-y divide-border">
                    {mockOverdueLoans.map(loan => (
                      <tr key={loan.id} className="hover:bg-secondary/30">
                        <td className="px-5 py-4">
                          <p className="text-sm font-semibold text-foreground">{loan.member_name}</p>
                          <p className="text-[10px] text-muted-foreground">{loan.email}</p>
                        </td>
                        <td className="px-5 py-4 text-sm text-foreground">{loan.loan_product}</td>
                        <td className="px-5 py-4 text-sm font-semibold text-foreground">{formatCurrency(loan.emi_amount)}</td>
                        <td className="px-5 py-4 text-xs text-muted-foreground">{new Date(loan.due_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                        <td className="px-5 py-4"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-destructive/10 text-destructive border border-destructive/20">{loan.days_overdue} days</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {/* Approval/Rejection Dialog */}
      {approvalDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 bg-foreground/40 backdrop-blur-sm">
          <div className="bg-card rounded-xl border border-border w-full max-w-md shadow-xl animate-fade-in">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="font-heading font-bold text-foreground">
                {approvalDialog.action === 'approve' ? 'Approve Loan' : 'Reject Loan'}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">{approvalDialog.loan.member_name} — {formatCurrency(approvalDialog.loan.total_loan_amount)}</p>
            </div>
            <div className="p-5 space-y-4">
              {approvalDialog.action === 'approve' ? (
                <>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Interest Rate (%)</label>
                    <input type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} className="w-full px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div className="bg-success/10 rounded-lg p-3">
                    <p className="text-xs text-success font-medium">This loan will be disbursed and monthly EMI deductions will begin.</p>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Reason for Rejection</label>
                  <textarea value={rejectionReason} onChange={e => setRejectionReason(e.target.value)} placeholder="e.g. Exceeds credit limit" className="w-full px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none h-20" />
                </div>
              )}
            </div>
            <div className="px-5 py-3 border-t border-border flex justify-end gap-2">
              <button onClick={() => setApprovalDialog(null)} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary rounded-md transition-colors">Cancel</button>
              <button onClick={handleApproval} className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${approvalDialog.action === 'approve' ? 'bg-primary text-primary-foreground hover:opacity-90' : 'bg-destructive text-destructive-foreground hover:opacity-90'}`}>
                {approvalDialog.action === 'approve' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
