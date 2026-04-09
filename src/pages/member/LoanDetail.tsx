import { useParams, useNavigate } from 'react-router-dom';
import { mockLoans, formatCurrency } from '@/data/mockData';
import { ArrowLeft, Clock, CheckCircle, Download, FileText } from 'lucide-react';

export const LoanDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const loan = mockLoans.find(l => l.id === id);

  if (!loan) return <div className="p-8 text-muted-foreground">Loan not found</div>;

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-primary/10 text-primary border-primary/20',
      cleared: 'bg-success/10 text-success border-success/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status] || 'bg-secondary text-muted-foreground border-border'}`}>
        {status === 'cleared' ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
        {status}
      </span>
    );
  };

  const progress = loan.status === 'cleared' ? 100 : loan.status === 'pending' ? 0 : (loan.amount_paid / loan.total_repayment_amount) * 100;

  const generateInstallments = () => {
    const installments = [];
    let remainingPaid = loan.amount_paid;
    for (let i = 1; i <= loan.repayment_duration_months; i++) {
      const date = new Date(loan.created_at);
      date.setMonth(date.getMonth() + i);
      let status = 'due';
      if (remainingPaid >= loan.monthly_installment) { status = 'paid'; remainingPaid -= loan.monthly_installment; }
      else if (remainingPaid > 0) { status = 'partial'; remainingPaid = 0; }
      installments.push({ id: i, month: i, date, amount: loan.monthly_installment, status: loan.status === 'pending' ? 'pending' : status });
    }
    return installments;
  };
  const installments = generateInstallments();

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/member/loans')} className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1.5" />Back to Loans
        </button>
        <button className="flex items-center px-3 py-2 bg-card border border-border rounded-lg text-xs font-semibold text-foreground hover:bg-secondary transition-colors">
          <Download className="w-3.5 h-3.5 mr-1.5" />Statement
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-card rounded-xl p-5 border border-border relative">
            <div className="absolute top-4 right-4">{getStatusBadge(loan.status)}</div>
            <div className="w-14 h-14 bg-secondary rounded-lg p-1.5 mb-4 border border-border flex items-center justify-center">
              <img src={loan.product.image_url} alt={loan.product.name} className="w-full h-full object-contain" />
            </div>
            <h2 className="font-heading font-bold text-foreground text-lg leading-tight mb-1">{loan.product.name}</h2>
            <p className="text-xs text-muted-foreground mb-4">Ref: #{loan.id.toUpperCase()}</p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-3 border-b border-border"><span className="text-muted-foreground">Requested</span><span className="font-medium text-foreground">{new Date(loan.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
              <div className="flex justify-between pb-3 border-b border-border"><span className="text-muted-foreground">Duration</span><span className="font-medium text-foreground">{loan.repayment_duration_months} Months</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Monthly</span><span className="font-semibold text-foreground">{formatCurrency(loan.monthly_installment)}</span></div>
            </div>
            {loan.status !== 'pending' && (
              <div className="mt-5 pt-4 border-t border-border">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-muted-foreground">Progress</span>
                  <span className="font-bold text-foreground">{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-1000 ${progress === 100 ? 'bg-success' : 'bg-primary'}`} style={{ width: `${progress}%` }} />
                </div>
                <div className="flex justify-between text-[10px] mt-1.5">
                  <span className="text-muted-foreground">Paid: {formatCurrency(loan.amount_paid)}</span>
                  <span className="text-muted-foreground/60">Total: {formatCurrency(loan.total_repayment_amount)}</span>
                </div>
              </div>
            )}
          </div>
          <div className="bg-ocean-deep rounded-xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3"><FileText className="w-4 h-4 text-white/50" /><h3 className="font-heading font-bold text-sm">Need Help?</h3></div>
            <p className="text-xs text-white/50 mb-4 leading-relaxed">If you notice any discrepancies, please contact the cooperative office.</p>
            <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-colors">Contact Support</button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl border border-border overflow-hidden h-full flex flex-col">
            <div className="p-5 border-b border-border">
              <h2 className="font-heading font-bold text-foreground">Repayment Schedule</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Monthly deduction breakdown.</p>
            </div>
            <div className="p-4 flex-1 overflow-auto">
              <div className="space-y-2.5">
                {installments.map(inst => (
                  <div key={inst.id} className={`flex items-center p-3 rounded-lg border transition-all ${
                    inst.status === 'paid' ? 'bg-success/5 border-success/15' :
                    inst.status === 'pending' ? 'bg-card border-border opacity-50' :
                    inst.status === 'partial' ? 'bg-primary/5 border-primary/15' :
                    'bg-card border-border hover:border-primary/30'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      inst.status === 'paid' ? 'bg-success/15 text-success' :
                      inst.status === 'pending' ? 'bg-secondary text-muted-foreground' :
                      inst.status === 'partial' ? 'bg-primary/15 text-primary' :
                      'bg-secondary text-muted-foreground'
                    }`}>
                      {inst.status === 'paid' ? <CheckCircle className="w-4 h-4" /> : inst.month}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-foreground">{inst.date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                      <p className="text-[10px] text-muted-foreground">Due by 25th</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">{formatCurrency(inst.amount)}</p>
                      <span className={`text-[9px] font-bold uppercase tracking-wider ${
                        inst.status === 'paid' ? 'text-success' : inst.status === 'pending' ? 'text-muted-foreground' : inst.status === 'partial' ? 'text-primary' : 'text-warning'
                      }`}>{inst.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
