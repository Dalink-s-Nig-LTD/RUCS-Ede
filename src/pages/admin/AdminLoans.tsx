import { useState } from 'react';
import { mockLoans, formatCurrency } from '@/data/mockData';
import { Search, CheckCircle, XCircle, Clock, MoreHorizontal } from 'lucide-react';

export const AdminLoans = () => {
  const [filter, setFilter] = useState('all');
  const filteredLoans = filter === 'all' ? mockLoans : mockLoans.filter(l => l.status === filter);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Loan Requests</h1>
          <p className="text-slate-500 mt-1">Review and manage member loan applications.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search by member or ID..." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm transition-all" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3 bg-white p-1 rounded-xl border border-slate-200 w-full md:w-max overflow-x-auto">
        {['all', 'pending', 'active', 'cleared'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-colors ${filter === f ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
            {f}
            {f === 'pending' && <span className={`ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold ${filter === f ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-700'}`}>{mockLoans.filter(l => l.status === 'pending').length}</span>}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Member</th>
                <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Request Details</th>
                <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-extrabold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLoans.map(loan => (
                <tr key={loan.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center border border-emerald-200 shadow-sm">CO</div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Chidi Okafor</p>
                        <p className="text-xs text-slate-500">chidi.o@run.edu.ng</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-slate-900 line-clamp-1">{loan.product.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Req: {new Date(loan.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-slate-900">{formatCurrency(loan.total_loan_amount)}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{loan.repayment_duration_months} Months</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${loan.status === 'active' ? 'bg-blue-50 text-blue-700 border border-blue-100' : loan.status === 'cleared' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-orange-50 text-orange-700 border border-orange-100'}`}>
                      {loan.status === 'pending' ? <Clock className="w-3.5 h-3.5 mr-1" /> : loan.status === 'cleared' ? <CheckCircle className="w-3.5 h-3.5 mr-1" /> : <Clock className="w-3.5 h-3.5 mr-1" />}
                      {loan.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    {loan.status === 'pending' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 bg-white border border-slate-200 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><XCircle className="w-4 h-4" /></button>
                        <button className="p-2 bg-emerald-600 border border-emerald-600 text-white hover:bg-emerald-700 rounded-lg transition-colors shadow-sm"><CheckCircle className="w-4 h-4" /></button>
                      </div>
                    ) : (
                      <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredLoans.length === 0 && <div className="text-center py-16"><p className="text-slate-500 font-medium">No loan requests found.</p></div>}
      </div>
    </div>
  );
};
