import { useState } from 'react';
import { mockLoans, formatCurrency } from '@/data/mockData';
import { Search, CheckCircle, XCircle, Clock, MoreHorizontal } from 'lucide-react';

export const AdminLoans = () => {
  const [filter, setFilter] = useState('all');
  const filteredLoans = filter === 'all' ? mockLoans : mockLoans.filter(l => l.status === filter);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-primary/10 text-primary border-primary/20',
      cleared: 'bg-success/10 text-success border-success/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
    };
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status] || 'bg-secondary text-muted-foreground border-border'}`}>
        {status === 'cleared' ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-foreground">Loan Requests</h1>
          <p className="text-muted-foreground text-sm mt-1">Review and manage member loan applications.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search by member or ID..." className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-0.5 flex w-full sm:w-max overflow-x-auto">
        {['all', 'pending', 'active', 'cleared'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${filter === f ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
            {f}
            {f === 'pending' && <span className={`ml-1.5 px-1 py-0.5 rounded text-[9px] font-bold ${filter === f ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-warning/10 text-warning'}`}>{mockLoans.filter(l => l.status === 'pending').length}</span>}
          </button>
        ))}
      </div>

      {/* Mobile card view */}
      <div className="space-y-3 md:hidden">
        {filteredLoans.map(loan => (
          <div key={loan.id} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/15 text-primary font-heading font-bold text-xs flex items-center justify-center shrink-0">CO</div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Chidi Okafor</p>
                  <p className="text-[10px] text-muted-foreground">chidi.o@run.edu.ng</p>
                </div>
              </div>
              {getStatusBadge(loan.status)}
            </div>
            <div className="flex items-center gap-3 mb-3 p-2.5 bg-secondary/30 rounded-lg">
              <div className="w-9 h-9 rounded-lg bg-secondary overflow-hidden shrink-0">
                <img src={loan.product.image_url} alt={loan.product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{loan.product.name}</p>
                <p className="text-[10px] text-muted-foreground">{new Date(loan.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-heading font-bold text-foreground">{formatCurrency(loan.total_loan_amount)}</p>
                <p className="text-[10px] text-muted-foreground">{loan.repayment_duration_months} Months</p>
              </div>
              {loan.status === 'pending' ? (
                <div className="flex items-center gap-1.5">
                  <button className="p-2 bg-card border border-border text-destructive hover:bg-destructive/10 rounded-md transition-colors"><XCircle className="w-4 h-4" /></button>
                  <button className="p-2 bg-primary text-primary-foreground hover:opacity-90 rounded-md transition-all"><CheckCircle className="w-4 h-4" /></button>
                </div>
              ) : (
                <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
              )}
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
                  <td className="px-5 py-4">{getStatusBadge(loan.status)}</td>
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

      {filteredLoans.length === 0 && <div className="text-center py-12 text-sm text-muted-foreground md:hidden">No loan requests found.</div>}
    </div>
  );
};
