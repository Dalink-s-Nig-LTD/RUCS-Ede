import { useState } from 'react';
import { mockLoans, formatCurrency } from '@/data/mockData';
import { Search, CheckCircle, XCircle, Clock, MoreHorizontal } from 'lucide-react';

export const AdminLoans = () => {
  const [filter, setFilter] = useState('all');
  const filteredLoans = filter === 'all' ? mockLoans : mockLoans.filter(l => l.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Loan Requests</h1>
          <p className="text-muted-foreground text-sm mt-1">Review and manage member loan applications.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search by member or ID..." className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-0.5 flex w-full md:w-max overflow-x-auto">
        {['all', 'pending', 'active', 'cleared'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${filter === f ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
            {f}
            {f === 'pending' && <span className={`ml-1.5 px-1 py-0.5 rounded text-[9px] font-bold ${filter === f ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-warning/10 text-warning'}`}>{mockLoans.filter(l => l.status === 'pending').length}</span>}
          </button>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Member</th>
                <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Request</th>
                <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Amount</th>
                <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-right text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLoans.map(loan => (
                <tr key={loan.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/15 text-primary font-heading font-bold text-xs flex items-center justify-center">CO</div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Chidi Okafor</p>
                        <p className="text-[10px] text-muted-foreground">chidi.o@run.edu.ng</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-foreground line-clamp-1">{loan.product.name}</p>
                    <p className="text-[10px] text-muted-foreground">{new Date(loan.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-foreground">{formatCurrency(loan.total_loan_amount)}</p>
                    <p className="text-[10px] text-muted-foreground">{loan.repayment_duration_months} Months</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      loan.status === 'active' ? 'bg-primary/10 text-primary border-primary/20' :
                      loan.status === 'cleared' ? 'bg-success/10 text-success border-success/20' :
                      'bg-warning/10 text-warning border-warning/20'
                    }`}>
                      {loan.status === 'cleared' ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                      {loan.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {loan.status === 'pending' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button className="p-1.5 bg-card border border-border text-destructive hover:bg-destructive/10 rounded-md transition-colors"><XCircle className="w-4 h-4" /></button>
                        <button className="p-1.5 bg-primary text-primary-foreground hover:opacity-90 rounded-md transition-all"><CheckCircle className="w-4 h-4" /></button>
                      </div>
                    ) : (
                      <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredLoans.length === 0 && <div className="text-center py-12 text-sm text-muted-foreground">No loan requests found.</div>}
      </div>
    </div>
  );
};
