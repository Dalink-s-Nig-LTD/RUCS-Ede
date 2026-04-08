import { useParams, useNavigate } from 'react-router-dom';
import { mockLoans, formatCurrency } from '@/data/mockData';
import { ArrowLeft, Clock, CheckCircle, Download, FileText } from 'lucide-react';

export const LoanDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const loan = mockLoans.find(l => l.id === id);

  if (!loan) return <div>Loan not found</div>;

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active': return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100"><Clock className="w-3.5 h-3.5 mr-1.5" /> Active</span>;
      case 'cleared': return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100"><CheckCircle className="w-3.5 h-3.5 mr-1.5" /> Cleared</span>;
      case 'pending': return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-50 text-orange-700 border border-orange-100"><Clock className="w-3.5 h-3.5 mr-1.5" /> Pending</span>;
      default: return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">{status}</span>;
    }
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
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/member/loans')} className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />Back to Loans
        </button>
        <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
          <Download className="w-4 h-4 mr-2" />Download Statement
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">{getStatusBadge(loan.status)}</div>
            <div className="w-20 h-20 bg-slate-50 rounded-2xl p-2 mb-6 border border-slate-100 flex items-center justify-center">
              <img src={loan.product.image_url} alt={loan.product.name} className="w-full h-full object-contain" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 leading-tight mb-2">{loan.product.name}</h2>
            <p className="text-sm font-medium text-slate-500 mb-6">Loan Request Ref: #{loan.id.toUpperCase()}</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                <span className="text-sm text-slate-500">Requested On</span>
                <span className="text-sm font-semibold text-slate-900">{new Date(loan.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                <span className="text-sm text-slate-500">Duration</span>
                <span className="text-sm font-semibold text-slate-900">{loan.repayment_duration_months} Months</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Monthly</span>
                <span className="text-sm font-bold text-slate-900">{formatCurrency(loan.monthly_installment)}</span>
              </div>
            </div>
            {loan.status !== 'pending' && (
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-slate-700">Progress</span>
                  <span className="font-bold text-slate-900">{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-3">
                  <div className={`h-full rounded-full transition-all duration-1000 ${progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${progress}%` }}></div>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-500">Paid: {formatCurrency(loan.amount_paid)}</span>
                  <span className="text-slate-400">Total: {formatCurrency(loan.total_repayment_amount)}</span>
                </div>
              </div>
            )}
          </div>
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-md">
            <div className="flex items-center gap-3 mb-4"><FileText className="w-5 h-5 text-slate-400" /><h3 className="font-bold">Need Help?</h3></div>
            <p className="text-sm text-slate-400 mb-5 leading-relaxed">If you notice any discrepancies in your repayment history, please contact the cooperative office.</p>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-colors">Contact Support</button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Repayment Schedule</h2>
              <p className="text-sm text-slate-500 mt-1">Monthly deduction breakdown.</p>
            </div>
            <div className="p-6 flex-1 overflow-auto bg-slate-50/50">
              <div className="space-y-4">
                {installments.map((inst) => (
                  <div key={inst.id} className={`flex items-center p-4 rounded-2xl border transition-all ${inst.status === 'paid' ? 'bg-emerald-50/30 border-emerald-100' : inst.status === 'pending' ? 'bg-white border-slate-200 opacity-60' : inst.status === 'partial' ? 'bg-blue-50/30 border-blue-100' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${inst.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : inst.status === 'pending' ? 'bg-slate-100 text-slate-500' : inst.status === 'partial' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                      {inst.status === 'paid' ? <CheckCircle className="w-5 h-5" /> : inst.month}
                    </div>
                    <div className="ml-4 flex-1">
                      <p className={`text-sm font-bold ${inst.status === 'paid' ? 'text-slate-900' : 'text-slate-700'}`}>{inst.date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                      <p className="text-xs font-medium text-slate-500 mt-0.5">Due by 25th</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">{formatCurrency(inst.amount)}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${inst.status === 'paid' ? 'text-emerald-700' : inst.status === 'pending' ? 'text-slate-500' : inst.status === 'partial' ? 'text-blue-700 bg-blue-50' : 'text-orange-700 bg-orange-50'}`}>{inst.status}</span>
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
