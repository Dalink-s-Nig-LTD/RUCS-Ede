import { useState } from 'react';
import { Search, Filter, Edit, X, PiggyBank, CreditCard, UserPlus, Activity, Mail, Calendar, Key, Image as ImageIcon, DollarSign, Shield, Ban, CheckCircle } from 'lucide-react';
import { mockMembers, mockLoans, formatCurrency } from '@/data/mockData';

export const AdminMembers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState(mockMembers);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [loanPaymentAmount, setLoanPaymentAmount] = useState('');

  const filteredMembers = members.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.email.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleRowClick = (member: any) => { setSelectedMember(member); setDepositAmount(''); setLoanPaymentAmount(''); };

  const handleDeposit = () => {
    const amount = Number(depositAmount);
    if (amount > 0 && selectedMember) {
      setMembers(members.map(m => m.id === selectedMember.id ? { ...m, savings_balance: (m.savings_balance || 0) + amount } : m));
      setSelectedMember({ ...selectedMember, savings_balance: (selectedMember.savings_balance || 0) + amount });
      setDepositAmount('');
    }
  };

  const handleLoanPayment = () => {
    const amount = Number(loanPaymentAmount);
    if (amount > 0 && selectedMember) {
      const newLoan = Math.max(0, (selectedMember.total_loan_balance || 0) - amount);
      setMembers(members.map(m => m.id === selectedMember.id ? { ...m, total_loan_balance: newLoan } : m));
      setSelectedMember({ ...selectedMember, total_loan_balance: newLoan });
      setLoanPaymentAmount('');
    }
  };

  const memberLoans = selectedMember ? mockLoans.filter(l => l.member_id === selectedMember.id) : [];
  const activeLoan = memberLoans.find(l => l.status === 'active' || l.status === 'pending');

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-foreground">Members</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage platform members and permissions.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 min-w-[140px] sm:w-56">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-card border border-border rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"><Filter className="w-3.5 h-3.5" /><span className="hidden sm:inline">Filter</span></button>
          <button onClick={() => setShowAddUser(true)} className="flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:opacity-90 transition-all"><UserPlus className="w-3.5 h-3.5" /><span className="hidden sm:inline">Add User</span></button>
        </div>
      </div>

      {/* Mobile card view */}
      <div className="space-y-3 md:hidden">
        {filteredMembers.map(member => (
          <div key={member.id} onClick={() => handleRowClick(member)} className="bg-card rounded-xl border border-border p-4 cursor-pointer hover:border-primary/30 transition-colors active:scale-[0.99]">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/15 text-primary font-heading font-bold text-[10px] flex items-center justify-center shrink-0">
                  {member.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{member.name}</p>
                  <p className="text-[10px] text-muted-foreground">{member.email}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${member.status === 'active' ? 'bg-success/10 text-success border-success/20' : 'bg-destructive/10 text-destructive border-destructive/20'}`}>
                {member.status.replace('_', ' ')}
              </span>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="capitalize">{member.role}</span>
                <span>·</span>
                <span>{member.joined || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={e => { e.stopPropagation(); }} className="p-1 text-muted-foreground hover:text-foreground transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                <button onClick={e => { e.stopPropagation(); }} className="p-1 text-muted-foreground hover:text-destructive transition-colors"><X className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table view */}
      <div className="bg-card rounded-xl border border-border overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">User</th>
                <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Email</th>
                <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Role</th>
                <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Joined</th>
                <th className="px-5 py-3 text-right text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredMembers.map(member => (
                <tr key={member.id} onClick={() => handleRowClick(member)} className="hover:bg-secondary/30 transition-colors cursor-pointer">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-primary/15 text-primary font-heading font-bold text-[10px] flex items-center justify-center shrink-0">
                        {member.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                      </div>
                      <span className="text-sm font-medium text-foreground">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">{member.email}</td>
                  <td className="px-5 py-3.5 text-xs text-foreground capitalize">{member.role}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${member.status === 'active' ? 'bg-success/10 text-success border-success/20' : 'bg-destructive/10 text-destructive border-destructive/20'}`}>
                      {member.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">{member.joined || 'N/A'}</td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1 text-muted-foreground hover:text-foreground transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                      <button className="p-1 text-muted-foreground hover:text-destructive transition-colors"><X className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Member detail modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-foreground/40 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl animate-fade-in">
            <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-border bg-card/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/15 text-primary font-heading font-bold text-sm flex items-center justify-center">
                  {selectedMember.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground leading-tight">{selectedMember.name}</h3>
                  <span className="text-[10px] text-muted-foreground capitalize">{selectedMember.role} Member</span>
                </div>
              </div>
              <button onClick={() => setSelectedMember(null)} className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-colors"><X className="w-4 h-4" /></button>
            </div>

            <div className="p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-3">
                  <div className="flex items-center gap-2.5 text-xs text-muted-foreground"><Mail className="w-3.5 h-3.5 shrink-0" /><span className="truncate">{selectedMember.email}</span></div>
                  <div className="flex items-center gap-2.5 text-xs text-muted-foreground"><Calendar className="w-3.5 h-3.5 shrink-0" /><span>Joined: {selectedMember.joined || 'N/A'}</span></div>
                  <div className="pt-3 border-t border-border">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Status</span>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${selectedMember.status === 'active' ? 'bg-success/10 text-success border-success/20' : 'bg-destructive/10 text-destructive border-destructive/20'}`}>
                        {selectedMember.status.replace('_', ' ')}
                      </span>
                      <button onClick={() => {
                        const newStatus = selectedMember.status === 'active' ? 'suspended' : 'active';
                        setMembers(members.map(m => m.id === selectedMember.id ? { ...m, status: newStatus } : m));
                        setSelectedMember({ ...selectedMember, status: newStatus });
                      }} className={`px-2 py-1 rounded-md text-[10px] font-bold transition-colors ${selectedMember.status === 'active' ? 'bg-destructive/10 text-destructive hover:bg-destructive/20' : 'bg-success/10 text-success hover:bg-success/20'}`}>
                        {selectedMember.status === 'active' ? <><Ban className="w-3 h-3 inline mr-1" />Suspend</> : <><CheckCircle className="w-3 h-3 inline mr-1" />Activate</>}
                      </button>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Role</span>
                    <div className="mt-1.5">
                      <select
                        value={selectedMember.role}
                        onChange={e => {
                          const newRole = e.target.value;
                          setMembers(members.map(m => m.id === selectedMember.id ? { ...m, role: newRole } : m));
                          setSelectedMember({ ...selectedMember, role: newRole });
                        }}
                        className="w-full px-2 py-1.5 bg-card border border-border rounded-md text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none capitalize"
                      >
                        <option value="member">Member</option>
                        <option value="loan_officer">Loan Officer</option>
                        <option value="treasurer">Treasurer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Financial Overview</h4>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-[hsl(200,55%,39%)] to-[hsl(200,55%,32%)] text-white relative overflow-hidden">
                    <PiggyBank className="absolute right-[-8px] bottom-[-8px] w-20 h-20 opacity-10" />
                    <p className="text-white/70 text-xs font-medium">Total Savings</p>
                    <p className="text-xl font-heading font-bold mt-0.5">{formatCurrency(selectedMember.savings_balance || 0)}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-ocean-deep text-white relative overflow-hidden">
                    <CreditCard className="absolute right-[-8px] bottom-[-8px] w-20 h-20 opacity-10" />
                    <p className="text-white/50 text-xs font-medium">Outstanding Loan</p>
                    <p className="text-xl font-heading font-bold mt-0.5 text-warning">{formatCurrency(selectedMember.total_loan_balance || 0)}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-1.5 text-primary font-semibold text-xs mb-1"><DollarSign className="w-3.5 h-3.5" />Deposit to Savings</div>
                    <p className="text-[10px] text-muted-foreground mb-2.5">Add funds to this member's account.</p>
                    <div className="flex items-center gap-2">
                      <input type="number" placeholder="Amount" className="flex-1 min-w-0 px-3 py-2 text-sm bg-secondary/50 border border-border rounded-md focus:outline-none focus:border-primary" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} />
                      <button onClick={handleDeposit} disabled={!depositAmount || Number(depositAmount) <= 0} className="px-3 py-2 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:opacity-90 transition-all disabled:opacity-40 shrink-0">Deposit</button>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-card hover:border-warning/30 transition-colors">
                    <div className="flex items-center gap-1.5 text-warning font-semibold text-xs mb-1"><Activity className="w-3.5 h-3.5" />Pay Loan Installment</div>
                    <p className="text-[10px] text-muted-foreground mb-2.5">Deduct from member's active loan.</p>
                    <div className="flex items-center gap-2">
                      <input type="number" placeholder="Amount" className="flex-1 min-w-0 px-3 py-2 text-sm bg-secondary/50 border border-border rounded-md focus:outline-none focus:border-warning" value={loanPaymentAmount} onChange={e => setLoanPaymentAmount(e.target.value)} />
                      <button onClick={handleLoanPayment} disabled={!loanPaymentAmount || Number(loanPaymentAmount) <= 0 || (selectedMember.total_loan_balance || 0) <= 0} className="px-3 py-2 bg-warning text-warning-foreground text-xs font-medium rounded-md hover:opacity-90 transition-all disabled:opacity-40 shrink-0">Pay</button>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-border overflow-hidden">
                  <div className="px-4 py-3 border-b border-border bg-secondary/30">
                    <h4 className="font-heading font-semibold text-foreground text-sm">Current Active Loan</h4>
                  </div>
                  <div className="p-4">
                    {activeLoan ? (
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-20 h-20 rounded-lg bg-secondary shrink-0 overflow-hidden">
                          {activeLoan.product?.image_url ? <img src={activeLoan.product.image_url} alt="Product" className="w-full h-full object-cover" /> : <ImageIcon className="w-6 h-6 text-muted-foreground m-auto mt-7" />}
                        </div>
                        <div className="flex-1 space-y-2">
                          <h5 className="font-semibold text-foreground text-sm">{activeLoan.product?.name || "Unknown"}</h5>
                          <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs">
                            <div><span className="text-muted-foreground">Total: </span><span className="font-medium text-foreground">{formatCurrency(activeLoan.total_repayment_amount)}</span></div>
                            <div><span className="text-muted-foreground">Monthly: </span><span className="font-medium text-foreground">{formatCurrency(activeLoan.monthly_installment)}</span></div>
                            <div><span className="text-muted-foreground">Paid: </span><span className="font-medium text-success">{formatCurrency(activeLoan.amount_paid)}</span></div>
                          </div>
                          <div className="pt-1.5">
                            <div className="flex justify-between text-[10px] mb-1"><span className="text-muted-foreground">Progress</span><span className="font-medium text-foreground">{Math.round((activeLoan.amount_paid / activeLoan.total_repayment_amount) * 100)}%</span></div>
                            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${(activeLoan.amount_paid / activeLoan.total_repayment_amount) * 100}%` }} /></div>
                          </div>
                        </div>
                      </div>
                    ) : <div className="text-center py-6 text-sm text-muted-foreground">No active loans for this member.</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add user modal */}
      {showAddUser && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4 bg-foreground/40 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-xl w-full max-w-md shadow-xl overflow-hidden animate-fade-in">
            <div className="px-5 py-4 flex justify-between items-center border-b border-border">
              <h3 className="font-heading font-bold text-foreground text-sm">Create New User</h3>
              <button onClick={() => setShowAddUser(false)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-3.5">
              <div><label className="block text-xs text-muted-foreground mb-1">Full Name</label><input type="text" placeholder="John Doe" className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary" /></div>
              <div><label className="block text-xs text-muted-foreground mb-1">Email</label><input type="email" placeholder="user@run.edu.ng" className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary" /></div>
              <div><label className="block text-xs text-muted-foreground mb-1">Role</label><select className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary"><option value="member">Member</option><option value="loan_officer">Loan Officer</option><option value="treasurer">Treasurer</option><option value="admin">Admin</option></select></div>
            </div>
            <div className="px-5 py-3 bg-secondary/50 border-t border-border flex justify-end gap-2">
              <button onClick={() => setShowAddUser(false)} className="px-3 py-2 text-sm text-muted-foreground hover:bg-secondary rounded-md transition-colors">Cancel</button>
              <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:opacity-90 transition-all">Create User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
