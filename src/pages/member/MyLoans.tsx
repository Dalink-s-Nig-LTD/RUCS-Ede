import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockLoans, formatCurrency } from '@/data/mockData';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

export const MyLoans = () => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const filteredLoans = filter === 'all' ? mockLoans : mockLoans.filter(l => l.status === filter);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100"><Clock className="w-3.5 h-3.5 mr-1" /> Active</span>;
      case 'cleared':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100"><CheckCircle className="w-3.5 h-3.5 mr-1" /> Cleared</span>;
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-50 text-orange-700 border border-orange-100"><AlertCircle className="w-3.5 h-3.5 mr-1" /> Pending</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">{status}</span>;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Loans</h1>
          <p className="text-slate-500 mt-1">Track your active loans and repayment history.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
          <div className="bg-white rounded-xl border border-slate-200 p-1 flex w-full md:w-auto min-w-max">
            {['all', 'active', 'pending', 'cleared'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${filter === f ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Request Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Loan Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLoans.map(loan => {
                const progress = loan.status === 'cleared' ? 100 : loan.status === 'pending' ? 0 : (loan.amount_paid / loan.total_repayment_amount) * 100;
                return (
                  <tr key={loan.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                          <img src={loan.product.image_url} alt={loan.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 line-clamp-1">{loan.product.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">Qty: {loan.quantity}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm text-slate-700 font-medium">{new Date(loan.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-bold text-slate-900">{formatCurrency(loan.total_loan_amount)}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{formatCurrency(loan.monthly_installment)}/mo</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="w-full max-w-[120px]">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="font-semibold text-slate-700">{formatCurrency(loan.amount_paid)}</span>
                          <span className="text-slate-500">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${progress}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">{getStatusBadge(loan.status)}</td>
                    <td className="px-6 py-5 text-right">
                      <button onClick={() => navigate(`/member/loans/${loan.id}`)} className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:underline">View Details</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredLoans.length === 0 && (
          <div className="text-center py-16"><p className="text-slate-500 font-medium">No loans found matching the selected filter.</p></div>
        )}
      </div>
    </div>
  );
};
