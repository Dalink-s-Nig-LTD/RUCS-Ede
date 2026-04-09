import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockLoans, formatCurrency } from '@/data/mockData';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

export const MyLoans = () => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const filteredLoans = filter === 'all' ? mockLoans : mockLoans.filter(l => l.status === filter);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-primary/10 text-primary border-primary/20',
      cleared: 'bg-success/10 text-success border-success/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
    };
    const icons: Record<string, React.ReactNode> = {
      active: <Clock className="w-3 h-3 mr-1" />,
      cleared: <CheckCircle className="w-3 h-3 mr-1" />,
      pending: <AlertCircle className="w-3 h-3 mr-1" />,
    };
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status] || 'bg-secondary text-muted-foreground border-border'}`}>
        {icons[status]}{status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">My Loans</h1>
          <p className="text-muted-foreground text-sm mt-1">Track your active loans and repayment history.</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-0.5 flex w-full md:w-auto min-w-max">
          {['all', 'active', 'pending', 'cleared'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${filter === f ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Product</th>
                <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Date</th>
                <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Amount</th>
                <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Progress</th>
                <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-right text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLoans.map(loan => {
                const progress = loan.status === 'cleared' ? 100 : loan.status === 'pending' ? 0 : (loan.amount_paid / loan.total_repayment_amount) * 100;
                return (
                  <tr key={loan.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-secondary overflow-hidden shrink-0">
                          <img src={loan.product.image_url} alt={loan.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground line-clamp-1">{loan.product.name}</p>
                          <p className="text-[10px] text-muted-foreground">Qty: {loan.quantity}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs text-muted-foreground font-medium">{new Date(loan.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-foreground">{formatCurrency(loan.total_loan_amount)}</p>
                      <p className="text-[10px] text-muted-foreground">{formatCurrency(loan.monthly_installment)}/mo</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="w-full max-w-[100px]">
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="font-medium text-muted-foreground">{formatCurrency(loan.amount_paid)}</span>
                          <span className="text-muted-foreground">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${progress === 100 ? 'bg-success' : 'bg-primary'}`} style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">{getStatusBadge(loan.status)}</td>
                    <td className="px-5 py-4 text-right">
                      <button onClick={() => navigate(`/member/loans/${loan.id}`)} className="text-xs font-semibold text-primary hover:underline">Details</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredLoans.length === 0 && <div className="text-center py-12 text-sm text-muted-foreground">No loans found.</div>}
      </div>
    </div>
  );
};
