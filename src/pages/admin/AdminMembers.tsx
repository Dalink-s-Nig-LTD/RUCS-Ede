import { useState } from 'react';
import { Search, Filter, Edit, X, PiggyBank, CreditCard, UserPlus, Activity, Mail, Calendar, Key, Image as ImageIcon, DollarSign } from 'lucide-react';
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
      setSelectedMember({...selectedMember, savings_balance: (selectedMember.savings_balance || 0) + amount});
      setDepositAmount('');
    }
  };

  const handleLoanPayment = () => {
    const amount = Number(loanPaymentAmount);
    if (amount > 0 && selectedMember) {
      const newLoan = Math.max(0, (selectedMember.total_loan_balance || 0) - amount);
      setMembers(members.map(m => m.id === selectedMember.id ? { ...m, total_loan_balance: newLoan } : m));
      setSelectedMember({...selectedMember, total_loan_balance: newLoan});
      setLoanPaymentAmount('');
    }
  };

  const memberLoans = selectedMember ? mockLoans.filter(l => l.member_id === selectedMember.id) : [];
  const activeLoan = memberLoans.find(l => l.status === 'active' || l.status === 'pending');

  return (
    <div className="space-y-6 relative dark:text-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Users</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage platform members and permissions.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 min-w-[200px] md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-[#1A1D24] border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:text-white shadow-sm transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1A1D24] border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"><Filter className="w-4 h-4" /> Filter</button>
          <button onClick={() => setShowAddUser(true)} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"><UserPlus className="w-4 h-4" /> Add New User</button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#13151A] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-[#1A1D24]/50">
          <h2 className="font-semibold text-slate-800 dark:text-slate-200">All Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white dark:bg-[#13151A] border-b border-slate-100 dark:border-slate-800/50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {filteredMembers.map(member => (
                <tr key={member.id} onClick={() => handleRowClick(member)} className="hover:bg-slate-50 dark:hover:bg-[#1A1D24] transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                        {member.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                      </div>
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-200">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="text-sm text-slate-500 dark:text-slate-400">{member.email}</span></td>
                  <td className="px-6 py-4"><span className="text-sm text-slate-600 dark:text-slate-300 capitalize">{member.role}</span></td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${member.status === 'active' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' : 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20'}`}>
                      {member.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4"><span className="text-sm text-slate-500 dark:text-slate-400">{member.joined || 'Oct 26, 10:15 AM'}</span></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><Edit className="w-4 h-4" /></button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"><X className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#13151A] border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-[#13151A]/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
                  {selectedMember.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                </div>
                <div><h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight">{selectedMember.name}</h3><span className="text-xs text-slate-500 dark:text-slate-400 capitalize">{selectedMember.role} Member</span></div>
              </div>
              <button onClick={() => setSelectedMember(null)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#1A1D24] border border-slate-100 dark:border-slate-800 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><Mail className="w-4 h-4 text-slate-400" /><span className="truncate">{selectedMember.email}</span></div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><Calendar className="w-4 h-4 text-slate-400" /><span>Joined: {selectedMember.joined || 'Oct 26, 2024'}</span></div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><Key className="w-4 h-4 text-slate-400" /><span>Password: ******** (Set)</span></div>
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Account Status</span>
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${selectedMember.status === 'active' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' : 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20'}`}>{selectedMember.status.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">Financial Overview</h4>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md relative overflow-hidden">
                    <PiggyBank className="absolute right-[-10px] bottom-[-10px] w-24 h-24 opacity-10" />
                    <p className="text-emerald-100 text-sm font-medium">Total Savings</p>
                    <p className="text-2xl font-bold mt-1">{formatCurrency(selectedMember.savings_balance || 0)}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 dark:from-[#1A1D24] dark:to-[#13151A] text-white border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                    <CreditCard className="absolute right-[-10px] bottom-[-10px] w-24 h-24 opacity-5 dark:opacity-20" />
                    <p className="text-slate-400 text-sm font-medium">Outstanding Loan</p>
                    <p className="text-2xl font-bold mt-1 text-orange-400">{formatCurrency(selectedMember.total_loan_balance || 0)}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#13151A] flex flex-col shadow-sm hover:border-emerald-500/50 transition-colors">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm mb-1.5"><DollarSign className="w-4 h-4" /> Deposit to Savings</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 flex-1">Add funds to this member's saving account directly.</p>
                    <div className="flex items-center gap-2 w-full">
                      <input type="number" placeholder="Amount" className="w-full min-w-0 flex-1 px-3 py-2 text-sm bg-slate-50 dark:bg-[#1A1D24] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500 dark:text-white" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
                      <button onClick={handleDeposit} disabled={!depositAmount || Number(depositAmount) <= 0} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0">Deposit</button>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#13151A] flex flex-col shadow-sm hover:border-orange-500/50 transition-colors">
                    <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold text-sm mb-1.5"><Activity className="w-4 h-4" /> Pay Loan Installment</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 flex-1">Deduct balance from member's active loan.</p>
                    <div className="flex items-center gap-2 w-full">
                      <input type="number" placeholder="Amount" className="w-full min-w-0 flex-1 px-3 py-2 text-sm bg-slate-50 dark:bg-[#1A1D24] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-orange-500 dark:text-white" value={loanPaymentAmount} onChange={(e) => setLoanPaymentAmount(e.target.value)} />
                      <button onClick={handleLoanPayment} disabled={!loanPaymentAmount || Number(loanPaymentAmount) <= 0 || (selectedMember.total_loan_balance || 0) <= 0} className="px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0">Pay Loan</button>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#1A1D24]/30 overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-[#1A1D24]">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">Current Active Loan</h4>
                  </div>
                  <div className="p-5">
                    {activeLoan ? (
                      <div className="flex flex-col sm:flex-row gap-5">
                        <div className="w-full sm:w-24 h-24 rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0 overflow-hidden">
                          {activeLoan.product?.image_url ? <img src={activeLoan.product.image_url} alt="Product" className="w-full h-full object-cover" /> : <ImageIcon className="w-8 h-8 text-slate-400 m-auto mt-8" />}
                        </div>
                        <div className="flex-1 space-y-2">
                          <h5 className="font-semibold text-slate-900 dark:text-white">{activeLoan.product?.name || "Unknown Product"}</h5>
                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                            <div><span className="text-slate-500 dark:text-slate-400">Total Amount: </span><span className="font-medium text-slate-900 dark:text-slate-200">{formatCurrency(activeLoan.total_repayment_amount)}</span></div>
                            <div><span className="text-slate-500 dark:text-slate-400">Monthly: </span><span className="font-medium text-slate-900 dark:text-slate-200">{formatCurrency(activeLoan.monthly_installment)}</span></div>
                            <div><span className="text-slate-500 dark:text-slate-400">Paid: </span><span className="font-medium text-emerald-600 dark:text-emerald-400">{formatCurrency(activeLoan.amount_paid)}</span></div>
                          </div>
                          <div className="pt-2">
                            <div className="flex justify-between text-xs mb-1"><span className="text-slate-500 dark:text-slate-400">Repayment Progress</span><span className="font-medium dark:text-slate-300">{Math.round((activeLoan.amount_paid / activeLoan.total_repayment_amount) * 100)}%</span></div>
                            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(activeLoan.amount_paid / activeLoan.total_repayment_amount) * 100}%` }}></div></div>
                          </div>
                        </div>
                      </div>
                    ) : <div className="text-center py-6 text-slate-500 dark:text-slate-400 text-sm">No active loans for this member.</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddUser && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/60 backdrop-blur-md">
          <div className="bg-white/80 dark:bg-[#13151A]/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
            <div className="px-6 py-5 flex justify-between items-center border-b border-slate-200/50 dark:border-white/5">
              <h3 className="font-semibold text-slate-900 dark:text-white">Create New User</h3>
              <button onClick={() => setShowAddUser(false)} className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm text-slate-600 dark:text-slate-400 mb-1.5">Full Name</label><input type="text" placeholder="John Doe" className="w-full bg-slate-50/50 dark:bg-[#1A1D24]/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 dark:text-white transition-colors" /></div>
              <div><label className="block text-sm text-slate-600 dark:text-slate-400 mb-1.5">Email Address</label><input type="email" placeholder="john.doe@example.com" className="w-full bg-slate-50/50 dark:bg-[#1A1D24]/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 dark:text-white transition-colors" /></div>
              <div><label className="block text-sm text-slate-600 dark:text-slate-400 mb-1.5">Role</label><select className="w-full bg-slate-50/50 dark:bg-[#1A1D24]/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 dark:text-white transition-colors appearance-none"><option value="member">Member</option><option value="admin">Admin</option></select></div>
              <div><label className="block text-sm text-slate-600 dark:text-slate-400 mb-1.5">Password</label><input type="password" placeholder="••••••••" className="w-full bg-slate-50/50 dark:bg-[#1A1D24]/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 dark:text-white transition-colors" /></div>
            </div>
            <div className="px-6 py-5 flex gap-3 bg-slate-50/30 dark:bg-[#1A1D24]/30 border-t border-slate-200/50 dark:border-white/5">
              <button onClick={() => setShowAddUser(false)} className="flex-1 py-2.5 bg-transparent border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">Cancel</button>
              <button onClick={() => setShowAddUser(false)} className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium rounded-xl shadow-lg shadow-emerald-500/20 transition-all border border-emerald-400/20">Create User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
